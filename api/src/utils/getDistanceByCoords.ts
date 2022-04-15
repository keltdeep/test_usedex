import {DEGREES, EARTH_RADIUS, HALF_DEGREES} from "./consts";
import {ICoords} from "../pizza/dto/ICoords";

const degreesToRadians = degrees => degrees * (Math.PI / HALF_DEGREES);
const radiansToDegrees = radians => radians * (HALF_DEGREES / Math.PI);

const centralSubtendedAngle = (locationX: ICoords, locationY: ICoords) => {
  const locationXLatRadians = degreesToRadians(locationX.lat);
  const locationYLatRadians = degreesToRadians(locationY.lat);

  return radiansToDegrees(
    Math.acos(
      Math.sin(locationXLatRadians) * Math.sin(locationYLatRadians) +
      Math.cos(locationXLatRadians) *
      Math.cos(locationYLatRadians) *
      Math.cos(
        degreesToRadians(
          Math.abs(locationX.long - locationY.long)
        )
      )
    )
  );
}

const greatCircleDistance = angle => 2 * Math.PI * EARTH_RADIUS * (angle / DEGREES);

export const distanceBetweenLocations = (locationX: ICoords, locationY: ICoords) =>
  greatCircleDistance(centralSubtendedAngle(locationX, locationY));