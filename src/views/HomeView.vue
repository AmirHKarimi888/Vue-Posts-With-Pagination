<script setup>
import { ref, onMounted } from "vue";
import { Action, url } from "../api/index"

const posts = ref([]);

onMounted(() => {
    Action.get(url + "posts", (response) => {
        posts.value = response.data;
    })
    .then(() => {
        posts.value = posts.value.slice(posts.value.length - 3, posts.value.length).reverse();
    })
})
</script>

<template>
    <div class="home">
        <ul class="posts mx-auto mt-[200px] mb-20 w-[60%] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 dark:text-white">
            <li v-for="post in posts" :key="post?.id" class="p-6 text-center dark:bg-gray-900 border dark:border-gray-600 rounded-lg">
                <img :src="post?.poster" alt="poster" class="w-[100%] aspect-square mx-auto">
                <p class="mt-5">
                    <RouterLink :to="'/post/' + post.id">{{ post?.title }}</RouterLink>
                </p>
            </li>
        </ul>
    </div>
</template>
