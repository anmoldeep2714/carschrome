<template>
    <main>
        <div class="breadcrumb-header-section">
            <div class="wrapper">
                <div class="inner">
                    <div class="breadcrumb-header">
                        <ul>
                            <li><a href="/"><span>Home</span></a></li>
                            <li><span>Shop filter</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="shop-filter-list-section">
            <div class="wrapper">
                <div class="inner">
                    <div class="shop-filter-left">
                        <div class="shop-filter-wrapper" v-for="(menu, menuIndex) in menuData" :key="menuIndex">
                            <div class="shop-filter-heading shop-filter-accordian-heading" v-html="menu.post_title">
                            </div>

                            <div class="shop-filter-accordian-content" style="display: block;">
                                <div class="input-check-wrapper" v-for="(childMenu, childMenuIndex) in menu.children">


                                    <!-- <NuxtLink :to="localePath(`/${childMenu.menu_slug}`)">
                                        <span class="text" v-html="childMenu.post_title"></span>
                                        <span class="count">({{childMenu.post_count}})</span>
                                    </NuxtLink> -->

                                    <a :class="{ 'router-link-active': childMenu.object_id == currentCategoryId }"
                                        :href="localePath(`/${childMenu.menu_slug}`)">
                                        <span class="text" v-html="childMenu.post_title"></span>
                                        <span class="count">({{ childMenu.post_count }})</span>
                                    </a>


                                </div>
                                <div class="view-more-toggle">
                                    <span>View more</span>
                                </div>
                            </div>
                        </div>

                        <!--  <div class="filter-submission-wrapper">
                            <button type="submit">
                                <span>Filter</span>
                            </button>
                        </div> -->
                    </div>
                    <div class="product-list-wrapper" v-if="!productsLoading">
                        <div class="product-list-header-wrapper">
                            <div class="list-and-grid-toggle-wrapper">
                                <div class="list-and-grid-toggle" :class="{ 'active': productsListView == 'grid' }">
                                    <span class="" @click="changeProductsView('grid')">
                                        <svg class="qodef-svg--list-grid" xmlns="http://www.w3.org/2000/svg" width="11"
                                            height="11">
                                            <g>
                                                <path d="M0 0h3v3H0z"></path>
                                                <path d="M0 4h3v3H0z"></path>
                                                <path d="M0 8h3v3H0z"></path>
                                                <path d="M4 0h3v3H4z"></path>
                                                <path d="M4 4h3v3H4z"></path>
                                                <path d="M4 8h3v3H4z"></path>
                                                <path d="M8 0h3v3H8z"></path>
                                                <path d="M8 4h3v3H8z"></path>
                                                <path d="M8 8h3v3H8z"></path>
                                            </g>
                                        </svg>
                                    </span>
                                    <span class="" @click="changeProductsView('list')">
                                        <svg class="qodef-svg--list-simple qodef--active"
                                            xmlns="http://www.w3.org/2000/svg" width="11" height="11">
                                            <g>
                                                <path d="M0 0h3v3H0z"></path>
                                                <path d="M0 4h3v3H0z"></path>
                                                <path d="M0 8h3v3H0z"></path>
                                                <path d="M4 0h7v3H4z"></path>
                                                <path d="M4 4h7v3H4z"></path>
                                                <path d="M4 8h7v3H4z"></path>
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                                <div class="showing-count">Showing 1–16 of 44 results</div>
                            </div>
                            <div class="sorting-dropdown">
                                <div class="selected-value">Default sorting</div>
                                <div class="sorting-dropdown-list">
                                    <ul>
                                        <li>Default sorting</li>
                                        <li>Sort by popularity</li>
                                        <li>Sort by latest</li>
                                        <li>Sort by price high to low</li>
                                        <li>Sort by price low to high</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                         
                            <div class="products-grid" v-if="productsListView == 'list'">
                                <div class="product-card product-card--list-version"
                                    v-for="(product, productIdx) in products" :key="productIdx">
                                    <a :href="localePath(`/${product.slug}`)" class="link-wrapper"></a>
                                    <div class="product-image">
                                        <img :src="product.image_url" alt="">
                                    </div>

                                    <div class="product-content">
                                        <div class=""> 
                                            <div class="product-name">
                                                <a :href="localePath(`/${product.slug}`)" v-html="product.name"></a>
                                            </div>
                                            <div class="product-review">
                                                <div class="product-review-stars">
                                                    <div class="product-review-stars-fill">
                                                        <svg class="svg--star" xmlns="http://www.w3.org/2000/svg"
                                                            width="16.186" height="15.013" viewBox="0 0 16.186 15.013">
                                                            <path
                                                                d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                                            </path>
                                                        </svg>
                                                        <svg class="svg--star" xmlns="http://www.w3.org/2000/svg"
                                                            width="16.186" height="15.013" viewBox="0 0 16.186 15.013">
                                                            <path
                                                                d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                                            </path>
                                                        </svg>
                                                        <svg class="svg--star" xmlns="http://www.w3.org/2000/svg"
                                                            width="16.186" height="15.013" viewBox="0 0 16.186 15.013">
                                                            <path
                                                                d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                                            </path>
                                                        </svg>
                                                        <svg class="svg--star" xmlns="http://www.w3.org/2000/svg"
                                                            width="16.186" height="15.013" viewBox="0 0 16.186 15.013">
                                                            <path
                                                                d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                                            </path>
                                                        </svg>
                                                        <svg class="svg--star" xmlns="http://www.w3.org/2000/svg"
                                                            width="16.186" height="15.013" viewBox="0 0 16.186 15.013">
                                                            <path
                                                                d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                    <div class="product-review-stars-base">
                                                        <svg class="svg--star" xmlns="http://www.w3.org/2000/svg"
                                                            width="16.186" height="15.013" viewBox="0 0 16.186 15.013">
                                                            <path
                                                                d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                                            </path>
                                                        </svg>
                                                        <svg class="svg--star" xmlns="http://www.w3.org/2000/svg"
                                                            width="16.186" height="15.013" viewBox="0 0 16.186 15.013">
                                                            <path
                                                                d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                                            </path>
                                                        </svg>
                                                        <svg class="svg--star" xmlns="http://www.w3.org/2000/svg"
                                                            width="16.186" height="15.013" viewBox="0 0 16.186 15.013">
                                                            <path
                                                                d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                                            </path>
                                                        </svg>
                                                        <svg class="svg--star" xmlns="http://www.w3.org/2000/svg"
                                                            width="16.186" height="15.013" viewBox="0 0 16.186 15.013">
                                                            <path
                                                                d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                                            </path>
                                                        </svg>
                                                        <svg class="svg--star" xmlns="http://www.w3.org/2000/svg"
                                                            width="16.186" height="15.013" viewBox="0 0 16.186 15.013">
                                                            <path
                                                                d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="product-desc">
                                                <a href="">Alienum phaedrum torquatos nec eu, vis detraxit periculis ex,
                                                    nihil expete mei. Mei an consequat an. Eius lorem tincidunt vix at,
                                                    vel pertinax sensibus id, error epicurei mea et.</a>
                                            </div>
                                        </div>
                                        <div class="">
                                            <!-- <div class="product-price">
                                                <span class="currency">$</span>
                                                <span v-html="product.price"></span>
                                            </div> -->
                                            <a :href="localePath(`/${product.slug}`)" class="cart-button">
                                                <span>${{product.price}}</span>
                                            </a> 
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="products-grid" data-grid-layout="4"  v-if="productsListView == 'grid'">
                                <div class="product-card" v-for="(product, productIdx) in products" :key="productIdx">
                                    <a :href="localePath(`/${product.slug}`)" class="link-wrapper"></a> 
                                    <div class="product-image">
                                        <img :src="product.image_url" alt="">
                                    </div>
                                    <div class="product-content"> 
                                        <div class="product-name">
                                            <a :href="localePath(`/${product.slug}`)" v-html="product.name"></a>
                                        </div> 
                                    </div>
                                    <a :href="localePath(`/${product.slug}`)" class="cart-button">
                                        <span>${{product.price}}</span>
                                         
                                    </a>
                                </div>
                            </div>
                        

                        <Pagination :currentPage="pagination.current_page" :totalPages="pagination.total_pages"
                            @page-change="changePage" v-if="products.length > 0" />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { useMenuStore } from '~/stores/menu';
