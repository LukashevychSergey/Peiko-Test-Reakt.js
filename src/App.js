import React, { useState, useCallback } from "react";
import "./styles.css";
import simulateAsyncReq from "./utils/simulateAsyncReq";
import { payload } from "./mocData/index";

const formatResponse = (rawData) => {
  const length = rawData.start.length;
  const resultArr = [];
  for (let i = 0; i < length; i++) {
    let obj = {};
    obj.stocks = rawData.stocks[i];
    obj.current = rawData.current[i].toFixed(2);
    obj.change = (rawData.current[i] - rawData.start[i]).toFixed(2);

    resultArr.push(obj);
  }
  resultArr.sort(function (a, b) {
    if (a.stocks > b.stocks) {
      return 1;
    }
    if (a.stocks < b.stocks) {
      return -1;
    }

    return 0;
  });

  return resultArr;
};
export default function App() {
  const [data, setData] = useState([]);

  const handleButtonClick = useCallback(() => {
    simulateAsyncReq(payload)
      .then((res) => {
        const resultArr = formatResponse(res);
        setData(resultArr);
        console.log(resultArr);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setData]);
  return (
    <div className="App">
      <button onClick={handleButtonClick}>Get data</button>
      <div className="table-head">
        <div className="table-head-col">Stock</div>
        <div className="table-head-col">Current</div>
        <div className="table-head-col">Change</div>
      </div>
      {data.map((item) => (
        <div className="row" key={item.stocks}>
          <div className="col">{item.stocks}</div>
          <div className="col">{item.current}</div>
          <div className={`col ? ${item.change >= 0 ? "colgreen" : "colred"}`}>
            {item.change >= 0 ? "+" + item.change : item.change}
          </div>
        </div>
      ))}
    </div>
  );
}
