// 27fb32b3-9619-559b-a125-da43e5f4047d
export const useUniqueId = (initial = true, prefix_ = `${idGen()}:`) => {
  const idGen_ = () => `${uniqueId(prefix_)}`;
  const ID = ref(initial ? idGen_() : "");
  const update = () => {
    ID.value = idGen_();
  };

  return assign(update, { ID });
};
