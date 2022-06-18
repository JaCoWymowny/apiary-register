import { ApiaryData } from "../interfaces/dbData";

export const validateSerialNumber = (serialNumber: number, apiaryRegistryList: ApiaryData[]) => {
  const found = apiaryRegistryList?.some(el => el.serialNumber === serialNumber);
  if (found)
    return found;

}
