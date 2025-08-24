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
                    <span
                        class="ml-1"
                        @click="onLinkClickHandler(item.url || '')"
                        >{{ item.title }}</span
                    >
                </div>
                <span class="box-list-item-divider mt-1.5"></span>
            </template>
        </div>
    </div>
</template>

<style scoped>
@reference "@/assets/style/global.css";

.box {
    @apply bg-white;
    @apply rounded-md text-left py-3;
}

.box-title {
    @apply text-black text-xl px-3;
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
    border: 1px solid #eee;
}
</style>
