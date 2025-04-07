<script setup>
import { useRoute, useAsyncData, useHead } from '#imports';
import { ref, onMounted, shallowRef } from 'vue';
const { $apiCall } = useNuxtApp();
const { locales, locale } = useI18n();
const config = useRuntimeConfig();
/* import axios from 'axios'; */
import Loader from '~/components/Loader.vue';
import { useMenuStore } from '~/stores/menu';
import { useVehiclePopupStore } from '~/stores/vehiclePopup';
import { useLoaderStore } from '~/stores/loaderStore';

import Category from '@/components/Category.vue';

const vehiclePopup = useVehiclePopupStore();
const cookie_storeVehicles = useCookie('cookie_storeVehicles');



if (cookie_storeVehicles.value != null || cookie_storeVehicles.value == '') {
    vehiclePopup.updateStoreVehicles(cookie_storeVehicles.value);
}

const menuStore = useMenuStore();
const loaderStore = useLoaderStore();
/* const dynamicComponent = shallowRef(null); */
const dynamicComponent = ref(null);
const dynamicComponentName = ref(null);
const route = useRoute();
const slug = route.params.slug;

const { data: slugDetails, status: slugStatus, error: slugError } = await useAsyncData("slugDetails", async () => {
    const params = {
        action: 'slug-details',
        slug: slug,
    }

    if (vehiclePopup.storeVehicles.length > 0) {
        const selectedVehicle = vehiclePopup.storeVehicles[0];
        params.year = selectedVehicle.year;
        params.make = selectedVehicle.make.term_id;
        params.model = selectedVehicle.model.term_id;
        params.isFitment = 1;
    }

    return await apiCall(config.public.apiBase, "GET", params);
});

watch(slugDetails, (newData) => {
    if (newData) {

        if (!newData.type) {

        } else {



            var type = newData.type;
            if (type == 'category') {
                menuStore.setCategoryData(newData);
                /* dynamicComponent.value = defineAsyncComponent(() =>
                    import(`@/components/Category.vue`)
                ); */
                dynamicComponentName.value = 'category';
                useHead({
                    title: `Carschrome - ${newData.category.name}`,
                    meta: [
                        {
                            property: 'og:title',
                            content: newData.category.name,
                        },
                    ]
                });
            }

            if (type == 'product') {
                menuStore.setProductData(newData);
                /* dynamicComponent.value = defineAsyncComponent(() =>
                    import(`@/components/Product.vue`)
                ); */
                dynamicComponentName.value = 'product';
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

    if (result.error) {

    }
    else {

    }


};


const getCartCount = async () => {
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
    <!-- <component :is="dynamicComponent" v-if="dynamicComponent" /> -->
    <category v-if="dynamicComponentName && dynamicComponentName == 'category'"></category>
    <!-- <Product v-if="dynamicComponentName && dynamicComponentName=='product'"></Product> -->
</template>