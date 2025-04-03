export const useStoreAppProcessing = defineStore("appProcessing", () => {
  const {
    key: { APP_PROCESSING },
  } = useAppConfig();
  const processing = useGlobalFlag(APP_PROCESSING);
  const watchAll$ = ref<any[]>([]);
  const addWatch = (...args: any[]) => {
    watchAll$.value.push(...args);
  };
  const unwatch = (...args: any[]) => {
    pullAll(watchAll$.value, args);
  };
  const reset = () => {
    watchAll$.value = [];
  };
  watchEffect(() => {
    processing.value = some(watchAll$.value, (w: any) => !!toValue(w));
  });
  return {
    processing,
    // add watchers
    addWatch,
    // remove watchers
    unwatch,
    // remove all watchers
    reset,
    // alias
    watchProcessing: addWatch,
  };
});
