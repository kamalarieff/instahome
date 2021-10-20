import { COMPANIES_ENDPOINT } from "configs";

/**
 * @description Fetch the list of companies
 */
function fetchCompanies() {
  return fetch(COMPANIES_ENDPOINT);
}

/**
 * @description Fetch the offer of a company based on the id
 */
function fetchCompanyById(companyId: string | undefined) {
  if (typeof companyId === "undefined") {
    throw "Company ID not given";
  }
  return fetch(`${COMPANIES_ENDPOINT}/${companyId}`);
}

export { fetchCompanies, fetchCompanyById };
