<script setup lang="ts">
// ##imports
import { mergeProps } from "vue";
// ##config ##const
const props = defineProps<{
  items?: any[];
  itemTitle?: any;
  propsBtn?: any;
  propsAvatar?: any;
  propsList?: any;
  propsListItem?: any;
}>();
const {
  app: { DEFAULT_TRANSITION },
} = useAppConfig();
// ##utils
const ttl = (item: any) =>
  String(props.itemTitle ? props.itemTitle(item) : get(item, "title", item));
// ##icons
// ##refs ##flags
// ##data ##auth ##state
// ##computed
const isempty_ = computed(() => isEmpty(props.items));
const size_ = computed(() => len(props.items));
// ##forms ##helpers ##handlers
// ##watch
// ##hooks:lifecycle
// ##head ##meta
// ##provide

// @@eos
</script>
<template>
  <VBtn
    v-if="!isempty_"
    icon
    variant="text"
    color="secondary"
    density="compact"
    class="component--VBtnMenuListItems opacity-75"
    v-bind="propsBtn"
  >
    <VAvatar
      color="secondary"
      size="small"
      density="compact"
      :text="size_"
      v-bind="propsAvatar"
    />
    <VMenu
      location="start center"
      activator="parent"
      :close-on-content-click="false"
      :transition="DEFAULT_TRANSITION"
      min-width="122"
    >
      <VList rounded="lg" density="comfortable" class="py-0" v-bind="propsList">
        <VListItem
          v-for="item in items"
          :key="ttl(item)"
          v-bind="propsListItem"
        >
          <template #title>
            <slot name="title" v-bind="{ item }">
              <span>
                {{ ttl(item) }}
              </span>
            </slot>
          </template>
        </VListItem>
      </VList>
    </VMenu>
  </VBtn>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
