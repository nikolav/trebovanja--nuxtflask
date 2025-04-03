<script setup lang="ts">
// ##imports
import { Dump } from "@/components/dev";

// ##config ##const
definePageMeta({
  layout: "app-default",
  // middleware: "",
});
// ##utils
// ##icons
// ##refs ##flags
// ##data ##auth ##state
const { data: dataNuxtApiStatus } = useNuxtApiStatus();
const auth = useStoreApiAuth();
const { data } = useFirebaseCloudFirestoreCollection("demo");
const { status: statusApollo } = useQueryApolloStatus();
// ##computed
// ##forms ##helpers ##handlers
// ##watch
// ##hooks:lifecycle
// ##head
useHead({ title: "🏡👋" });

// @@eos
</script>
<template>
  <section class="page--index">
    <VBtn @click="auth.login({ email: 'admin@nikolav.rs', password: '122' })">
      <Iconx name="$menu" />
      login
    </VBtn>
    <VBtn @click="auth.logout"> logout </VBtn>
    <Dump :data="{ dataNuxtApiStatus, statusApollo, data }" />
    <NuxtImg src="/apples.jpg" width="555" height="122" fit="contain" />
  </section>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
