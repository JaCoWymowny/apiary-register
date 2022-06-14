import React, { FC, useState } from "react";
import { ContentWindow } from "./styles";
import ApiaryData from "../../interfaces/dbData";
import useApiary from "../../hooks/useApiary";
import { SerialNumber } from "../../helper/serialNumberGenerator";



const AddApiary: FC = () => {
  const { submitApiary } = useApiary();
  const { serialNumberGenerator } = SerialNumber();
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [apiaryName, setApiaryName] = useState("");
  const [manuallyEnteredNumber, setManuallyEnteredNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((apiaryName && manuallyEnteredNumber) && (parseInt(manuallyEnteredNumber) < 99999)) {
      setDate(today);
      const serialNumber = serialNumberGenerator(date, manuallyEnteredNumber);
      const apiaryData: ApiaryData = {
        serialNumber: serialNumber,
        date: date,
        name: apiaryName
      }
      submitApiary(apiaryData);
    } else if (apiaryName && (parseInt(manuallyEnteredNumber) > 99999)) {
      alert("za duży nr");
    } else if (apiaryName) {
      const serialNumber = serialNumberGenerator(date, manuallyEnteredNumber);
      const apiaryData: ApiaryData = {
        serialNumber: serialNumber,
        date: date,
        name: apiaryName
      }
      submitApiary(apiaryData);
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
