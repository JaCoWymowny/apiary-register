import {
  useEffect,
  useState
} from "react";
import Form from "../../components/Form/Form";
import {
  getNumbersData,
  getRegistryData,
  sendIncrementation,
  sendRegistryData
} from "../../services/registryDataService";
import { validateSerialNumber } from "../../helper/validateSerialNumber";
import {
  ApiaryData,
  IncrementalData
} from "../../interfaces/dbData";
import { ContentWindow } from "./styles";



const AddApiary = () => {
  const [apiaryData, setApiaryData] = useState<ApiaryData[]>([]);
  const [apiaryControlsNumbers, setApiaryControlsNumbers] = useState<IncrementalData[]>([]);

  useEffect(() => {
    getRegistryData().then((data) => {
      setApiaryData(data);
    })
  }, []);

  useEffect(() => {
    getNumbersData().then((numbers) => {
      setApiaryControlsNumbers(numbers);
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
      setApiaryControlsNumbers([...apiaryControlsNumbers, numbers])
      sendIncrementation(numbers)
    }
  }

  return (
    <ContentWindow>
      <span>
        Add new Apiary using below form.
      </span>
      <Form addFormData={addFormData}
            apiaryControlsNumbers={apiaryControlsNumbers}
      />
    </ContentWindow>
  )
};

export default AddApiary;
