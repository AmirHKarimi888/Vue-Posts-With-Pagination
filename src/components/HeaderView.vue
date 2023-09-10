<script setup>
import { RouterLink } from 'vue-router';
import { onMounted } from "vue";

onMounted(() => {
    if ("loggedInId" in localStorage) {
        null;
    } else {
        const loggedInId = Math.round(Math.random() * 10000000000);
        localStorage.setItem("loggedInId", loggedInId);
    }
})
</script>

<template>
    <nav class="w-full h-[72px] dark:bg-gray-950 border-b dark:border-gray-700 flex justify-center items-center">
        <ul class="dark:text-white flex gap-9">
            <li>
                <RouterLink exact-active-class="text-blue-500" to="/">Home</RouterLink>
            </li>
            <li>
                <RouterLink exact-active-class="text-blue-500" to="/dashboard">Dashboard</RouterLink>
            </li>
            <li>
                <RouterLink exact-active-class="text-blue-500" to="/blog/1">Blog</RouterLink>
            </li>
        </ul>
    </nav>
</template>