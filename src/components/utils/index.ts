export const formatTemperature = (temperature: number) : number =>{
    const kelvin=273.15;
    //we want to round the number
    return parseInt((temperature - kelvin).toString());
}