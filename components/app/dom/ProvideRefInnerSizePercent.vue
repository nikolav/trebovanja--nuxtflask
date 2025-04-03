<script setup lang="ts">
// #d0a6bf32-6515-5824-917b-3d2086c895dc
// ##imports
// ##config ##const
const props = withDefaults(
  defineProps<{
    percent?: any;
    refLookup?: any;
  }>(),
  {
    percent: 0.99,
  }
);
// ##utils
const { width: W, height: H } = useElementSize(props.refLookup);
const size_ = computed(() =>
  Math.round(Math.min(W.value, H.value) * Number(props.percent))
);
// ##icons
// ##refs ##flags
// ##data ##auth ##state
// ##computed
// ##forms ##helpers ##handlers
// ##watch
// ##hooks:lifecycle
// ##head ##meta
// ##provide

// @@eos
</script>
<template>
  <slot :size="size_" />
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
