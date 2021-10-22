import React from "react";

import { groupCartCountById } from "utils/engine";

import Container from "containers";
import Button from "components/Button";

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
                  <Button onClick={standard.add} variant="add">
                    add standard
                  </Button>
                  <Button onClick={standard.remove} variant="remove">
                    remove standard
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={featured.add} variant="add">
                    add featured
                  </Button>
                  <Button onClick={featured.remove} variant="remove">
                    remove featured
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={premium.add} variant="add">
                    add premium
                  </Button>
                  <Button onClick={premium.remove} variant="remove">
                    remove premium
                  </Button>
                </div>
              </div>
              <div className="h-32">
                Chosen values:{" "}
                <pre>{JSON.stringify(groupCartCountById(cart))}</pre>{" "}
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
