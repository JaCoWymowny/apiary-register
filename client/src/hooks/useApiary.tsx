import ApiaryData from "../interfaces/dbData";

const useApiary = () => {
  const submitApiary = async (apiaryData: ApiaryData) => {
    console.log(apiaryData)
    const result = await fetch('http://localhost:4000/add-apiary', {
      method: 'POST',
      body: JSON.stringify(apiaryData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const resultInJson = await result.json();
    console.log(resultInJson);
  }

  return {submitApiary}
}

export default useApiary;
