<script setup>
import { ref, onMounted } from 'vue';
const { $apiCall } = useNuxtApp();
const { locales, locale } = useI18n();
const config = useRuntimeConfig();
/* import axios from 'axios'; */
import { useRoute } from '#imports';
import Loader from '~/components/Loader.vue';
import { useMenuStore } from '~/stores/menu';



const menuStore = useMenuStore();
const dynamicComponent = ref(null);
const route = useRoute();
const slug = route.params.slug;

const { data: slugDetails, status: slugStatus, error: slugError } = useAsyncData("slugDetails", async () => {
    const params = {
        action: 'slug-details',
        slug: slug,
    }
    return await apiCall(config.public.apiBase, "GET", params);
});

watch(slugDetails, (newData) => {
    console.log('newData', newData);

    if (newData) {
       
        if (!newData.type) {

        } else {

            menuStore.setCategoryData(newData);
            
            var type = newData.type;
            if (type == 'category') {
                dynamicComponent.value = defineAsyncComponent(() =>
                    import(`@/components/Category.vue`)
                );
            }

            if (type == 'product') {
                dynamicComponent.value = defineAsyncComponent(() =>
                    import(`@/components/Product.vue`)
                );
            }
        }
    }
}, { immediate: true });


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

/* const addToCart = async function (productId, quantity) {
    try {
        // Assuming you have session cookies from the user's browser
        const cookies = document.cookie;

        const response = await axios.post(
            `${config.public.siteUrl}wp-json/custom/v1/add-to-cart`,
            {
                product_id: productId,
                quantity: quantity
            },
            {
                headers: {
                    'Cookie': cookies,  // Sending the cookies to maintain session
                }
            }
        );
        console.log('Product added to cart:', response.data);
    } catch (error) {
        console.error('Error adding product to cart', error);
    }
} */

onMounted(() => {
    /*  fetchWP(); */
    /*  getCartCount(); */
    /* getCartCountNew(); */
    /*  addToCart(108,1); */
});
</script>

<template>
    <component :is="dynamicComponent" v-if="dynamicComponent" />
</template>