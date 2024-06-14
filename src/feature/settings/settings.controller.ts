import { Controller, Get, Post, Body, Query, Res } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { FindAllDto } from './dto/findAll-setting.dto';
import { Response } from 'express';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  async create(
    @Body() createSettingDto: CreateSettingDto,
    @Res() response: Response,
  ) {
    const setting = await this.settingsService.create(createSettingDto);

    return response.status(200).json(setting);
  }

  @Get()
  async findAll(@Query() findAllDto: FindAllDto) {
    return await this.settingsService.findAll(findAllDto);
  }
}
