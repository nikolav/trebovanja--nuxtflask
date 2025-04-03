export const useNuxtApiStatus = () =>
  useAsyncData(async () => await $fetch("/api/status"));
