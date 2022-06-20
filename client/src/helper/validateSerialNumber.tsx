import { ApiaryData } from "../interfaces/dbData";

export const validateSerialNumber = (serialNumber: number, apiaryRegistryList: ApiaryData[]) => {
  const foundSerialNumber = apiaryRegistryList?.some(el => el.serialNumber === serialNumber);
  if (foundSerialNumber) {
    return foundSerialNumber;
  }
}
