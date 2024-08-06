export default function useToNumber(e, country) {
  const value = parseFloat(e.target.value.replace(/,/g, ""));
  const dealBasR = parseFloat(country.deal_bas_r.replace(/,/g, ""));
  return [value, dealBasR];
}
