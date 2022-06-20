import React, { useEffect, useState } from "react";
import { ContentWindow } from "./styles";
import { ApiaryData, IncrementalData } from "../../interfaces/dbData";
import {
  getNumbersData,
  getRegistryData,
  sendIncrementation,
  sendRegistryData
} from "../../services/registryDataService";
import Form from "../../components/Form/Form";
import { validateSerialNumber } from "../../helper/validateSerialNumber";

const AddApiary = () => {
  const [apiaryData, setApiaryData] = useState<ApiaryData[]>([]);
  const [apiaryNumbers, setApiaryNumbers] = useState<IncrementalData[]>([]);

  useEffect(() => {
    getRegistryData().then((data) => {
      setApiaryData(data);
    })
  }, []);

  useEffect(() => {
    getNumbersData().then((numbers) => {
      setApiaryNumbers(numbers);
    })
  }, []);


  const addFormData = (apiary: ApiaryData, numbers?: IncrementalData) => {
    const validate = validateSerialNumber(apiary.serialNumber, apiaryData);
    if (!validate) {
      setApiaryData([...apiaryData, apiary])
      sendRegistryData(apiary)
    } else {
      alert('Serial number Exist')
    }
    if (numbers && !validate) {
      setApiaryNumbers([...apiaryNumbers, numbers])
      sendIncrementation(numbers)
    }
  }

  return (
    <ContentWindow>
      <span>
        Add new Apiary using below form.
      </span>
      <Form addFormData={addFormData}
            apiaryNumbers={apiaryNumbers}
      />
      <label>
        Set Filter Date:
      </label>
    </ContentWindow>
  )
};

export default AddApiary;
