<script setup>
import { ref } from 'vue'
import { useVehiclePopupStore } from "@/stores/vehiclePopup";
const { $apiCall } = useNuxtApp();
const vehiclePopup = useVehiclePopupStore();
import { useRoute } from '#imports';
const config = useRuntimeConfig();

const route = useRoute();
const product = ref({});
const productLoading = ref(1);
const slug = route.params.slug;

const { data: slugDetails, status: slugStatus, error: slugError } = useAsyncData("slugDetails", async () => {
    const params = {
        action: 'product-details',
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
    console.log('product ', newData);
    if (newData) {
        if (newData.product) {
            productLoading.value = 0;
            product.value = newData.product;

            useHead({
                title: product.value.pro_title,
                meta: [
                    { name: "description", content: "" },
                ],
            });
        }
    }
}, { immediate: true });



/* swiper */
import { Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
const modules = [Thumbs];
/* end swiper */

const activeProductTab = ref(0);
const thumbsSwiper = ref(null);
const setThumbsSwiper = (swiper) => {
    thumbsSwiper.value = swiper;
};

const toggleProductTabs = (tab) => {
    activeProductTab.value = tab;
}

const selectedVehicles = ref([]);


const fetchProduct = async () => {
    const params = {
        action: 'product-details',
        slug: slug,
    }

    if (vehiclePopup.storeVehicles.length > 0) {
        const selectedVehicle = vehiclePopup.storeVehicles[0];
        params.year = selectedVehicle.year;
        params.make = selectedVehicle.make.term_id;
        params.model = selectedVehicle.model.term_id;
        params.isFitment = 1;
    }

    const response = await apiCall(config.public.apiBase, "GET", params);
}

const initManageStoreVehicles = () => {
    const storeVehicles = localStorage.getItem("selectedVehicles");
    if (storeVehicles) {
        selectedVehicles.value = JSON.parse(storeVehicles);
    }
}


onMounted(() => {
    initManageStoreVehicles();
});

</script>
<template>
    <main v-if="!productLoading">
        <div class="breadcrumb-header-section">
            <div class="wrapper">
                <div class="inner">
                    <div class="breadcrumb-header">
                        <ul>
                            <li><a href="/"><span>Home </span></a></li>
                            <li><a href="/"><span>Shop </span></a></li>
                            <li><a href="/"><span>Bundle </span></a></li>
                            <li><a href="/"><span>Engine </span></a></li>
                            <li><span>Total Energies Quartz INEO Pure Power</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-single-section">
            <div class="wrapper">
                <div class="inner">
                    <div class="product-image-side">
                        <div class="product-image-carousel swiper">

                            <Swiper :modules="[Thumbs]" :slides-per-view="1" :space-between="0"
                                :thumbs="{ swiper: thumbsSwiper }">
                                <!--  <swiper-container ref="productGalleryRef"> -->
                                <SwiperSlide v-for="(galleryImage, galleyIdx) in product.gallery_images">
                                    <img :src="galleryImage" alt="">
                                </SwiperSlide>
                            </Swiper>
                            <!--  </swiper-container> -->
                        </div>
                        <div class="product-image-thumb-carousel swiper">
                            <Swiper :modules="[Thumbs]" watch-slides-progress :slides-per-view="4" :space-between="10"
                                :watch-slides-progress="true" :watch-overflow="true" :slide-to-clicked-slide="true"
                                @swiper="setThumbsSwiper">
                                <!-- <swiper-container ref="productGalleryThumbRef"> -->
                                <SwiperSlide v-for="(galleryImage, galleyIdx) in product.gallery_images">
                                    <img :src="galleryImage" alt="">
                                </SwiperSlide>
                            </Swiper>
                            <!--  </swiper-container> -->
                        </div>
                    </div>
                    <div class="product-details-side">
                        <div class="product-not-available-banner"
                            v-if="vehiclePopup.storeVehicles.length == 0 && product.stock_status != 'instock'">
                            <span class="icon"></span>
                            <span class="text">Out of stock</span>
                        </div>

                        <div class="product-not-available-banner"
                            v-if="vehiclePopup.storeVehicles.length > 0 && !product.fitment_status">
                            <span class="icon"></span>
                            <span class="text">This part does NOT fit {{ vehiclePopup.storeVehicles[0].year }}
                                {{ vehiclePopup.storeVehicles[0].make.name }}
                                {{ vehiclePopup.storeVehicles[0].model.name }}</span>
                        </div>
                        <div class="product-title" v-html="product.name"></div>
                        <div class="product-review">
                            <div class="product-review-stars">
                                <div class="product-review-stars-fill">
                                    <svg class="svg--star" xmlns="http://www.w3.org/2000/svg" width="16.186"
                                        height="15.013" viewBox="0 0 16.186 15.013">
                                        <path
                                            d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                        </path>
                                    </svg>
                                    <svg class="svg--star" xmlns="http://www.w3.org/2000/svg" width="16.186"
                                        height="15.013" viewBox="0 0 16.186 15.013">
                                        <path
                                            d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                        </path>
                                    </svg>
                                    <svg class="svg--star" xmlns="http://www.w3.org/2000/svg" width="16.186"
                                        height="15.013" viewBox="0 0 16.186 15.013">
                                        <path
                                            d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                        </path>
                                    </svg>
                                    <svg class="svg--star" xmlns="http://www.w3.org/2000/svg" width="16.186"
                                        height="15.013" viewBox="0 0 16.186 15.013">
                                        <path
                                            d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                        </path>
                                    </svg>
                                    <svg class="svg--star" xmlns="http://www.w3.org/2000/svg" width="16.186"
                                        height="15.013" viewBox="0 0 16.186 15.013">
                                        <path
                                            d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                        </path>
                                    </svg>
                                </div>
                                <div class="product-review-stars-base">
                                    <svg class="svg--star" xmlns="http://www.w3.org/2000/svg" width="16.186"
                                        height="15.013" viewBox="0 0 16.186 15.013">
                                        <path
                                            d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                        </path>
                                    </svg>
                                    <svg class="svg--star" xmlns="http://www.w3.org/2000/svg" width="16.186"
                                        height="15.013" viewBox="0 0 16.186 15.013">
                                        <path
                                            d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                        </path>
                                    </svg>
                                    <svg class="svg--star" xmlns="http://www.w3.org/2000/svg" width="16.186"
                                        height="15.013" viewBox="0 0 16.186 15.013">
                                        <path
                                            d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                        </path>
                                    </svg>
                                    <svg class="svg--star" xmlns="http://www.w3.org/2000/svg" width="16.186"
                                        height="15.013" viewBox="0 0 16.186 15.013">
                                        <path
                                            d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                        </path>
                                    </svg>
                                    <svg class="svg--star" xmlns="http://www.w3.org/2000/svg" width="16.186"
                                        height="15.013" viewBox="0 0 16.186 15.013">
                                        <path
                                            d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div class="product-reviewc-count"><a href="">(1)</a></div>
                        </div>
                        <div class="product-price">${{ product.price }}</div>
                        <div class="product-desc" v-html="product.description"></div>
                        <div class="product-select-vehicle-wrapper" v-if="selectedVehicles.length == 0">
                            <button type="submit" class="select-vehicle" @click="vehiclePopup.openPopup(true)">
                                <span>Select vehicle</span>
                            </button>
                        </div>
                        <div class="product-add-to-cart-wrapper"
                            v-if="(product.stock_status == 'instock' && product.fitment_status && vehiclePopup.storeVehicles.length > 0)">
                            <div class="quantity-input">
                                <input type="text" id="quantity" value="1">
                                <div class="quantity-input-arrows">
                                    <span class="up" onclick="changeQuantity(1)"></span>
                                    <span class="down" onclick="changeQuantity(-1)"></span>
                                </div>
                            </div>
                            <button type="submit" class="add-to-cart">
                                <span>Add to cart</span>
                            </button>
                        </div>
                        <div class="share-media-links">
                            <span>Share:</span>
                            <ul>
                                <li>
                                    <a href="">
                                        <svg class="qodef-svg--facebook qodef-facebook-share"
                                            xmlns="http://www.w3.org/2000/svg" width="15.185" height="15.185">
                                            <path
                                                d="M14.347 0H.838A.838.838 0 0 0 0 .838v13.509a.838.838 0 0 0 .838.837h7.274V9.313H6.139v-2.3h1.973v-1.69a2.761 2.761 0 0 1 2.947-3.029 16.223 16.223 0 0 1 1.768.09v2.05h-1.206c-.952 0-1.136.452-1.136 1.116v1.464h2.276l-.3 2.3h-1.98v5.872h3.863a.838.838 0 0 0 .838-.838V.837A.838.838 0 0 0 14.347 0Z">
                                            </path>
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <svg class="qodef-svg--twitter qodef-twitter-share"
                                            xmlns="http://www.w3.org/2000/svg" width="13.056" height="13.346">
                                            <path
                                                d="m12.629 0-1.617 1.889q-1.6 1.858-3.195 3.714a.927.927 0 0 0-.039.05l5.278 7.682c-.053 0-.09.009-.126.009H9.282a.187.187 0 0 1-.18-.095q-1.7-2.481-3.4-4.957l-.089-.123-.926 1.075-3.438 4a.257.257 0 0 1-.222.1c-.33-.006-.659 0-1.023 0l5.1-5.924-.818-1.191L.086.113A1.244 1.244 0 0 1 .024.001h3.884c.009.015.016.03.026.045l3.287 4.783c.013.021.032.038.052.064.038-.04.07-.074.1-.109Q9.264 2.589 11.151.392c.109-.126.21-.261.315-.391ZM11.47 12.512c-.027-.044-.036-.062-.049-.079Q7.408 6.691 3.393.953a.24.24 0 0 0-.17-.082c-.512-.006-1.025 0-1.537 0-.028 0-.056 0-.106.006.041.063.072.109.1.154l2.888 4.13q2.537 3.629 5.071 7.258a.2.2 0 0 0 .192.1h1.5Z">
                                            </path>
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <svg class="qodef-svg--linkedin qodef-linkedin-share"
                                            xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14px"
                                            height="14px" viewBox="0 0 45 45">
                                            <path
                                                d="M1.5,6.6c0-2.7,2.4-5.1,5.1-5.1s5.1,2.4,5.1,5.1s-2.4,5.1-5.1,5.1S1.5,9.3,1.5,6.6L1.5,6.6z M2.1,43.5V15.6h8.7v27.9H2.1zM34.8,43.5V29.7c0-3.3,0-7.5-4.5-7.5c-4.5,0.3-5.1,3.9-5.1,7.5v13.8h-8.7V15.6h8.4v3.9l0,0c1.8-3,4.8-4.8,8.1-4.5c8.7,0,10.5,5.7,10.5,13.2v15.3H34.8L34.8,43.5z">
                                            </path>
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <svg class="qodef-svg--pinterest qodef-pinterest-share"
                                            xmlns="http://www.w3.org/2000/svg" width="16.426" height="16.427">
                                            <path
                                                d="M16.426 7.757v.9c-.011.057-.024.114-.033.172-.049.354-.076.712-.149 1.061a8.218 8.218 0 0 1-6.846 6.441c-.248.037-.5.064-.744.1h-.9c-.121-.014-.242-.03-.363-.043A7.915 7.915 0 0 1 3.052 14.6 8.025 8.025 0 0 1 .096 6.921a7.673 7.673 0 0 1 2.229-4.438A8.042 8.042 0 0 1 9.497.105a7.8 7.8 0 0 1 4.171 1.979 8.069 8.069 0 0 1 2.662 4.95c.038.237.064.48.096.723Zm-8.919 2.6c.156.1.3.188.439.29a2.052 2.052 0 0 0 1.821.273 2.942 2.942 0 0 0 1.939-1.694 4.776 4.776 0 0 0 .445-2.651 2.907 2.907 0 0 0-1.333-2.253 4.428 4.428 0 0 0-4.362-.338 3.621 3.621 0 0 0-2.173 3.995 1.687 1.687 0 0 0 1.251 1.488c.124.036.168 0 .216-.105a.864.864 0 0 0-.044-.913 2.038 2.038 0 0 1-.243-1.706 2.722 2.722 0 0 1 1.074-1.568 2.873 2.873 0 0 1 2.413-.581 2.01 2.01 0 0 1 1.632 1.4 3.8 3.8 0 0 1-.465 3.255 1.4 1.4 0 0 1-1.31.724c-.5-.033-.943-.239-.861-.941a7.09 7.09 0 0 1 .184-.859c.112-.456.252-.9.348-1.362a.742.742 0 0 0-.429-.89.9.9 0 0 0-1.057.21 2.115 2.115 0 0 0-.344 2.135.471.471 0 0 1 .031.258c-.033.194-.084.385-.134.576a18.494 18.494 0 0 0-.666 3.194 6.712 6.712 0 0 0 .058 1.506 2.533 2.533 0 0 0 .655-.7 6.026 6.026 0 0 0 .747-1.966c.057-.253.108-.509.167-.779Z">
                                            </path>
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <svg class="qodef-svg--tumblr qodef-tumblr-share"
                                            xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14px"
                                            height="14px" viewBox="0 0 45 45">
                                            <path
                                                d="M26.7,42C17.1,42,15,35.1,15,31.2V20.4h-3.6c-0.6,0-0.9-0.3-0.9-0.9v-5.1c0-0.6,0.3-0.9,0.9-1.2c3.9-1.5,6.6-4.8,6.6-9C18,3.3,18.6,3,19.2,3h5.7c0.3,0,0.9,0.3,0.9,0.9v8.7h6.6c0.3,0,0.9,0.3,0.9,0.9l0,0v6.3c0,0.3-0.3,0.9-0.9,0.9h-6.6v10.2c0,2.7,1.8,4.2,5.4,2.7c0-0.6,0.6-0.6,0.9-0.6c0.3,0,0.6,0.3,0.6,0.6l1.8,4.8c0,0.3,0.3,0.9,0,1.2C32,41.4,29.4,42,26.7,42z">
                                            </path>
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <svg class="qodef-svg--vk qodef-vk-share" xmlns="http://www.w3.org/2000/svg"
                                            width="20.861" height="11.293">
                                            <path
                                                d="M20.855 9.474a.671.671 0 0 0-.1-.332 11.02 11.02 0 0 0-2.091-2.286l-.891-.792c.34-.524.68-1.013.984-1.523a11.607 11.607 0 0 0 1.188-3.35c.093-.388.192-.777.293-1.188h-4.885c-.39 0-.307-.073-.428.315a10.29 10.29 0 0 1-1.7 3.38c-.045.056-.094.108-.176.2V.016H6.966c0 .57.017 1.124-.007 1.675a.727.727 0 0 0 .3.7 1.359 1.359 0 0 1 .594 1.426 6.251 6.251 0 0 0-.006.84c-.133-.114-.229-.186-.314-.27a4.728 4.728 0 0 1-1.384-3.029C6.106.918 6.142.469 6.142.019H.008a17.357 17.357 0 0 0 .108 1.818 12.047 12.047 0 0 0 2.725 5.89 9.545 9.545 0 0 0 7.6 3.559H13.059V8.853a.25.25 0 0 1 .064.007c.049.029.1.06.143.093A5.007 5.007 0 0 1 15.02 11.1a.281.281 0 0 0 .3.192c1.775-.007 3.55 0 5.325 0h.224c-.01-.626-.004-1.223-.014-1.818Zm-3 .355H16.335a.552.552 0 0 1-.5-.277 6.342 6.342 0 0 0-2.57-2.289l-.079-.038H11.596v2.594h-.728c-.322.006-.638.009-.952-.009a8.036 8.036 0 0 1-4.31-1.493 9.98 9.98 0 0 1-3.375-4.409 12.281 12.281 0 0 1-.429-1.309c-.053-.185-.106-.37-.163-.554a1.161 1.161 0 0 1-.037-.189l-.053-.329.323-.065h2.793l.038.238a5.834 5.834 0 0 0 4.605 5.188v-.989c0-1.113 0-2.228.006-3.341a.328.328 0 0 0-.12-.309 2.362 2.362 0 0 1-.207-.19l-.62-.592h3.21v4.328h.248c.469 0 .942 0 1.413-.006a.167.167 0 0 0 .082-.034 11.007 11.007 0 0 0 2.631-3.96.54.54 0 0 1 .435-.336c.4-.009.809-.009 1.226-.008h.744l-.084.348a8.157 8.157 0 0 1-1.054 2.463 10.157 10.157 0 0 1-1.545 1.821l.361.337c.418.39.832.776 1.251 1.157l.344.311a13.43 13.43 0 0 1 1.479 1.469l.383.462Z">
                                            </path>
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </div>
        <div class="product-details-tab-section">
            <div class="wrapper">
                <div class="inner">
                    <div class="product-details-tab-header">
                        <div class="tab" @click="toggleProductTabs(0)" :class="{ 'active': 0 == activeProductTab }">
                            Description</div>
                        <div class="tab" @click="toggleProductTabs(1)" :class="{ 'active': 1 == activeProductTab }">
                            Specification</div>
                        <div class="tab" @click="toggleProductTabs(2)" :class="{ 'active': 2 == activeProductTab }">Reviews
                            <span class="count">(1)</span>
                        </div>
                    </div>
                    <div class="product-details-tab-content-wrapper">
                        <div class="product-details-tab-content" :class="{ 'active': 0 == activeProductTab }"
                            :style="{ 'display': activeProductTab === 0 ? 'block' : 'none' }">
                            <div v-html="product.description"></div>
                        </div>
                        <div class="product-details-tab-content" :class="{ 'active': 1 == activeProductTab }"
                            :style="{ 'display': activeProductTab === 1 ? 'block' : 'none' }">

                            <div class="specification-table">
                                <div class="row">
                                    <div class="label">Brand</div>
                                    <div class="value">HKS Sports</div>
                                </div>
                                <div class="row">
                                    <div class="label">Brand</div>
                                    <div class="value">HKS Sports</div>
                                </div>
                                <div class="row">
                                    <div class="label">Brand</div>
                                    <div class="value">HKS Sports</div>
                                </div>
                                <div class="row">
                                    <div class="label">Brand</div>
                                    <div class="value">HKS Sports</div>
                                </div>
                                <div class="row">
                                    <div class="label">Brand</div>
                                    <div class="value">HKS Sports</div>
                                </div>
                                <div class="row">
                                    <div class="label">Brand</div>
                                    <div class="value">HKS Sports</div>
                                </div>
                                <div class="row">
                                    <div class="label">Brand</div>
                                    <div class="value">HKS Sports</div>
                                </div>
                                <div class="row">
                                    <div class="label">Brand</div>
                                    <div class="value">HKS Sports</div>
                                </div>
                                <div class="row">
                                    <div class="label">Brand</div>
                                    <div class="value">HKS Sports</div>
                                </div>
                                <div class="row">
                                    <div class="label">Brand</div>
                                    <div class="value">HKS Sports</div>
                                </div>
                                <div class="row">
                                    <div class="label">Brand</div>
                                    <div class="value">HKS Sports</div>
                                </div>
                                <div class="row">
                                    <div class="label">Brand</div>
                                    <div class="value">HKS Sports</div>
                                </div>
                                <div class="row">
                                    <div class="label">Brand</div>
                                    <div class="value">HKS Sports</div>
                                </div>
                            </div>

                        </div>
                        <div class="product-details-tab-content" :class="{ 'active': 2 == activeProductTab }"
                            :style="{ 'display': activeProductTab === 2 ? 'block' : 'none' }">
                            <h2>1 review for Total Energies Quartz INEO Pure Power </h2>
                            <div class="review-cards">
                                <div class="review-card">
                                    <div class="author-image">
                                        <img src="https://highrev.qodeinteractive.com/wp-content/uploads/2024/07/user-img-1-100x100.png"
                                            alt="">
                                    </div>
                                    <div class="review-content">
                                        <div class="review-stars">
                                            <div class="review-stars-fill">
                                                <svg class="svg--star" xmlns="http://www.w3.org/2000/svg" width="16.186"
                                                    height="15.013" viewBox="0 0 16.186 15.013">
                                                    <path
                                                        d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                                    </path>
                                                </svg>
                                                <svg class="svg--star" xmlns="http://www.w3.org/2000/svg" width="16.186"
                                                    height="15.013" viewBox="0 0 16.186 15.013">
                                                    <path
                                                        d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                                    </path>
                                                </svg>
                                                <svg class="svg--star" xmlns="http://www.w3.org/2000/svg" width="16.186"
                                                    height="15.013" viewBox="0 0 16.186 15.013">
                                                    <path
                                                        d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                                    </path>
                                                </svg>
                                                <svg class="svg--star" xmlns="http://www.w3.org/2000/svg" width="16.186"
                                                    height="15.013" viewBox="0 0 16.186 15.013">
                                                    <path
                                                        d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                                    </path>
                                                </svg>
                                                <svg class="svg--star" xmlns="http://www.w3.org/2000/svg" width="16.186"
                                                    height="15.013" viewBox="0 0 16.186 15.013">
                                                    <path
                                                        d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                                    </path>
                                                </svg>
                                            </div>
                                            <div class="review-stars-base">
                                                <svg class="svg--star" xmlns="http://www.w3.org/2000/svg" width="16.186"
                                                    height="15.013" viewBox="0 0 16.186 15.013">
                                                    <path
                                                        d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                                    </path>
                                                </svg>
                                                <svg class="svg--star" xmlns="http://www.w3.org/2000/svg" width="16.186"
                                                    height="15.013" viewBox="0 0 16.186 15.013">
                                                    <path
                                                        d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                                    </path>
                                                </svg>
                                                <svg class="svg--star" xmlns="http://www.w3.org/2000/svg" width="16.186"
                                                    height="15.013" viewBox="0 0 16.186 15.013">
                                                    <path
                                                        d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                                    </path>
                                                </svg>
                                                <svg class="svg--star" xmlns="http://www.w3.org/2000/svg" width="16.186"
                                                    height="15.013" viewBox="0 0 16.186 15.013">
                                                    <path
                                                        d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                                    </path>
                                                </svg>
                                                <svg class="svg--star" xmlns="http://www.w3.org/2000/svg" width="16.186"
                                                    height="15.013" viewBox="0 0 16.186 15.013">
                                                    <path
                                                        d="m8.09 1.108 2.163 4.279 4.837.686-3.5 3.331.826 4.7-4.326-2.221-4.326 2.221.826-4.7-3.5-3.331 4.837-.686Z">
                                                    </path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="review-date">August 2, 2024</div>
                                        <div class="review-name">Henry Walton </div>
                                        <div class="review-desc">
                                            <p>Platea praesent tristique dapibus conubia felis fermentum elementum
                                                pellentesque. Bibendum dapibus rhoncus tincidunt consequat est litora.
                                                Dapibus feugiat elit justo; hendrerit arcu proin dolor. Dui scelerisque
                                                parturient, dui auctor turpis quisque. Neque rutrum parturient dui
                                                praesent metus, faucibus sagittis cursus penatibus. Donec ac ex
                                                malesuada nam nascetu</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>