import { IncrementalData } from "../interfaces/dbData";

export const currentIncrementation = (date: string, validateNumberGenerator: IncrementalData[]) => {
  const getCurrentIncrementation = () => {
    return validateNumberGenerator.filter((item: IncrementalData) => item.date.includes(date)).map(
      (myItem: IncrementalData) => {
      return myItem.generatedCode
    })
  }
  const numberInArray = getCurrentIncrementation()[0];
  if (!numberInArray) {
    return "00000"
  } else {
    return numberInArray[numberInArray.length - 1];
  }
}

export const increment = (date: string, lastGeneratedNumber: string) => {
  const stringNumber = "00001";
  if (!lastGeneratedNumber) {
    console.log("last: ", lastGeneratedNumber)
    return stringNumber
  } else {
    return ("00000" + (+lastGeneratedNumber + 1)).slice(-5)
  }
}
