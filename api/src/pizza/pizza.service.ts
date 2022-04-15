import {HttpException, Injectable} from '@nestjs/common';
import {getPizzaDto, getPizzaDtoResponse} from "./dto/getPizza.dto";
import axios from "axios";
import {distanceBetweenLocations} from "../utils/getDistanceByCoords";
import {ICoords} from "./dto/ICoords";

interface IUnit extends IPizza {
  distanceResult: number
}

interface IPizza {
  address: string;
  coords: ICoords;
}

@Injectable()
export class PizzaService {
  async getPizza(query: getPizzaDto) : Promise<getPizzaDtoResponse> {
    const url = process.env.API_URL

    const brandWithCountries: any = await this.getFromApiByUrl(`${url}countries`)

    if (!brandWithCountries) {
      throw new HttpException('Не удалось получить страны', 400)
    }

    // получаем айдишники всех стран, т.к. мы не знаем в какой стране нам искать
    // по хорошему искать по одной стране и на беке или на фронте ее определить
    const allCountriesIds = [...new Set(brandWithCountries.flatMap(({countries}) =>
      countries.map(({id}) => id)
    ))]

    const promises = allCountriesIds
      .map((countryId) => this.getFromApiByUrl(`${url}units/all/${countryId}`))

    //получим все пиццерии и оставим только их адрес и координаты
    const allUnits: IPizza[] = this.getUnits(await Promise.all(promises))

    if (!allUnits) {
      throw new HttpException('Не удалось получить пиццерии', 400)
    }

    let nearestUnit: IUnit;

    allUnits.forEach(({address, coords}) => {
      const getDistance = distanceBetweenLocations(
        {
          lat: Number(query.lat),
          long: Number(query.long)
        },
        coords
      )

      if (!nearestUnit || nearestUnit.distanceResult > getDistance) {
        nearestUnit = {
          address,
          distanceResult: getDistance,
          coords
        }
      }
    })

    const {lat, long} = nearestUnit.coords

    return {
      lat: lat.toString(),
      long: long.toString(),
      address: nearestUnit.address
    }
  }

  private async getFromApiByUrl(url: string) {
    let result: any = [];

    try {
      result = await axios.get(url, {
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      //ну тут залогировать по хорошему
      console.log(`Не удалось получить инфу: ${err}`);
    }

    return result?.data;
  }

  private getBrands(brands) {
    return brands.flatMap(({countries}) => countries)
  }

  private getPizzeriasByBrands(brands) {
    return brands.flatMap(({pizzerias}) => pizzerias)
      .map(({address, coords}) => ({
        address: `${address.locality?.name || ''} ${address.text || ''}`,
        coords
      }))
  }

  private getBrandsByUnits(units) {
    return units.flatMap(({brands}) => this.getBrands(brands))
  }

  private getUnits(units) {
    return this.getPizzeriasByBrands(this.getBrandsByUnits(units)
    )
  }
}
