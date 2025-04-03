<script setup lang="ts">
// <Effect v-model="mUniqueID" name="tada">
//   <CartButton />
// </Effect>

// ##imports
// ##config ##const
const props = defineProps<{
  propsContainer?: any;
  name?: string;
  options?: { duration?: any; onEnd?: any };
}>();
const { effect: optionsEffectDefault } = useAppConfig();
// :effectID
const mIsActive = defineModel();
// ##utils
// ##icons
// ##refs ##flags
// ##data ##auth ##state
// ##computed
const name_ = computed(() => props?.name || optionsEffectDefault._default);
// ##forms ##helpers ##handlers
// ##watch
// ##hooks:lifecycle
// ##head ##meta
// ##provide

// @@eos
</script>
<template>
  <div
    v-effect:[`${name_}`]="{
      ...optionsEffectDefault,
      ...options,
      watch: mIsActive,
    }"
    v-bind="propsContainer"
    class="component--Effect:animate.css"
  >
    <slot />
  </div>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
