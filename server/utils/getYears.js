const getYears = (financialYear) => {
  const [startYearStr, endYearStr] = financialYear.split("-");

  const startYear = parseInt(startYearStr);
  const endYear = parseInt(startYearStr.slice(0, 2) + endYearStr);

  return [startYear, endYear];
};

export default getYears;
