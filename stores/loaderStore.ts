import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoaderStore = defineStore("loaderStore", () => {
    const showLoader = ref(false);
    const activeLoader = () => {
        showLoader.value = true;
    };
    const deactiveLoader = () => {
        showLoader.value = false;
    };
    return { showLoader,activeLoader,deactiveLoader};
});