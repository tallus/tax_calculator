const FuelTypes = require('./fuel-type.js');
const ALTERNATIVE_FUEL = FuelTypes.FuelType.ALTERNATIVE_FUEL;
const DIESEL = FuelTypes.FuelType.DIESEL;
const ELECTRIC = FuelTypes.FuelType.ELECTRIC;
const PETROL = FuelTypes.FuelType.PETROL;

function TaxBand (min, max, tax){
  return {min: min, max: max, tax: tax};
}


const PETROL_TAXES = [
  TaxBand(1, 50, 10),
  TaxBand(51, 75, 25),
  TaxBand(76, 90, 105),
  TaxBand(91, 100, 125),
  TaxBand(101, 110, 145),
  TaxBand(111, 130, 165),
  TaxBand(131, 150, 205),
  TaxBand(151, 170, 515),
  TaxBand(171, 190, 830),
  TaxBand(191, 225, 1240),
  TaxBand(226, 255, 1760),
  TaxBand(256, Infinity, 2070),
]

DIESEL_TAXES = [
  TaxBand(1, 50, 25),
  TaxBand(51, 75, 105),
  TaxBand(76, 90, 125),
  TaxBand(91, 100, 145),
  TaxBand(101, 110, 165),
  TaxBand(111, 130, 205),
  TaxBand(131, 150, 515),
  TaxBand(151, 170, 830),
  TaxBand(171, 190, 1240),
  TaxBand(191, 225, 1760),
  TaxBand(226, 255, 2070),
  TaxBand(255, Infinity, 2070),
]

ALTERNATIVE_FUEL_TAXES = [
  TaxBand(1, 50, 0),
  TaxBand(51, 75, 15),
  TaxBand(76, 90, 95),
  TaxBand(91, 100, 115),
  TaxBand(101, 110, 135),
  TaxBand(111, 130, 155),
  TaxBand(131, 150, 195),
  TaxBand(151, 170, 505),
  TaxBand(171, 190, 820),
  TaxBand(191, 225, 1230),
  TaxBand(226, 255, 1750),
  TaxBand(255, Infinity, 2060),
]


let TaxCalculator = class TaxCalculator {
  constructor(year) {
    if (year === undefined) {
      let date = new Date();
      this.year = date.getFullYear();
    } else {
      this.year = year;
    }
  }

  getYear() {
    return this.year;
  }

  getTax(vehicle, taxRates){
    let tax = 0;
    let em = vehicle.co2Emissions;

    for (let taxRate of taxRates) {
      if (em  >= taxRate.min && em <= taxRate.max){
        tax = taxRate.tax;
        break;
      }
    }
    return tax;
  }

  calculateTax(vehicle) {
    if (vehicle.fuelType == PETROL) {
      return this.getTax(vehicle, PETROL_TAXES);
    } else if(vehicle.fuelType == DIESEL) {
      return this.getTax(vehicle, DIESEL_TAXES);
    } else if(vehicle.fuelType == ALTERNATIVE_FUEL) {
      return this.getTax(vehicle, ALTERNATIVE_FUEL_TAXES);
    } else if(vehicle.fuelType == ELECTRIC) {
      return 0;
    }
  }
}

module.exports = { TaxCalculator: TaxCalculator };
