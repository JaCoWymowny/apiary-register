import { useState } from "react";

export const SerialNumber = () => {
  const [incrementalDigitCode, setIncrementalDigitCode] = useState("00000");

  const createChecksumNumber = (digitsToMultiply: number, res = 1): number => {
    if(digitsToMultiply > 0){
      return createChecksumNumber(Math.floor(digitsToMultiply / 10), res * (digitsToMultiply % 10 || 1));
    }
    return res;
  };

  const serialNumberGenerator = (date: string, manuallyEnteredNumber: string) => {
    const dateAsStringNumber = date.replace(/-/g, '');

    if (!manuallyEnteredNumber) {
      const resultWithIncrementCode = dateAsStringNumber + incrementalDigitCode;
      const incrementValue = (+incrementalDigitCode) + 1;
      const increment = ("00000" + incrementValue).slice(-5);
      const numberResult = parseInt(resultWithIncrementCode);
      const checkSum = (createChecksumNumber(numberResult) * numberResult);
      setIncrementalDigitCode(increment);
      return ConvertingNumberToApiaryCode(checkSum.toString(), numberResult.toString())
    } else {
      const resultWithManuallyEnteredNumber = dateAsStringNumber + manuallyEnteredNumber;
      const numberResult = parseInt(resultWithManuallyEnteredNumber);
      const checkSum = (createChecksumNumber(numberResult) * numberResult);
      return ConvertingNumberToApiaryCode(checkSum.toString(), numberResult.toString())
    }
  }

  const ConvertingNumberToApiaryCode = (checkSum: string,numberResult: string) => {
    const secondNumber = checkSum.charAt(1);
    const seventhNumber = checkSum.charAt(6);
    const lastNumber = checkSum.charAt(checkSum.length - 1);
    const controlDigits = secondNumber + seventhNumber + lastNumber;
    return parseInt(numberResult + controlDigits);
  };

  return { serialNumberGenerator }
};




