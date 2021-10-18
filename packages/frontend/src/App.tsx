import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { calculateTotal } from "./utils";

const buyers = [
  "fake company",
  "uem sunrise",
  "sime darby",
  "igb berhad",
  "mah sing group",
];

function App() {
  const [count, setCount] = useState<string[]>([]);
  const [buyer, setBuyer] = useState<string>();

  return (
    <div className="App">
      <main className="App-header flex space-y-2">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <select
          id="buyers"
          name="buyers"
          className="text-black"
          onChange={(e) => {
            setBuyer(e.target.value);
          }}
        >
          {buyers.map((buyer) => (
            <option key={buyer} value={buyer}>
              {buyer}
            </option>
          ))}
        </select>
        <div className="flex-col space-y-2">
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setCount((count) => [...count, "standard"])}
            >
              add standard
            </button>
            <button
              type="button"
              onClick={() => setCount((count) => [...count, "standard"])}
            >
              remove standard
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setCount((count) => [...count, "featured"])}
            >
              add featured
            </button>
            <button
              type="button"
              onClick={() => setCount((count) => [...count, "featured"])}
            >
              remove featured
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setCount((count) => [...count, "premium"])}
            >
              add premium
            </button>
            <button
              type="button"
              onClick={() => setCount((count) => [...count, "premium"])}
            >
              remove premium
            </button>
          </div>
        </div>
        <div>
          Chosen values: <pre>{count}</pre>{" "}
        </div>
        <p>Total is: {calculateTotal(buyer, count)}</p>
      </main>
    </div>
  );
}

export default App;
