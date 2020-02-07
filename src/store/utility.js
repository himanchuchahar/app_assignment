/**
 * Utility file to manipulate server response
 */


/**
 * 
 * @param {*} oldData : old manufacturers array
 * returns empty array if null or new array will manipulated manufacturers object
 */
export const updateManufacturerObject = oldData => {
    if (!oldData) {
        return [];
    }
    return oldData.manufacturers.map((manu) => manu.name);
}

/**
 * Method to return car name
 * @param {*} manu 
 * @param {*} model 
 */
const returnCarName = (manu, model) => {
    return `${manu} ${model}`;
}

/**
 * Method to return car secondary details in list
 * Note: Keeping it separate incase it is required to change the secondary details UI
 * @param {*} stockNumber 
 * @param {*} mileage 
 * @param {*} fuelType 
 * @param {*} color 
 */
const returnSecondaryDetails = (stockNumber, mileage, fuelType, color) => {
    return `Stock # ${stockNumber} - ${mileage.number} ${mileage.unit} - ${fuelType} - ${color}`;
}

/**
 * Method to update the car object
 */
export const updateCarObject = (car) => {
    return {
        ...car,
        "car_name": returnCarName(car.manufacturerName, car.modelName),
        "secondary_details": returnSecondaryDetails(car.stockNumber, car.mileage, car.fuelType, car.color)
    }
}


/**
 * Method to return cars array with updated the car object
 */
export const updateCarsData = oldData => {
    if (!oldData) {
        return [];
    }
    return {
        ...oldData,
        cars: [
            ...oldData.cars.map((car) => updateCarObject(car))
        ]
    }
}


