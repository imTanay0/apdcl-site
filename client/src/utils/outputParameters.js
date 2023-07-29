export const calcBillingEfficiency = (unitBilled, MUInjection) => {
  // Should return in %
  return (unitBilled / MUInjection);
};

export const calcAT_CLossesIRCA = (TCIRCA, CDIRCA, billingEff) => {
  const collectionEff = TCIRCA / CDIRCA;

  // Should return in %
  // const data = 1 - collectionEff * billingEff;

  return 1 - collectionEff * billingEff;
};

export const calcAvgBillingRate = (CDIRCA, unitBilled) => {
  // Round it to upto 2 decimal digits
  return parseFloat((CDIRCA / (unitBilled * 10)).toFixed(2));
};

// ARR = Average Revenue Realisation
export const calcARR = (totalCollectionIRCA, MUInjection) => {
  // Round it to upto 2 decimal digits
  return parseFloat((totalCollectionIRCA / (MUInjection * 10)).toFixed(2));
};
