export const calcBillingEfficiency = (unitBilled, MUInjection) => {
  return unitBilled / MUInjection;
};

export const calcAT_CLossesIRCA = (TCIRCA, CDIRCA, billingEff) => {
  const collectionEff = TCIRCA / CDIRCA;

  return 1 - collectionEff * billingEff;
};

export const calcAvgBillingRate = (CDIRCA, unitBilled) => {
  return parseFloat((CDIRCA / (unitBilled * 10)).toFixed(2));
};

// ARR = Average Revenue Realisation
export const calcARR = (totalCollectionIRCA, MUInjection) => {
  return parseFloat(
    parseFloat((totalCollectionIRCA / (MUInjection * 10)).toFixed(2))
  );
};
