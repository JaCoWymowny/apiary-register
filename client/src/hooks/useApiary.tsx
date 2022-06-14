import ApiaryData from "../interfaces/dbData";

const useApiary = () => {
  const submitApiary = (apiaryData: ApiaryData) => {
    console.log(apiaryData)
  }

  return {submitApiary}
}

export default useApiary;
