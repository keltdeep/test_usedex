import { IsNotEmpty, IsString } from "class-validator";

class getPizzaDto {
  @IsNotEmpty()
  @IsString()
  lat: string;

  @IsNotEmpty()
  @IsString()
  long: string;
}

class getPizzaDtoResponse extends getPizzaDto {
  @IsNotEmpty()
  @IsString()
  address: string;
}

export {
  getPizzaDto,
  getPizzaDtoResponse
}
