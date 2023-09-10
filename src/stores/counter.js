import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})


export const useModalStore = defineStore('modals', () => {
  const toggleModal = (id) => {
    if(document.getElementById(id).classList.contains("hidden")) {
      document.getElementById(id).classList.remove("hidden");
    } else {
      document.getElementById(id).classList.add("hidden");
    }
  }

  return { toggleModal }
})

export const useUserStore = defineStore('users', () => {
  const loggedInId = ref("");
  if("loggedInId" in localStorage) {
    loggedInId.value = localStorage.getItem("loggedInId");
  }

  return { loggedInId };
})