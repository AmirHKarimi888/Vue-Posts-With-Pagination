<script setup>
import { useModalStore } from '../../stores/counter';


</script>

<template>
    <div id="success" @click.self="useModalStore().toggleModal('success')" class="success fixed top-0 w-[100%] h-screen backdrop-blur-md hidden">
        <div class="mx-auto mt-[270px] w-[330px] rounded-xl p-9 text-center border dark:border-gray-700 dark:bg-gray-700">
            <i class="fa fa-check-circle-o text-green-700 text-[600%]"></i>
            <p class="mt-5 dark:text-white">Successfully Done!</p>
            <button @click="useModalStore().toggleModal('success')" type="button" class="mt-5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">OK</button>
        </div>
    </div>
</template>