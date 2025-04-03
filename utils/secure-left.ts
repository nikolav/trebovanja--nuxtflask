import { escapeRegex } from "./escape-regex";
export const secureLeft = (prefix: string, s: string) =>
  new RegExp(`^${escapeRegex(prefix)}`).test(s) ? s : `${prefix}${s}`;
