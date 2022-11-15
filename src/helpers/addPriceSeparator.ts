const addPriceSeparator = (number: number): string => {
    return number.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ',')
};

export default addPriceSeparator;