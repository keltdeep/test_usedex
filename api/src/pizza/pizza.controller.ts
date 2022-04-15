import {Controller, Get, Query} from "@nestjs/common";
import {ApiOperation, ApiQuery, ApiResponse} from "@nestjs/swagger";
import {PizzaService} from "./pizza.service";
import {getPizzaDto, getPizzaDtoResponse} from "./dto/getPizza.dto";

@Controller()
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @ApiQuery({
    required: true,
    name: "lat",
    example: "54",
    type: "string",
    description: "Широта",
  })
  @ApiQuery({
    required: true,
    name: "long",
    example: "55",
    type: "string",
    description: "Долгота",
  })
  @ApiOperation({
    description: "Получение ближайшей пиццерии по координатам",
    summary: "Получение ближайшей пиццерии по координатам",
  })
  @ApiResponse({
    status: 200,
    description: "Инфо по метоположению ближайшей пиццерии",
    schema: {
      type: "object",
      properties: {
        lat: {
          type: 'string',
          description: 'Широта'
        },
        long: {
          type: 'string',
          description: 'Долгота'
        },
        address: {
          type: 'string',
          description: 'Адрес'
        }
      }
  }})
  @Get("/pizza")
  getPizza(@Query() query: getPizzaDto): Promise<getPizzaDtoResponse> {
    return this.pizzaService.getPizza(query);
  }
}
