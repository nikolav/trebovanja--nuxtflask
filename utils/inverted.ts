export const inverted = <T = any>(node: T) =>
  transform(
    Object(node),
    (accum: any, value: any, field: any) => {
      accum[String(value)] = field;
      return accum;
    },
    <any>{}
  );
