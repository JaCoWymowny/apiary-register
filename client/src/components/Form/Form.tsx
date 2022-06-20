import  {
  FC,
  useEffect,
  useState } from "react";
import { currentIncrementation } from "../../helper/currentIncrementation";
import { serialNumberGenerator } from "../../helper/serialNumber";
import { getNumbersData } from "../../services/registryDataService";
import {
  ApiaryData,
  IncrementalData
} from "../../interfaces/dbData";

interface Props {
  addFormData: (apiary: ApiaryData, numbers?: IncrementalData | undefined) => void
  apiaryControlsNumbers: IncrementalData[]
}

const Form:FC<Props> = ({ addFormData, apiaryControlsNumbers }) => {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [apiaryName, setApiaryName] = useState("");
  const [formManuallyEnteredNumber, setFormManuallyEnteredNumber] = useState("");
  const [validateControlNumbersGenerator, setValidateControlNumbersGenerator] = useState<IncrementalData[]>([]);

  useEffect(() => {
    getNumbersData().then((numbers) => {
      setValidateControlNumbersGenerator(numbers);
    })
  }, [apiaryControlsNumbers]);

  const CreateDataToSave = () => {
    if (!formManuallyEnteredNumber) {
      const incrementalValue = currentIncrementation(date, validateControlNumbersGenerator);
      const serialNumber = serialNumberGenerator(date, incrementalValue);
      let apiaryData: ApiaryData = {
        serialNumber: serialNumber,
        name: apiaryName,
        date: date
      }
      let incrementControlNumberData: IncrementalData = {
        date: date,
        generatedCode: incrementalValue
      }
      addFormData(apiaryData, incrementControlNumberData);
    } else if (apiaryName && (parseInt(formManuallyEnteredNumber) > 99999) || formManuallyEnteredNumber.length < 5) {
      alert("To high number or digits less than 5");
    } else {
      const serialNumber = serialNumberGenerator(date, formManuallyEnteredNumber);
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
    setFormManuallyEnteredNumber('');
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
             value={formManuallyEnteredNumber}
             onChange={(e) => {
               setFormManuallyEnteredNumber(e.target.value)}}
      />

      <button type='submit'
      >
        Add To Registry ✔
      </button>
    </form>
  )
}

export default Form;
