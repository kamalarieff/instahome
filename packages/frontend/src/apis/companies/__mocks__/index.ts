const fetchCompanies = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

const fetchCompanyById = jest.fn();

/* const fetchCompanyById = jest.fn().mockImplementation(() => {
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([{ adId: "standard", type: "discount", newPrice: 1 }]),
  });
}); */

export { fetchCompanies, fetchCompanyById };
