import { ApiaryData, IncrementalData } from "../interfaces/dbData";
import { Logo } from "../components/Header/styles";

export async function getRegistryData() {
  const data = await fetch('/registry-list');
  return data.json();
}

export async function getNumbersData() {
  const data = await fetch('/numbers-list');
  return data.json();
}

export async function sendRegistryData(apiaryData: ApiaryData) {
  try {
    await fetch('http://localhost:4000/registry-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify(apiaryData)
    })
  } catch (e) {
    console.log(e)
  }
}

export async function sendIncrementation(incrementData: IncrementalData) {
  console.log("Increment data service: ", incrementData)
  try {
    await fetch('http://localhost:4000/numbers-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(incrementData)
    })
  } catch (e) {
    console.log(e)
  }
}