import { useRouter, useRoute, useLocalePath } from '#imports';
import { ref, onMounted, watch } from 'vue';
import Pagination from "@/components/Pagination.vue";

const { $apiCall } = useNuxtApp();
const config = useRuntimeConfig();

const selectedVehicles = ref([]);
const menuStore = useMenuStore();
const menuData = ref([]);
const categoryData = ref([]);
const productsListView = ref('grid');

const products = ref([]);
const productsLoading = ref(1);
const pagination = ref({
    current_page: 1,
    total_pages: 1,
});


menuData.value = menuStore.getMenuData();
categoryData.value = menuStore.getCategoryData();
const currentCategoryId = ref(categoryData.value.category.term_id);
const { locales, locale, defaultLocale } = useI18n();

const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();


const isSelectedCategory = (category_id, menu_slug) => {
    return category_id == categoryData.value.category.term_id
}

const changeProductsView = (proview) => {
    productsListView.value = proview;
}

const handleChangeCategory = (category_id, slug) => {

    var newPath = '/';
    if (defaultLocale == locale.value) {
        newPath += `${slug}`;
    }
    else {
        newPath += `${locale.value}/${slug}`;
    }
    if (category_id != categoryData.value.category.term_id) {
        /*  router.push(`/${slug}`); */

        router.replace({ path: newPath, query: route.query }).then(() => {
            location.reload(); // Reload to apply changes
        });

        /* navigateTo({
            path: newPath,
            query: route.query
        }) */
    }
}



const changePage = (page) => {
    router.push({ query: { page } });
};

const fetchProducts = async (page = 1) => {
    /* const response = await fetch(`/api/products?page=${page}`);
    const data = await response.json();
    products.value = data.products;
    pagination.value = data.pagination; */

    const params = {
        action: 'get-category-products',
        category_id: currentCategoryId.value,
        page: page,
        lang: locale.value
    }

     

    if(selectedVehicles.value.length > 0){
        const selectedVehicle = selectedVehicles.value[0];
       
        params.year = selectedVehicle.year;
        params.make = selectedVehicle.make.term_id;
        params.model = selectedVehicle.model.term_id;
        params.isFitment = 1;
    }
    const result = await $apiCall({
        url: `${config.public.apiBase}`,
        method: "GET",
        params: params
    });


    if (result.success) {
        const data = result.data;
        products.value = data.products;
        pagination.value = data.pagination;
    }

    productsLoading.value = 0
};


const initManageStoreVehicles = () => {
    const storeVehicles = localStorage.getItem("selectedVehicles");
    if (storeVehicles) {
        selectedVehicles.value = JSON.parse(storeVehicles);
    }

    fetchProducts(1);
}



watch(() => route.query.page, (newPage) => {
    fetchProducts(newPage || 1);
}, { immediate: true });


onMounted(() => {
    initManageStoreVehicles();
    
})

</script>