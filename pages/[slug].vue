<script setup>
import Slug from '~/components/Slug.vue';
import { onMounted } from 'vue';
const { $apiCall } = useNuxtApp();
const { locales, locale } = useI18n();
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


const getCartCount = async () => {
    console.log('getCartCount');
    try {
        const response = await fetch(`${config.public.siteUrl}wp-json/custom/v1/cart-count`, {
            credentials: "include"
        });
        const data = await response.json();
        console.log('getCartCount_response', data);
    } catch (error) {
        console.error("Error fetching cart count:", error);
    }
}

const getCartCountNew = async () => {
    console.log('getCartCount');
    try {
        const response = await fetch(`${config.public.siteUrl}api-test.php`, {
            credentials: "include"
        });
        const data = await response.json();
        console.log('getCartCount_response', data);
    } catch (error) {
        console.error("Error fetching cart count:", error);
    }
}

onMounted(() => {
    /*  fetchWP(); */
   /*  getCartCount(); */
   getCartCountNew();
});
</script>

<template>
    <Slug></Slug>
</template>