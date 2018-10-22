export function convert(amount = 0, rates) {
  // convert to euro first...
  const baseAmount = amount * ((rates && rates.baseRate) || 1);
  // then to the new rate
  return baseAmount * ((rates && rates.rate) || 1);
};