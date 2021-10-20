import { useReducer, useState } from "react";
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

const INITIAL_STATE: string[] = [];

function reducer(state: typeof INITIAL_STATE, action: { type: string }) {
  switch (action.type) {
    case "ADD_STANDARD": {
      return [...state, "standard"];
    }
    // TODO: I don't think this is the best way to structure the data
    // Find a better way to do this
    case "REMOVE_STANDARD": {
      const copy = [...state];
      const index = state.indexOf("standard");
      if (index == -1) return copy;
      copy.splice(index, 1);
      return copy;
    }
    case "ADD_FEATURED": {
      return [...state, "featured"];
    }
    case "REMOVE_FEATURED": {
      const copy = [...state];
      const index = state.indexOf("featured");
      if (index == -1) return copy;
      copy.splice(index, 1);
      return copy;
    }
    case "ADD_PREMIUM": {
      return [...state, "premium"];
    }
    case "REMOVE_PREMIUM": {
      const copy = [...state];
      const index = state.indexOf("premium");
      if (index == -1) return copy;
      copy.splice(index, 1);
      return copy;
    }
    default: {
      return state;
    }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, []);
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
              onClick={() => dispatch({ type: "ADD_STANDARD" })}
            >
              add standard
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "REMOVE_STANDARD" })}
            >
              remove standard
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => dispatch({ type: "ADD_FEATURED" })}
            >
              add featured
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "REMOVE_FEATURED" })}
            >
              remove featured
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => dispatch({ type: "ADD_PREMIUM" })}
            >
              add premium
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "REMOVE_PREMIUM" })}
            >
              remove premium
            </button>
          </div>
        </div>
        <div>
          Chosen values: <pre>{state}</pre>{" "}
        </div>
        <p>Total is: {calculateTotal(buyer, state)}</p>
      </main>
    </div>
  );
}

export default App;
