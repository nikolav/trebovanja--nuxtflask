<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
import type { ILightboxSlide } from "@/types";
const props = defineProps<{
  slides: ILightboxSlide[];
  options?: Record<string, any> | undefined;
}>();
const { $lightbox } = useNuxtApp();

const vbind = {
  open: (overideOptions?: any) =>
    $lightbox.open(props.slides, assign({}, props.options, overideOptions)),
};

// @@eos
</script>
<template>
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <slot name="activator" v-bind="{ ...$attrs, slides, options, ...vbind }" />
</template>
<style lang="scss" scoped></style>
