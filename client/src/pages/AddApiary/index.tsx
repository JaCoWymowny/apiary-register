import React, { FC, useState } from "react";
import { ContentWindow } from "./styles";

const AddApiary: FC = () => {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [apiaryValue, setApiaryValue] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setDate(today);
    setApiaryValue("");
    alert(date + "" + apiaryValue)
  }

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
               value={apiaryValue}
               onChange={(e) => setApiaryValue(e.target.value)}
        />

        <label>
          Apiary Number:
        </label>
        <input type="number"
               name="apiary-number"
               value={number}
               onChange={(e) => setNumber(e.target.value)}
        />

        <button type='submit'>
          Add To Registry ✔
        </button>
      </form>
    </ContentWindow>
  )
};

export default AddApiary;
