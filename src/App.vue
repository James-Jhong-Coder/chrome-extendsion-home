<script setup lang="ts">
/// <reference types="chrome" />
import { ref, onMounted, computed, onUnmounted } from "vue";
import Folder from "@/components/Folder.vue";

const AXIOM_FOLDER_NAME: string = "AXIOM";

interface BookmarkOrFolder extends chrome.bookmarks.BookmarkTreeNode {
    children: chrome.bookmarks.BookmarkTreeNode[];
}
const axiomBookmarkList = ref<chrome.bookmarks.BookmarkTreeNode[]>([]);
const timeLeft = ref("");

const getFolderTreeRecursive = async ({
    folderId,
}: {
    folderId: string;
}): Promise<chrome.bookmarks.BookmarkTreeNode> => {
    const [folderMeta] = await chrome.bookmarks.get(folderId);
    const node: BookmarkOrFolder = {
        id: folderMeta.id,
        title: folderMeta.title,
        syncing: false,
        children: [],
    };

    const children = await chrome.bookmarks.getChildren(folderId);

    for (const item of children) {
        if (item.url) {
            node.children!.push(item);
        } else {
            const childFolder = await getFolderTreeRecursive({
                folderId: item.id,
            });
            node.children!.push(childFolder);
        }
    }
    return node;
};

const computedList = computed(() => {
    return axiomBookmarkList?.value[0]?.children || [];
});

onMounted(() => {
    chrome.bookmarks.search({ title: AXIOM_FOLDER_NAME }, async (results) => {
        axiomBookmarkList.value = results;
        // 因為會抓出複數個 AXIOM_FOLDER_NAME 內容，如果沒有 url 的才會是資料夾
        const axiomFolder = results.find(
            (item) => item.title === AXIOM_FOLDER_NAME && !item.url
        );
        // 搜尋出來的檔案有 id 的話，代表他是一個合法的資料夾
        if (axiomFolder?.id) {
            const result = await getFolderTreeRecursive({
                folderId: axiomFolder?.id,
            });
            axiomBookmarkList.value = [result];
        }
    });
});

const updateCountdown = () => {
    const now = new Date();
    const end = new Date();
    end.setHours(18, 0, 0, 0); // 今天 18:00:00

    const diff = end.getTime() - now.getTime();

    if (diff <= 0) {
        timeLeft.value = "下班時間到啦 🎉";
        return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timeLeft.value = `還有 ${hours} 小時 ${minutes} 分 ${seconds} 秒下班`;
};

let timer: number;

onMounted(() => {
    updateCountdown();
    timer = window.setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
    clearInterval(timer);
});
</script>

<template>
    <span class="off-work-time mb-3">{{ timeLeft }}</span>
    <div class="section mt-12">
        <Folder
            v-for="(bookmarkFolder, index) in computedList"
            :key="index"
            :class="{
                'mt-6': index > 0,
            }"
            :folder="bookmarkFolder"
        />
    </div>
</template>

<style scoped>
@reference "./assets/style/global.css";

.section {
    @apply flex flex-col;
    @apply mx-auto;
    @apply p-5 text-center;
    @apply w-full md:w-160;
}

.off-work-time {
    @apply text-gray-100 text-2xl;
    @apply fixed top-0 left-0 w-full bg-black py-2 z-50 text-center;
}

.section-title {
    @apply text-2xl text-gray-100;
}
</style>
