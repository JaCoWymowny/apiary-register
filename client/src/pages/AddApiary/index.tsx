import React, { FC, useEffect, useState } from "react";
import { ContentWindow } from "./styles";
import { ApiaryData, IncrementalData } from "../../interfaces/dbData";
import { serialNumberGenerator } from "../../helper/serialNumber";
import { currentIncrementation, } from "../../helper/currentIncrementation";
import {
  getNumbersData,
  getRegistryData,
  sendIncrementation,
  sendRegistryData
} from "../../services/registryDataService";

const AddApiary: FC = () => {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [apiaryName, setApiaryName] = useState("");
  const [manuallyEnteredNumber, setManuallyEnteredNumber] = useState("");
  const [validateNumberGenerator, setValidateNumberGenerator] = useState<IncrementalData[]>([]);
  const [registryData, setRegistryData] = useState<ApiaryData[]>([]);

  useEffect(() => {
    getNumbersData().then((numbers) => {
      setValidateNumberGenerator(numbers);
    })
  }, []);

  useEffect(() => {
    getRegistryData().then((data) => {
      setRegistryData(data)
    })
  }, []);


  const CreateAndSendRegistryData = () => {
    if (!manuallyEnteredNumber) {
      const incrementalValue = currentIncrementation(date, validateNumberGenerator);
      const serialNumber = serialNumberGenerator(date, incrementalValue);
      let apiaryData: ApiaryData = {
        name: apiaryName,
        serialNumber: serialNumber,
        date: date
      }
      let incrementData: IncrementalData = {
        date: date,
        generatedCode: incrementalValue
      }
      sendIncrementation(incrementData);
      sendRegistryData(apiaryData);

      getNumbersData().then((numbers) => {
        console.log(numbers)
        setValidateNumberGenerator(numbers);
      })
    }
    else if (apiaryName && (parseInt(manuallyEnteredNumber) > 99999)) {
      alert("za duży nr");
    } else {
      const serialNumber = serialNumberGenerator(date, manuallyEnteredNumber);
      let apiaryData: ApiaryData = {
        name: apiaryName,
        serialNumber: serialNumber,
        date: date
      }
     sendRegistryData(apiaryData);
    }
    getRegistryData().then((data) => {
      setRegistryData(data)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    CreateAndSendRegistryData();
    setDate(today);
    setApiaryName('');
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
               onChange={(e) => {
                 setApiaryName(e.target.value)}
        }
        />

        <label>
          Apiary Number:
        </label>
        <input type="number"
               name="apiary-number"
               value={manuallyEnteredNumber}
               onChange={(e) => setManuallyEnteredNumber(e.target.value)}
        />

        <button type='submit'
        >
          Add To Registry ✔
        </button>
      </form>
    </ContentWindow>
  )
};

export default AddApiary;
