<script setup>
import { ref, onMounted } from "vue";
import { Action, url } from "../api/index"
import { useModalStore } from "../stores/counter";

const posts = ref([]);

const title = ref("");
const poster = ref("");

onMounted(() => {
    Action.get(url + "posts", (response) => {
        posts.value = response.data;
    })
})

const createPost = () => {
    let maxId = 0;
    for(let post of posts.value) {
        if(parseInt(post.id) > maxId) {
            maxId = parseInt(post.id);
        }
    }

    const newPost = {
        id: maxId + 1,
        title: title.value,
        poster: poster.value,
        likedBy: [],
        views: 0,
        contents: [],
        comments: [],
        editStatus: false
    }

    Action.post(url + "posts", newPost)
    .then(() => {
        posts.value = [...posts.value, newPost];
    })
    .then(() => {
        title.value = "";
        poster.value = "";
    })
    .then(() => {
        useModalStore().toggleModal('success');
    })
}


let selectedPost = ref({ editStatus: false });
const startEditingPost = (id) => {
    posts.value.filter((post) => {
        if(post.id == id) {
            post.editStatus = !post.editStatus;
            selectedPost.value = post;
        }
    })

    document.querySelectorAll(".editBtn").forEach((element) => {
        if(element.id != id) {
            if(selectedPost.value.editStatus) {
                element.setAttribute("disabled", "");
                element.removeAttribute("enabled", "");
                title.value = selectedPost.value.title;
                poster.value = selectedPost.value.poster;
            } else {
                element.removeAttribute("disabled", "");
                element.setAttribute("enabled", "");
                title.value = "";
                poster.value = "";
            }
        }
    })
}

const editPost = () => {
    Action.put(url + "posts/" + selectedPost.value.id, {
        ...selectedPost.value,
        title: title.value,
        poster: poster.value,
        editStatus: false
    })
    .then(() => {
        posts.value.filter((post) => {
            if(post.id == selectedPost.value.id) {
                post.title = title.value;
                post.poster = poster.value;
                post.editStatus = false;
            }
        })
    })
    .then(() => {
        title.value = "";
        poster.value = "";
    })
    .then(() => {
        useModalStore().toggleModal("success");
    })
}

const deletePost = (id) => {
    Action.delete(url + "posts/" + id)
    .then(() => {
        posts.value = posts.value.filter((post) => {
            if(post.id != id) {
                return post;
            }
        })
    })
}

</script>

<template>
    <div class="dashboard">
        <div class="admin mx-auto mt-[200px] w-[330px] rounded-xl p-9 text-center border dark:border-gray-700 dark:bg-gray-900 dark:text-white">
            <input v-model="title" type="text" placeholder="title" class="w-[81%] p-2 rounded-lg dark:bg-gray-800 border dark:border-gray-600">
            <input v-model="poster" type="text" placeholder="poster" class="w-[81%] p-2 rounded-lg dark:bg-gray-800 border dark:border-gray-600 mt-5">
            <button v-if="!selectedPost.editStatus" @click="createPost" type="button" class="mt-5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create Post</button>
            <button v-if="selectedPost.editStatus" @click="editPost" type="button" class="mt-5 text-gray-950 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Edit Post</button>
        </div>

        <ul class="posts mx-auto mt-[200px] mb-20 w-[60%] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 dark:text-white">
            <li v-for="post in posts" :key="post?.id" class="p-6 text-center dark:bg-gray-900 border dark:border-gray-600 rounded-lg">
                <img :src="post?.poster" alt="poster" class="w-[100%] aspect-square mx-auto">
                <p class="mt-5">
                    <RouterLink to="#">{{ post?.title }}</RouterLink>
                </p>
                <button @click="deletePost(post?.id)" class="mt-5 mx-3">
                    <i class="fa fa-trash text-red-500 text-[120%]"></i>
                </button>
                <button @click="startEditingPost(post?.id)" :id="post.id" class="editBtn mt-5 mx-3" :class="post.editStatus ? 'text-green-500' : ''">
                    <i class="fa fa-edit text-[120%]"></i>
                </button>
            </li>
        </ul>
    </div>
</template>