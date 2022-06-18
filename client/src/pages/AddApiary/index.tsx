import React, { FC, useEffect, useState } from "react";
import { ContentWindow } from "./styles";
import { ApiaryData, IncrementalData } from "../../interfaces/dbData";
import { serialNumber } from "../../helper/serialNumber";
import {
  getNumbersData,
  getRegistryData, sendIncrementation,
  sendRegistryData
} from "../../services/registryDataService";
import { currentIncrementation, increment } from "../../helper/currentIncrementation";
import { validateSerialNumber } from "../../helper/validateSerialNumber";


const AddApiary: FC = () => {
  const { serialNumberGenerator } = serialNumber();
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [apiaryName, setApiaryName] = useState("");
  const [apiaryRegistryList, setApiaryRegistryList] = useState<ApiaryData[]>([])
  const [manuallyEnteredNumber, setManuallyEnteredNumber] = useState("");
  const [validateNumberGenerator, setValidateNumberGenerator] = useState<IncrementalData[]>([]);

  useEffect(() => {
    getRegistryData().then((data) => {
      setApiaryRegistryList(data);
    })
  }, []);

  useEffect(() => {
    getNumbersData().then((numbers) => {
      setValidateNumberGenerator(numbers);
    })
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((apiaryName && manuallyEnteredNumber) && (parseInt(manuallyEnteredNumber) < 99999)) {
      setDate(today);
      const serialNumber = serialNumberGenerator(date, manuallyEnteredNumber);
      const check = validateSerialNumber(serialNumber, apiaryRegistryList);
      if (check) {
        alert("serial number exist")
        e.preventDefault();
      } else {
        let apiaryData: ApiaryData = {
          serialNumber: serialNumber,
          date: date,
          name: apiaryName
        }
        sendRegistryData(apiaryData);
      }
    }
    else if (apiaryName && (parseInt(manuallyEnteredNumber) > 99999)) {
      alert("za duży nr");
    }
    else if (apiaryName) {
      const lastGeneratedNumber = currentIncrementation(date, validateNumberGenerator);
      console.log(lastGeneratedNumber);
      const incrementalValue = increment(date, lastGeneratedNumber);
      const serialNumber = serialNumberGenerator(date, incrementalValue);
      let apiaryData: ApiaryData = {
        serialNumber: serialNumber,
        date: date,
        name: apiaryName
      }
      let incrementData: IncrementalData = {
        date: date,
        generatedCode: incrementalValue
      }
      sendIncrementation(incrementData);
      sendRegistryData(apiaryData);
    }
    setApiaryName("");
    setManuallyEnteredNumber("");
  };

  return (
    <ContentWindow>
      <span>
        Add new Apiary using below form.
      </span>
      <form
        style={{ display: "inline-grid", gridTemplateColumns: "auto auto", gridGap: "10px 50px" }}
        onSubmit={handleSubmit}
      >

        <label>
          Register Date:
        </label>
        <input type="date"
               name="register-day"
               min={today}
               max="2040-12-31"
               value={date}
               onChange={(e) => setDate(e.target.value)}
        />

        <label>
          Apiary Name:
        </label>
        <input type="text"
               name="apiary-name"
               value={apiaryName}
               onChange={(e) => setApiaryName(e.target.value)}
        />

        <label>
          Apiary Number:
        </label>
        <input type="number"
               name="apiary-number"
               value={manuallyEnteredNumber}
               onChange={(e) => setManuallyEnteredNumber(e.target.value)}
        />

        <button type='submit'>
          Add To Registry ✔
        </button>
      </form>
    </ContentWindow>
  )
};

export default AddApiary;
