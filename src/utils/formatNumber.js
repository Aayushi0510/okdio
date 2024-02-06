import { replace } from "lodash";
import numeral from "numeral";

// ----------------------------------------------------------------------

export function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? "$0,0" : "$0,0.00");
}

export function fPercent(number) {
  return numeral(number / 100).format("0.0%");
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
  return replace(numeral(number).format("0.00a"), ".00", "");
}

export function fData(number) {
  return numeral(number).format("0.0 b");
}

export function fTurkishPercent(str) {
  if (!str) return false;
  const splitValue = str.split("%");
  const joinValue = `%${splitValue[0]}`;
  const newValue = joinValue;
  return newValue;
}

/**
 *
 * @description util function to format numbers or strings.
 * @param {*} locale - string or undefined
 * @param {*} number - string or number or empty
 * @param {*} style - currency, percent
 * @param {*} isNumber - isNumber means return numeric value
 * @memberof Util
 */

export const numberStringFormatter = (
  locale = undefined,
  number = "",
  style = "",
  currency = undefined,
  isNumber = false
) => {
  const PRICE_FORMATTER = Intl.NumberFormat(locale, {
    style: style,
    currency: currency,
  });

  return PRICE_FORMATTER.format(isNumber ? Number(number) : number);
};
