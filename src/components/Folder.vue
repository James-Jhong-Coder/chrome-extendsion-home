<script setup lang="ts">
interface TProps {
  folder: chrome.bookmarks.BookmarkTreeNode;
}
defineProps<TProps>();

const onLinkClickHandler = (url: string) => {
  window.open(url, "_blank");
};

const getFaviconUrl = (url: string) =>
  `https://www.google.com/s2/favicons?sz=32&domain_url=${encodeURIComponent(
    url
  )}`;
</script>
<template>
  <div class="box">
    <span class="box-title">{{ folder.title }}</span>
    <div class="box-list mt-3">
      <template v-for="(item, index) in folder.children" :key="index">
        <div
          class="box-list-item"
          :class="{
            'mt-2': index > 0,
          }"
        >
          <img
            v-if="item.url"
            class="book-list-item-img"
            :src="getFaviconUrl(item.url)"
            alt="favicon"
          />
          <span class="ml-3" @click="onLinkClickHandler(item.url || '')">{{
            item.title
          }}</span>
        </div>
        <span class="box-list-item-divider mt-1.5"></span>
      </template>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/style/global.css";

.box {
  @apply bg-gray-600;
  @apply rounded-xl text-left p-5;
  @apply text-gray-50;
  @apply shadow-2xl;
}

.box-title {
  @apply text-gray-50 text-2xl px-3;
}

.box-list {
  @apply flex flex-col;
}

.box-list-item {
  @apply cursor-pointer px-3 text-base;
  @apply flex items-center hover:underline;
}

.book-list-item-img {
  @apply w-4 h-4;
}

.box-list-item-divider {
  /* border: 1px solid #eee; */
  @apply bg-gray-150;
}
</style>
