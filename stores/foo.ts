export const useStoreFoo = defineStore("foo:Bzz9ZfY8tNmRh", () => {
  const store = ref(<any>{ FOO: "QYPyi6rVJWi" });
  const dump = () => {
    console.log({ "store:foo --dump": store.value });
  };

  return {
    store,
    //
    dump,
  };
});
