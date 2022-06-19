export const serialNumberGenerator = (date: string, manuallyEnteredNumber: string) => {
  const dateAsStringNumber = date.replace(/-/g, '');
  const resultWithManuallyEnteredNumber = dateAsStringNumber + manuallyEnteredNumber;
  const numberResult = parseInt(resultWithManuallyEnteredNumber);
  const checkSum = (createChecksumNumber(numberResult) * numberResult);
  return ConvertingNumberToApiaryCode(checkSum.toString(), numberResult.toString());
}

const createChecksumNumber = (digitsToMultiply: number, res = 1): number => {
  if(digitsToMultiply > 0){
    return createChecksumNumber(Math.floor(digitsToMultiply / 10), res * (digitsToMultiply % 10 || 1));
  }
  return res;
};

const ConvertingNumberToApiaryCode = (checkSum: string,numberResult: string) => {
  const secondNumber = checkSum.charAt(1);
  const seventhNumber = checkSum.charAt(6);
  const lastNumber = checkSum.charAt(checkSum.length - 1);
  const controlDigits = secondNumber + seventhNumber + lastNumber;
  return parseInt(numberResult + controlDigits);
};




