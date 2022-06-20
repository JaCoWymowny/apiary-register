import React, { FC, useEffect, useState } from "react";
import { currentIncrementation } from "../../helper/currentIncrementation";
import { ApiaryData, IncrementalData } from "../../interfaces/dbData";
import { serialNumberGenerator } from "../../helper/serialNumber";
import { getNumbersData } from "../../services/registryDataService";

interface Props {
  addFormData: (apiary: ApiaryData, numbers?: IncrementalData | undefined) => void
  apiaryNumbers: IncrementalData[]
}

const Form:FC<Props> = ({ addFormData, apiaryNumbers }) => {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [apiaryName, setApiaryName] = useState("");
  const [manuallyEnteredNumber, setManuallyEnteredNumber] = useState("");
  const [validateNumberGenerator, setValidateNumberGenerator] = useState<IncrementalData[]>([]);

  useEffect(() => {
    getNumbersData().then((numbers) => {
      setValidateNumberGenerator(numbers);
    })
  }, [apiaryNumbers]);

  const CreateDataToSave = () => {
    if (!manuallyEnteredNumber) {
      const incrementalValue = currentIncrementation(date, validateNumberGenerator);
      const serialNumber = serialNumberGenerator(date, incrementalValue);
      let apiaryData: ApiaryData = {
        serialNumber: serialNumber,
        name: apiaryName,
        date: date
      }
      let incrementData: IncrementalData = {
        date: date,
        generatedCode: incrementalValue
      }
      addFormData(apiaryData, incrementData);
    } else if (apiaryName && (parseInt(manuallyEnteredNumber) > 99999) || manuallyEnteredNumber.length < 5) {
      alert("To high number or digits less than 5");
    } else {
      const serialNumber = serialNumberGenerator(date, manuallyEnteredNumber);
      let apiaryData: ApiaryData = {
        name: apiaryName,
        serialNumber: serialNumber,
        date: date
      }
      addFormData(apiaryData)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    CreateDataToSave();
    setApiaryName('');
    setManuallyEnteredNumber('');
    setDate(today);
  };

  return (
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
               setApiaryName(e.target.value)}}
      />

      <label>
        Apiary Number:
      </label>
      <input type="number"
             name="apiary-number"
             value={manuallyEnteredNumber}
             onChange={(e) => {
               setManuallyEnteredNumber(e.target.value)}}
      />

      <button type='submit'
      >
        Add To Registry ✔
      </button>
    </form>
  )
}

export default Form;
