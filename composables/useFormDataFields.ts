import type { TOrPromise } from "@/types";
type TFormFieldsOnSubmit = <T = any>(...args: T[]) => TOrPromise<void>;
export const useFormDataFields = (
  KEY: string,
  FIELDS: Record<string, boolean>,
  config: {
    onSubmit?: TFormFieldsOnSubmit;
    schema?: any;
    dump?: any;
  } = {}
) => {
  const main$$ = useStoreMain();
  const form = reduce(
    FIELDS,
    (formdata: any, flag: boolean, field: string) => {
      if (flag) {
        formdata[field] = computed({
          get: () => main$$.get(`${KEY} --${field}`),
          set: (val) => main$$.put({ [`${KEY} --${field}`]: val }),
        });
      }
      return formdata;
    },
    <Record<string, Ref>>{}
  );
  const valid = computed(() =>
    config.schema ? config.schema.safeParse(dump()).success : true
  );
  const dump =
    config.dump ||
    (() =>
      reduce(
        FIELDS,
        (data: any, flag: boolean, field: string) => {
          if (flag) {
            data[field] = form[field].value;
          }
          return data;
        },
        <any>{}
      ));
  const submit = async () => {
    if (!config.onSubmit) return;
    if (!valid.value) return;
    await config.onSubmit(dump());
  };
  const clear = () => {
    each(FIELDS, (flag: any, field: string) => {
      if (flag) {
        form[field].value = undefined;
      }
    });
  };

  return {
    KEY,
    form,
    valid,
    submit,
    clear,
    dump,
  };
};
