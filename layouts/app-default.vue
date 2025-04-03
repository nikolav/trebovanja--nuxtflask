<script setup lang="ts">
// ##imports
// ##config ##const
// ##utils
// ##icons
// ##refs ##flags
// ##data ##auth ##state
// ##computed
// ##forms ##helpers ##handlers
// ##watch
// ##hooks:lifecycle
// ##head
// useHead({ title: "" });

// @@eos
</script>
<template>
  <section class="layout--app-defaut">
    <div>
      <NuxtLink :to="{ name: 'index' }">home</NuxtLink>
      •
      <NuxtLink :to="{ name: 'demo' }">demo</NuxtLink>
    </div>
    <hr />
    <h1>@layout --app-default</h1>
    <slot />
  </section>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
