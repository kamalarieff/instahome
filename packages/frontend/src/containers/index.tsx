import React, { useReducer, useState } from "react";
import { useQuery } from "react-query";
import type { Company, Offers } from "@instahome/types";

import { convertAPItoRules, calculateTotalByRules } from "utils/engine";
import { fetchCompanies, fetchCompanyById } from "apis/companies";

const INITIAL_STATE: string[] = [];

function reducer(state: typeof INITIAL_STATE, action: { type: string }) {
  switch (action.type) {
    case "ADD_STANDARD": {
      return [...state, "standard"];
    }
    // TODO: I don't think this is the best way to structure the data
    // a better way to do this is not to store it in an array but in an map instead
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

// TODO: find a better name for this
type AddRemoveType = { add: () => void; remove: () => void };

interface Props {
  children: ({
    standard,
    featured,
    premium,
    cart,
    companyList,
    total,
    setCompany,
  }: {
    standard: AddRemoveType;
    featured: AddRemoveType;
    premium: AddRemoveType;
    cart: typeof INITIAL_STATE;
    companyList: Company[];
    total: number;
    setCompany: React.Dispatch<React.SetStateAction<string | undefined>>;
  }) => JSX.Element;
}

/**
 * @description Since this is a container, it shouldn't have any responsibility in terms of UI.
 * Containers should only have business logic.
 *
 * It exposes a children as a function so it is up to the calling component to determine which
 * property it wants to use
 */
function Container({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, []);
  const [buyer, setBuyer] = useState<string>();

  const standard = {
    add: () => dispatch({ type: "ADD_STANDARD" }),
    remove: () => dispatch({ type: "REMOVE_STANDARD" }),
  };

  const featured = {
    add: () => dispatch({ type: "ADD_FEATURED" }),
    remove: () => dispatch({ type: "REMOVE_FEATURED" }),
  };

  const premium = {
    add: () => dispatch({ type: "ADD_PREMIUM" }),
    remove: () => dispatch({ type: "REMOVE_PREMIUM" }),
  };

  const { data: companyList = [], isSuccess } = useQuery<Company[]>(
    ["companies"],
    async function () {
      const res = await fetchCompanies();
      return res.json();
    }
  );

  const { data: companyData = [] } = useQuery<Offers[]>(
    ["companyId", buyer],
    async function () {
      const res = await fetchCompanyById(buyer);
      return res.json();
    },
    // TODO: if you do this, you might get unexpected behavior where
    // If you choose a company that does not have any rules, it will use the previous chosen rule
    { initialData: [], enabled: buyer != null }
  );

  const rules = convertAPItoRules(companyData);

  const total = calculateTotalByRules(state, rules);

  return children({
    standard,
    featured,
    premium,
    cart: state,
    total,
    companyList: isSuccess ? companyList : [],
    setCompany: setBuyer,
  });
}

// TODO: find a better name for this
export default Container;
