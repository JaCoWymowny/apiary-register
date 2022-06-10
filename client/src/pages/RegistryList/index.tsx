import { Key, useState } from "react";
import {
  ContentWindow,
  RegistryTable,
  Thead
} from "./styles";
import apiaryData from "../../interfaces/dbData";

let mock: apiaryData[] = [
  {
    number: 1234345,
    date: "01-01-2022",
    name: "first"
  },
  {
    number: 234567,
    date: "02-02-2022",
    name: "second"
  },
  {
    number: 345678,
    date: "03-03-2022",
    name: "third"
  },
  {
    number: 456789,
    date: "04-04-2022",
    name: "fourth"
  },
];

const RegistryList = () => {
  const [regPosition, setRegPosition] = useState(mock);

  console.log(regPosition);

  const tableBody = () => {
    return regPosition?.filter((regItem: apiaryData) => regItem).map((regItem: apiaryData, index: Key) => {
      return (
        <tr key={index}>
          <td>{regItem.date}</td>
          <td>{regItem.name}</td>
          <td>{regItem.number}</td>
        </tr>
      )
    })
  };

  return (
    <ContentWindow>
      <span>
        Check registry data on this list:
      </span>
      <RegistryTable>
        <Thead>
          <tr>
            <th style={{width: "15%"}}>Date</th>
            <th style={{width: "15%"}}>Name</th>
            <th style={{width: "20%"}}>Number</th>
          </tr>
        </Thead>
        <tbody>
        {regPosition && tableBody()}
        </tbody>
      </RegistryTable>
    </ContentWindow>
  )
};

export default RegistryList;

