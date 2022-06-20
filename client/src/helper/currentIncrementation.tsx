import { IncrementalData } from "../interfaces/dbData";

export const currentIncrementation = (date: string, validateControlNumbersGenerator: IncrementalData[]) => {
  const controlNumberValidation = validateControlNumbersGenerator.filter((item: IncrementalData) => item.date.includes(date))
  if (controlNumberValidation.length > 0) {
    const numberInArray = controlNumberValidation[0].generatedCode;
    return increment(numberInArray[numberInArray.length - 1]);
  } else {
    return "00001"
  }
}

const increment = (lastGeneratedNumber: string) => {
  return ("00000" + (+lastGeneratedNumber + 1)).slice(-5)
}

