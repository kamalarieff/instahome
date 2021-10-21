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
              <h6 className="max-w-lg">
                In normal circumstances, you&apos;d have to log in to your
                company. But for the sake of testing, you can just choose your
                company.
              </h6>
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
                  <button type="button" onClick={standard.add} className="add">
                    add standard
                  </button>
                  <button
                    type="button"
                    onClick={standard.remove}
                    className="remove"
                  >
                    remove standard
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button type="button" onClick={featured.add} className="add">
                    add featured
                  </button>
                  <button
                    type="button"
                    onClick={featured.remove}
                    className="remove"
                  >
                    remove featured
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button type="button" onClick={premium.add} className="add">
                    add premium
                  </button>
                  <button
                    type="button"
                    onClick={premium.remove}
                    className="remove"
                  >
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
