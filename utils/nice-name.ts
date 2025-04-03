import type { OrNoValue } from "@/types";
export const niceName = (
  firstName: OrNoValue<string> = "",
  lastName: OrNoValue<string> = ""
) =>
  [firstName, lastName]
    .filter(Boolean)
    .map(trim)
    .map(startCase)
    .filter(Boolean)
    .join(" ");
