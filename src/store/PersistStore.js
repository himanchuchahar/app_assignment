
/**
   * method to set car data in localStorage
   * @param data data to set in localStorage
   */

let carStorageName = "carsDB";
const saveCarArray = [];
export const setCarData = (data) => {
    saveCarArray.push(data);
    localStorage.setItem(carStorageName, JSON.stringify(saveCarArray));
}


/**
 * method to get car data from localStorage
 */
export const getCarData = () => {
    let data = localStorage.getItem(carStorageName) || "[]";
    return JSON.parse(data);
}

/**
 * method to return if car is saved in database
 */
export const isSaved = (stockNumber) => {
    if (!stockNumber)
        return false
    return getCarData().filter(function (e) { return e.stockNumber == stockNumber; }).length > 0
}

/**
 * method to remove Car from localStorage
 */
export const deleteCar = (stockNumber) => {
    let filteredData = getCarData().filter(function (e) { return e.stockNumber != stockNumber; });
    localStorage.setItem(carStorageName, JSON.stringify(filteredData));
    return filteredData;
}



/**
 * method to clear Car data from localStorage
 */
export const clearCarData = () => {
    localStorage.removeItem(carStorageName);
}


/**
 * method to clear all data from localStorage
 */
export const cleanAll = () => {
    localStorage.clear()
}

