const FuelTypes = require('./fuel-type.js');
const DIESEL = FuelTypes.FuelType.DIESEL;
const PETROL = FuelTypes.FuelType.PETROL;

const PETROL_TAXES = [
  [1, 50,10],
  [51, 75,25],
  [76, 90,105],
  [91, 100,125],
  [101, 110,145],
  [111, 130,165],
  [131, 150,205],
  [151, 170,515],
  [171, 190,830],
  [191, 225,1240],
  [226, 255,1760],
  [256, Infinity,2070],
]

DIESEL_TAXES = [
  [1, 50, 25],
  [51, 75, 105],
  [76, 90, 125],
  [91, 100, 145],
  [101, 110, 165],
  [111, 130, 205],
  [131, 150, 515],
  [151, 170, 830],
  [171, 190, 1240],
  [191, 225, 1760],
  [226, 255, 2070],
  [255, Infinity, 2070],
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
      if (em  >= taxRate[0] && em <= taxRate[1]){
        tax = taxRate[2];
        break;
      }
    }
    return tax;
  }

  calculateTax(vehicle, toggles) {
    if (toggles != undefined && toggles.older_expensive == 'ON'){
      if (
        vehicle.dateOfFirstRegistration.getFullYear() < this.getYear()
      && vehicle.listPrice > 40000){
        return 450;
      }
    }
    if (toggles != undefined && toggles.older_cheap == 'ON'){
      if (
        vehicle.dateOfFirstRegistration.getFullYear() < this.getYear()
         && vehicle.listPrice < 40000){
          return 140;
       }
    }
    if (vehicle.fuelType == PETROL) {
      return this.getTax(vehicle, PETROL_TAXES);
    } else if(vehicle.fuelType == DIESEL) {
      return this.getTax(vehicle, DIESEL_TAXES);
    }
  }


}

module.exports = { TaxCalculator: TaxCalculator };
