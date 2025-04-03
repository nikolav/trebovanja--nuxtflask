<script setup lang="ts">
import { Demo } from "@/components/dev";
definePageMeta({
  layout: "app-default",
  // middleware: "access-debug",
});
useHead({ title: "demo" });

// @@eos
</script>
<template>
  <section class="page--demo">
    <Demo />
  </section>
</template>
<style lang="scss" scoped></style>
