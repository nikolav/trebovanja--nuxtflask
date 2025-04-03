export const useScrollBottom = (
  OrRefElement?: any,
  onFlagActive?: any,
  _defaultB = 122333
) => {
  const el$ = ref();
  watchEffect(() => {
    el$.value = toValue(OrRefElement);
  });
  const { y: yScroll, arrivedState } = useScroll(el$);
  const scrollBottomHard = () => {
    yScroll.value = el$.value?.scrollHeight || _defaultB;
  };
  const scrollBottom = () => {
    nextTick(scrollBottomHard);
  };
  const scrollBottomIfEnd = (timeout = 345) => {
    if (arrivedState.bottom) setTimeout(scrollBottom, timeout);
  };

  watch(onFlagActive, (isActive) => {
    if (isActive) scrollBottom();
  });

  return { scrollBottom, scrollBottomIfEnd, scrollBottomHard };
};
