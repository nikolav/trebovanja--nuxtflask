import { z } from "zod";
import validator from "validator";
import { schemaJsonDataRecord, schemaJsonData } from "./json";
import { USER_ID_DEFAULT, USERS_HAS_POLICY_ADMINS } from "@/config";

const idsReserved = (<number[]>[]).concat(
  USERS_HAS_POLICY_ADMINS,
  USER_ID_DEFAULT
);

export { schemaJsonData, schemaJsonDataRecord } from "./json";
export const authLoginCreds = z.object({
  creds: z.string().refine((s) => {
    try {
      const [email, password] = s.split(":");
      return isEmail(email) && 0 < len(password);
    } catch (error) {
      //
    }
    return false;
  }),
});
export const schemaPassword = z.coerce.string().min(2);
export const schemaAuthCredentials = z.object({
  email: z.string().email(),
  password: schemaPassword,
});
export const schemaPasswordsMatch = z
  .object({
    password1: schemaPassword,
    password2: schemaPassword,
  })
  .refine((d) => d.password1 === d.password2);
export const schemaAuthCredentialsWithPolicies = schemaAuthCredentials.extend({
  policies: z.optional(z.array(z.string())),
});
export const schemaAuthData = z.object({
  id: z.coerce.number(),
  email: z.string().email(),
  profile: z.optional(z.union([z.null(), z.record(schemaJsonData)])),
  // computed
  admin: z.boolean(),
  approved: z.boolean(),
  email_verified: z.boolean(),
  external: z.boolean(),
  manager: z.boolean(),
  // @ts
  created_at: z.string(),
  updated_at: z.string(),
});
export const schemaAuthDataAdmin = z.object({
  email: z.string().email(),
  id: z.coerce.number().refine((uid) => USERS_HAS_POLICY_ADMINS.includes(uid)),
});
export const schemaAuthAccount = z.object({
  id: z.coerce.number(),
  email: z.string().email(),
  profile: z.optional(z.union([z.null(), schemaJsonDataRecord])),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});
export const schemaChatTask = z.object({
  name: z.coerce.string().trim().min(1),
  comment: z.coerce.string().trim().min(1),
});
export const schemaEmail = z.string().email();
export const schemaJwt = z.string().refine(validator.isJWT);
export const schemaStorageMeta = z.object({
  title: z.optional(z.coerce.string()),
  description: z.optional(z.coerce.string()),
  public: z.optional(z.coerce.boolean()),
});
export const schemaTask = z.object({
  title: z.string().trim().min(1),
  completedAt: z.coerce.date().nullable().default(null),
  href: z.optional(z.string().trim()),
  description: z.optional(z.string().trim()),
});
export const schemaUsersIsDefault = z
  .object({
    email: z.string().email(),
    id: z.coerce.number(),
  })
  .refine((d) => USER_ID_DEFAULT === d.id);
export const schemaUsersNotReserved = z
  .object({
    email: z.string().email(),
    id: z.coerce.number(),
  })
  .refine((d) => !idsReserved.includes(d.id));
export const schemaHasFieldName = z.object({
  name: z.string(),
});
export const schemaAssetsInput = z.object({
  name: z.string(),
  code: z.optional(z.string()),
  barcode: z.optional(z.string()),
  link: z.optional(z.string()),
});
