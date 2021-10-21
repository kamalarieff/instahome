import React from "react";

import Container from "containers";

import "./App.css";

function App() {
  return (
    <div className="App">
      <main className="App-header flex space-y-8">
        <Container>
          {({
            standard,
            featured,
            premium,
            cart,
            total,
            companyList,
            setCompany,
          }) => (
            <>
              <select
                id="buyers"
                data-testid="select-option"
                name="buyers"
                className="text-black"
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
                defaultValue={0}
              >
                {[...companyList, { id: 0, name: "none" }].map((buyer) => (
                  <option key={buyer.id} value={buyer.id}>
                    {buyer.name}
                  </option>
                ))}
              </select>
              <div className="flex-col space-y-2">
                <div className="flex space-x-2">
                  <button type="button" onClick={standard.add}>
                    add standard
                  </button>
                  <button type="button" onClick={standard.remove}>
                    remove standard
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button type="button" onClick={featured.add}>
                    add featured
                  </button>
                  <button type="button" onClick={featured.remove}>
                    remove featured
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button type="button" onClick={premium.add}>
                    add premium
                  </button>
                  <button type="button" onClick={premium.remove}>
                    remove premium
                  </button>
                </div>
              </div>
              <div className="h-32">
                Chosen values: <pre>{cart.map((item) => `${item},`)}</pre>{" "}
              </div>
              <p>Total is: {total}</p>
            </>
          )}
        </Container>
      </main>
    </div>
  );
}

export default App;
