<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Action, url } from "../api/index"

const route = useRoute();

const posts = ref([]);
const p = ref([]);

onMounted(() => {
    let ID = parseInt(route.params.id);
    ID = (3 * ID) - 2;

    Action.get(url + "posts", (response) => {
        posts.value = response.data;
        p.value = response.data;
    })
    .then(() => {
        posts.value = posts.value.reverse();
    })
        .then(() => {
            posts.value = posts.value.slice(ID - 1, ID + 2);
        })
})

</script>

<template>
    <div class="blog mb-20">
        <ul
            class="posts mx-auto mt-[200px] mb-20 w-[60%] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 dark:text-white">
            <li v-for="post in posts" :key="post?.id"
                class="p-6 text-center dark:bg-gray-950 border dark:border-gray-600 rounded-lg">
                <img :src="post?.poster" alt="poster" class="w-[100%] aspect-square mx-auto">
                <p class="mt-5">
                    <RouterLink :to="{ name: 'post', params: { id: post.id } }">{{ post?.title }}</RouterLink>
                </p>
            </li>
        </ul>

        <nav aria-label="Page navigation example">
            <ul class="flex justify-center items-center -space-x-px h-8 text-sm">
                <li v-if="parseInt(route.params.id) - 1 == 0 ? false : true">
                    <a :href="`/blog/${ parseInt(route.params.id) - 1 }`"
                        class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span class="sr-only">Previous</span>
                        <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 1 1 5l4 4" />
                        </svg>
                    </a>
                </li>
                <li v-if="parseInt(route.params.id) - 1 == 0 ? false : true">
                    <a :href="`/blog/${ parseInt(route.params.id) - 1 }`"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{ parseInt(route.params.id) - 1 }}</a>
                </li>

                <li>
                    <a
                        class="flex text-blue-500 items-center justify-center px-3 h-8 leading-tight bg-white border border-gray-300 hover:bg-gray-100 cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">{{ parseInt(route.params.id) }}</a>
                </li>

                <li v-if="(3 * parseInt(route.params.id)) <= p.length ? true : false">
                    <a :href="`/blog/${ parseInt(route.params.id) + 1 }`"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{ parseInt(route.params.id) + 1 }}</a>
                </li>

                <li v-if="(3 * parseInt(route.params.id)) <= p.length ? true : false">
                    <a :href="`/blog/${ parseInt(route.params.id) + 1 }`"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Next</span>
                    <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 9 4-4-4-4" />
                    </svg>
                </a>
            </li>
        </ul>
    </nav>
</div></template>