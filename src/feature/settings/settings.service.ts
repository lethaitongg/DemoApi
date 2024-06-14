import { Setting } from './entities/setting.entity';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, FindOptionsWhere, Like, Repository } from 'typeorm';
import { FindAllDto } from './dto/findAll-setting.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private _settingsRepository: Repository<Setting>,
  ) {}

  async create(createSettingDto: CreateSettingDto) {
    const { name, value } = createSettingDto;
    const isExisted = await this._settingsRepository.existsBy({ name });

    if (isExisted) {
      throw new ConflictException(`Setting having name ${name} is exist`);
    }

    const setting = new Setting(name, value);

    return this._settingsRepository.save(setting);
  }

  async findAll(findAllDto: FindAllDto) {
    const { searchedColumn, keyword, orderedColumn, order } = findAllDto;
    let { limit, page } = findAllDto;

    if (!limit) {
      limit = 0;
    }
    if (!page) {
      page = 1;
    }

    const findOtionsWhere: FindOptionsWhere<Setting> = {};
    const findOptionsOrder: FindOptionsOrder<Setting> = {};

    let findOptionsOrderValue = '';
    if (order) {
      findOptionsOrderValue = order.toUpperCase();
    }

    const columns = Object.getOwnPropertyNames(new Setting());
    for (const column of columns) {
      if (column === searchedColumn) {
        findOtionsWhere[column] = Like('%' + keyword + '%');
      }

      if (
        column === orderedColumn &&
        (findOptionsOrderValue === 'ASC' || findOptionsOrderValue === 'DESC')
      ) {
        findOptionsOrder[column] = findOptionsOrderValue;
      }
    }

    if (searchedColumn && Object.getOwnPropertyNames(findOtionsWhere).length) {
      throw new BadRequestException(
        `Can not search by column '${searchedColumn}'`,
      );
    }

    if (orderedColumn && Object.getOwnPropertyNames(findOptionsOrder).length) {
      console.log(Object.getOwnPropertyNames(findOptionsOrder));
      throw new BadRequestException(
        `Can not order by column '${orderedColumn}'`,
      );
    }

    const [settings, count] = await this._settingsRepository.findAndCount({
      where: findOtionsWhere,
      order: findOptionsOrder,
      skip: (page - 1) * limit,
      take: limit,
    });

    const link =
      `http://localhost:3000/settings?searchedColumn=${searchedColumn ?? ''}` +
      `&keyword=${keyword ?? ''}` +
      `&orderedColumn=${orderedColumn ?? ''}` +
      `&order=${order ?? ''}`;

    const totalPages = limit !== 0 ? Math.ceil(count / limit) : 1;

    return {
      data: settings,
      pagination: {
        page,
        limit,
        count,
        totalPages,
        links: {
          prev: page - 1 ? `${link}&page=${page - 1}&limit=${limit}` : null,
          next:
            totalPages - page
              ? `${link}&page=${page + 1}&limit=${limit}`
              : null,
        },
      },
    };
  }
}
