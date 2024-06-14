import { Transform, TransformFnParams } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class FindAllDto {
  @IsOptional()
  @IsInt()
  @Transform(positiveIntTransform)
  page?: number;

  @IsOptional()
  @IsInt()
  @Transform(positiveIntTransform)
  limit?: number;

  @IsOptional()
  @IsString()
  searchedColumn?: string;

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsString()
  orderedColumn?: string;

  @IsOptional()
  @IsString()
  order?: string;
}

function positiveIntTransform(params: TransformFnParams) {
  let value = params.value;

  if (typeof value === 'string') {
    if (value === '') {
      return 0;
    }

    value = +params.value;
  }

  if (typeof value === 'number' && value < 1) {
    return '';
  }

  return value;
}
