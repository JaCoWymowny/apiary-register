import React, { Key, useState } from "react";
import {
  ContentWindow,
  RegistryTable,
  Thead
} from "./styles";
import ApiaryData from "../../interfaces/dbData";

let mock: ApiaryData[] = [
  {
    serialNumber: 723,
    date: "2022-06-14",
    name: "ceta"
  },
  {
    serialNumber: 234,
    date: "2022-06-14",
    name: "delta"
  },
  {
    serialNumber: 645,
    date: "2022-06-15",
    name: "alfa"
  },
  {
    serialNumber: 856,
    date: "2022-06-16",
    name: "beta"
  },
];

const RegistryList = () => {
  const [registryData, setRegistryData] = useState(mock);
  const [order, setOrder] = useState('ascend');
  const [date, setDate] = useState("");



  const sorting = () => {
    if (order === 'ascend') {
      const sorted = [...registryData].sort((a, b) =>
        a.serialNumber - b.serialNumber
      )
      setRegistryData(sorted);
      setOrder('descend');
    } if (order === 'descend') {
      const sorted = [...registryData].sort((a, b) =>
        b.serialNumber - a.serialNumber
      )
      setRegistryData(sorted);
      setOrder('ascend');
    }
  }

  const tableBody = () => {
    return registryData?.filter((item) => item?.date.includes(date)).map((regItem: ApiaryData, index: Key) => {
      return (
        <tr key={index}>
          <td>{regItem.date}</td>
          <td>{regItem.name}</td>
          <td>{regItem.serialNumber}</td>
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
            <th style={{width: "20%"}} onClick={() => sorting()}>Number</th>
          </tr>
        </Thead>
        <tbody>
        {registryData && tableBody()}
        </tbody>
      </RegistryTable>
      <form>
        <label>
          Set Filter Date:
        </label>
        <input
          type="date"
          name="registry-filter"
          min="2022-01-01"
          max="2040-12-31"
          onChange={(e) => setDate(e.target.value)}
        />
      </form>
    </ContentWindow>
  )
};

export default RegistryList;

