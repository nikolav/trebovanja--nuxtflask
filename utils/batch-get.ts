export const batchGet = (source: any, fields: Record<string, string>) =>
  transform(
    fields,
    (accum: any, dest: any, path: any) => set(accum, dest, get(source, path)),
    <Record<string, any>>{}
  );
