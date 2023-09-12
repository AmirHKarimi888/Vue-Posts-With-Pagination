<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Action, url } from "../api";
import { useUserStore } from "../stores/counter";

const route = useRoute();

const post = ref({});
onMounted(() => {
    Action.get(url + "posts/" + route.params.id, (response) => {
        post.value = response.data;
    })
        .then(() => {
            Action.put(url + "posts/" + route.params.id, {
                ...post.value,
                views: parseInt(post.value.views) + 1
            })
                .then(() => {
                    post.value = {
                        ...post.value,
                        views: parseInt(post.value.views) + 1
                    }
                })
        })
})


const likePost = () => {
    if (!post.value.likedBy.includes(useUserStore().loggedInId)) {
        Action.put(url + "posts/" + post.value.id, {
            ...post.value,
            likedBy: [...post.value.likedBy,
            useUserStore().loggedInId]
        })
            .then(() => {
                post.value.likedBy = [...post.value.likedBy,
                useUserStore().loggedInId]
            })
    } else {
        Action.put(url + "posts/" + post.value.id, {
            ...post.value,
            likedBy: post.value.likedBy.filter((item) => {
                if (item != useUserStore().loggedInId) {
                    return item;
                }
            })
        })
            .then(() => {
                post.value.likedBy = post.value.likedBy.filter((item) => {
                    if (item != useUserStore().loggedInId) {
                        return item;
                    }
                })
            })
    }
}
</script>

<template>
    <div class="post">
        <div
            class="mx-auto text-center w-[60%] my-[200px] p-9 dark:bg-gray-900 rounded-lg border dark:border-gray-700 dark:text-white">
            <p class="">{{ post?.title }}</p>
            <img :src="post?.poster" alt="" class="mx-auto mt-6 w-[100%] aspect-video mb-5">
            <p class="">views: {{ post?.views }}</p>
            <p class="">likes: {{ post?.likedBy?.length }}</p>
            <button @click="likePost" class=" mr-[85%] mt-5">
                <i class="text-[150%]"
                    :class="post?.likedBy?.includes(useUserStore().loggedInId) ? 'fa fa-heart text-red-500' : 'fa fa-heart-o'"></i>
            </button>
        </div>
    </div>
</template>