<script setup>
import Slug from '~/components/Product.vue';
import { onMounted } from 'vue';
const { $apiCall } = useNuxtApp();
const { locales,locale } = useI18n();
const config = useRuntimeConfig();

const fetchWP = async () => {
    const params = {
        action: 'get-menu',
        menu_slug: 'categories-menu',
        lang: locale.value
    }
    const result = await $apiCall({
        url: `${config.public.apiBase}`,
        method: "GET",
        params: params
    });

    console.log(result);

    if (result.error) {

    }
    else {

    }


};

onMounted(() => {
    fetchWP();
});
</script>

<template>
   <Slug></Slug>
</template>