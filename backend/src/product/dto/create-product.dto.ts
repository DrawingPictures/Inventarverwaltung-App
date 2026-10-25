import { IsString, IsNotEmpty, IsNumber, IsInt, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  sku!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsInt()
  @IsNotEmpty()
  companyId!: number;
}