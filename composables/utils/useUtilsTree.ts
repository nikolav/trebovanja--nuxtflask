import { tree } from "@/utils/tree";

export const useUtilsTree = () => {
  const t = ref(new tree());
  return t;
};
