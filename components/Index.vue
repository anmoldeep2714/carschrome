<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from '#app';
const route = useRoute();
const config = useRuntimeConfig();
const { $apiCall } = useNuxtApp();
const { locales, locale } = useI18n();
import { useRouter } from "vue-router";
import { useVehiclePopupStore } from '~/stores/vehiclePopup';
import { useLocalePath } from "#imports";

const vehiclePopup = useVehiclePopupStore();
const router = useRouter();
const localePath = useLocalePath();

const categoriesCrRef = ref(null);
const bestSellerProducts = ref({ loading: true, data: [] });
const cookie_storeVehicles = useCookie('cookie_storeVehicles');

import replacementImg from '~/assets/images/replacementparts.jpg';
import bodypartsImg from '~/assets/images/bodyparts.jpg';
import lightingsImg from '~/assets/images/lightings.jpg';
import toolsequipmentImg from '~/assets/images/toolsequipment.jpg';
import exteriorImg from '~/assets/images/exterior.jpg';
import interiorImg from '~/assets/images/interior.jpg';
import performancepartsImg from '~/assets/images/performanceparts.jpg';
import wheelstiresImg from '~/assets/images/Wheelstires.jpg';
import specialtypartsImg from '~/assets/images/specialtyparts.jpg';

const fitmentYearRef = ref(null);
const fitmentYears = ref({
    loading: 1,
    data: {},
    selectedValue: null
});

const fitmentMakeRef = ref(null);
const fitmentMakes = ref({
    loading: 1,
    data: [],
    selectedValue: null
});

const fitmentModelRef = ref(null);
const fitmentModels = ref({
    loading: 1,
    data: [],
    selectedValue: null
});



const swiper = useSwiper(categoriesCrRef, {
    loop: true,
    slidesPerView: 6,
    spaceBetween: 20,
    autoplay: {
        delay: 3000, // Adjust delay as needed (milliseconds)
        disableOnInteraction: false, // Keeps autoplay running after user interaction
    },
});


const selectedVehicles = ref([]);
const showVehicleForm = ref({show:true,loading:1});

const initManageStoreVehicles = () => {
    const storeVehicles = localStorage.getItem("selectedVehicles");

    console.log('initManageStoreVehicles');
    if (storeVehicles) {
        selectedVehicles.value = JSON.parse(storeVehicles);
        console.log('storeVehicles ',selectedVehicles.value);
        if(selectedVehicles.value.length > 0){
            showVehicleForm.value.show = false;
        }
    }

    showVehicleForm.value.loading = 0;
}

watch(selectedVehicles, (newVal) => {
    localStorage.setItem("selectedVehicles", JSON.stringify(newVal));
    if(newVal.length > 0){
        showVehicleForm.value.show = false;
    }
    cookie_storeVehicles.value = newVal;
    vehiclePopup.updateStoreVehicles(newVal);
}, { deep: true })



/* useHead({
    title: 'SEO TITLE',
    meta: [
        { name: 'description', content: 'SEO DESCRIPTION' },
    ],
}); */

const getFitMentYears = async () => {
    const params = {
        action: 'get-fitment-years',
        lang: locale.value
    }
    const result = await $apiCall({
        url: `${config.public.apiBase}`,
        method: "GET",
        params: params
    });

    if (result.success) {
        const data = result.data;
        if (data.hasOwnProperty('years')) {
            fitmentYears.value.data = data.years;
        }
    }

    fitmentYears.value.loading = 0;
}

const handleYearChange = () => {
    /*  resetMake(); */
    resetModel();
    getFitMentMakes();
}

const getFitMentMakes = async () => {
    const params = {
        action: 'get-fitment-makes',
        lang: locale.value
    }
    const result = await $apiCall({
        url: `${config.public.apiBase}`,
        method: "GET",
        params: params
    });

    if (result.success) {
        const data = result.data;
        fitmentMakes.value.data = data;
    }

    fitmentMakes.value.loading = 0;

    /* open make element */
    await nextTick();
    fitmentMakeRef.value.focus();
}

const resetMake = () => {
    fitmentMakes.value = {
        loading: 1,
        data: [],
        selectedValue: null
    }
}

const handleMakeChange = () => {
    resetModel();
    getFitMentModels();
}

const resetModel = () => {
    fitmentModels.value = {
        loading: 1,
        data: [],
        selectedValue: null
    }
}

const getFitMentModels = async () => {
    const params = {
        action: 'get-fitment-models',
        make_id: fitmentMakes.value.selectedValue,
        lang: locale.value
    }
    const result = await $apiCall({
        url: `${config.public.apiBase}`,
        method: "GET",
        params: params
    });

    if (result.success) {
        const data = result.data;
        fitmentModels.value.data = data;
    }

    fitmentModels.value.loading = 0;

    /* open make element */
    await nextTick();
    fitmentModelRef.value.focus();
}

const selectVehicle = () => {
    if (!fitmentYears.value.selectedValue) {
        fitmentYearRef.value?.focus();
        return;
    }

    if (!fitmentMakes.value.selectedValue) {
        fitmentMakeRef.value?.focus();
        return;
    }

    if (!fitmentModels.value.selectedValue) {
        fitmentModelRef.value?.focus();
        return;
    }

    var selectedYear = fitmentYears.value.selectedValue;
    var selectedMake = fitmentMakes.value.data.find(data => data.term_id === fitmentMakes.value.selectedValue);
    var selectedModel = fitmentModels.value.data.find(data => data.term_id === fitmentModels.value.selectedValue);

    const newVehicle = {};
    newVehicle.year = selectedYear;
    newVehicle.make = selectedMake;
    newVehicle.model = selectedModel;



    var vehicles = selectedVehicles.value;

    /* emprt array to store jsut one vehicle. uncomment after */
    vehicles = [];

    const existingIndex = vehicles.findIndex(
        (vehicle) =>
            vehicle.year === newVehicle.year &&
            vehicle.make.tem_id === newVehicle.make.term_id &&
            vehicle.model.term_id === newVehicle.model.term_id
    );

    if (existingIndex !== -1) {
        // Update existing entry
        vehicles[existingIndex] = newVehicle;
    }
    else{
        vehicles.push(newVehicle);
    }
    
    selectedVehicles.value = vehicles;
}

const resetVehicle = () =>{
    selectedVehicles.value = [];
    showVehicleForm.value.show = true;
}


const modifyVehicle = () =>{
    showVehicleForm.value.show = true;
}



 

/* const getRoute = () => {
    var path = localePath("/testPage");
    console.log('path', path);
}; */

onMounted(() => {
    initManageStoreVehicles();
    getFitMentYears();
    /*  getRoute(); */
});
</script>
<template>
    <main>
        <div class="select-you-vehicle-section">
            <div class="wrapper">
                <div class="inner">
                    <h1>{{ $t('home_page.banner_title') }}</h1>
                    <h2>{{ $t('home_page.banner_description') }}</h2>


                    <div class="select-you-vehicle-form" v-if="(!showVehicleForm.loading && showVehicleForm.show) || (vehiclePopup.storeVehicles.length==0)">
                        <div class="input-row">
                            <div class="input-column">
                                <div class="input-wrapper input-select-wrapper">
                                    <div class="serial">1</div>
                                    <el-select filterable :automatic-dropdown="true" placeholder="Select Year"
                                        style="width: 240px" v-model="fitmentYears.selectedValue"
                                        @change="handleYearChange" ref="fitmentYearRef">
                                        <el-option v-for="(year, yearIdx) in fitmentYears.data" :label="year"
                                            :key="yearIdx" :value="year" />
                                    </el-select>
                                </div>
                            </div>
                            <div class="input-column">
                                <div class="input-wrapper input-select-wrapper">
                                    <div class="serial">2</div>
                                    <el-select filterable :automatic-dropdown="true" placeholder="Select Make"
                                        style="width: 240px" v-model="fitmentMakes.selectedValue" ref="fitmentMakeRef"
                                        @change="handleMakeChange">
                                        <el-option v-for="(make, makeIdx) in fitmentMakes.data" :label="make.name"
                                            :key="makeIdx" :value="make.term_id" />
                                    </el-select>
                                </div>
                            </div>
                            <div class="input-column">
                                <div class="input-wrapper input-select-wrapper">
                                    <div class="serial">3</div>
                                    <el-select filterable :automatic-dropdown="true" placeholder="Select Model"
                                        style="width: 240px" v-model="fitmentModels.selectedValue"
                                        ref="fitmentModelRef">
                                        <el-option v-for="(model, makeIdx) in fitmentModels.data" :label="model.name"
                                            :key="makeIdx" :value="model.term_id" />
                                    </el-select>
                                </div>
                            </div>
                            <div class="input-column">
                                <button type="button" @click="selectVehicle">
                                    <span>Select</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div v-if="!showVehicleForm.loading && !showVehicleForm.show && vehiclePopup.storeVehicles.length > 0" class="select-you-vehicle-form active-vehicle-form">
                        <h3>Your vehicle</h3>
                        <div class="input-row">
                            <div class="input-column">
                                <div class="input-wrapper">
                                    <div class="active-image">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M135.2 117.4L109.1 192l293.8 0-26.1-74.6C372.3 104.6 360.2 96 346.6 96L165.4 96c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32l181.2 0c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2l0 144 0 48c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-48L96 400l0 48c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-48L0 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>
                                    </div>
                                    <div class="active-text"> <span>{{selectedVehicles[0].year}} </span> <span>{{ selectedVehicles[0].make.name }} </span> <span>{{ selectedVehicles[0].model.name }} </span> </div>
                                    <div class="reset" @click="resetVehicle">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
                                    </div>
                                </div>
                            </div>
                            <div class="input-column">
                                <button type="button" @click="modifyVehicle">
                                    <span>Modify vehicle</span>
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
        <div class="categories-section">
            <div class="wrapper">
                <div class="inner">
                    <div class="section-header">
                        <h2>Auto Parts in <span class="highlight">Canada</span></h2>
                        <h4><span>Largest Catalog of OEM & Aftermarket Auto Parts in Canada</span></h4>
                        <p>Shop for auto parts at Canada’s premier auto parts online store. Explore original and
                            aftermarket auto parts for your vehicle. We offer the best deals on autoparts in Canada.
                            Discover Canadian automotive parts at cheap prices. We ensure you get the quality you
                            deserve: every single order is processed in less than one hour and available for pick up the
                            same day or delivered as fast as within 2 business days. Delve into our large OEM and
                            aftermarket parts catalog and be assured that you're choosing from the best Canada has to
                            offer.</p>
                        <div class="categories-carousel-buttons">
                            <button @click="swiper.prev()" class="categories-carousel-button-prev"><svg
                                    class="qodef-svg--slider-arrow-left" xmlns="http://www.w3.org/2000/svg"
                                    width="7.071" height="11.313">
                                    <path d="m1.414 4.242 5.657 5.657-1.414 1.414L0 5.656z"></path>
                                    <path d="M0 5.657 5.657 0 7.07 1.414 1.414 7.071z"></path>
                                </svg></button>
                            <button @click="swiper.next()" class="categories-carousel-button-next"><svg
                                    class="qodef-svg--slider-arrow-left" xmlns="http://www.w3.org/2000/svg"
                                    width="7.071" height="11.313">
                                    <path d="m1.414 4.242 5.657 5.657-1.414 1.414L0 5.656z"></path>
                                    <path d="M0 5.657 5.657 0 7.07 1.414 1.414 7.071z"></path>
                                </svg></button>
                        </div>
                    </div>

                    <swiper-container class="categories-carousel" ref="categoriesCrRef">

                        <swiper-slide>

                            <div class="categories-slide slide1" :style="{ backgroundImage: `url(${replacementImg})` }">
                                <div class="icon">
                                    <img src="assets/images/category-img-1-x2.png" alt="">
                                </div>
                                <div class="text">Replacement Parts</div>
                            </div>

                        </swiper-slide>
                        <swiper-slide>

                            <div class="categories-slide slide2" :style="{ backgroundImage: `url(${bodypartsImg})` }">
                                <div class="icon">
                                    <img src="assets/images/category-img-1-x2.png" alt="">
                                </div>
                                <div class="text">Body Parts</div>
                            </div>

                        </swiper-slide>
                        <swiper-slide>

                            <div class="categories-slide slide3" :style="{ backgroundImage: `url(${lightingsImg})` }">
                                <div class="icon">
                                    <img src="assets/images/category-img-1-x2.png" alt="">
                                </div>
                                <div class="text">Lightings</div>
                            </div>

                        </swiper-slide>
                        <swiper-slide>

                            <div class="categories-slide slide4"
                                :style="{ backgroundImage: `url(${toolsequipmentImg})` }">
                                <div class="icon">
                                    <img src="assets/images/category-img-1-x2.png" alt="">
                                </div>
                                <div class="text">Tools & Equipment</div>
                            </div>

                        </swiper-slide>
                        <swiper-slide>

                            <div class="categories-slide slide5" :style="{ backgroundImage: `url(${exteriorImg})` }">
                                <div class="icon">
                                    <img src="assets/images/category-img-1-x2.png" alt="">
                                </div>
                                <div class="text">Exterior</div>
                            </div>

                        </swiper-slide>
                        <swiper-slide>

                            <div class="categories-slide slide6" :style="{ backgroundImage: `url(${interiorImg})` }">
                                <div class="icon">
                                    <img src="assets/images/category-img-1-x2.png" alt="">
                                </div>
                                <div class="text">Interior</div>
                            </div>

                        </swiper-slide>
                        <swiper-slide>

                            <div class="categories-slide slide7"
                                :style="{ backgroundImage: `url(${performancepartsImg})` }">
                                <div class="icon">
                                    <img src="assets/images/category-img-1-x2.png" alt="">
                                </div>
                                <div class="text">Performance Parts</div>
                            </div>

                        </swiper-slide>
                        <swiper-slide>

                            <div class="categories-slide slide8" :style="{ backgroundImage: `url(${wheelstiresImg})` }">
                                <div class="icon">
                                    <img src="assets/images/category-img-1-x2.png" alt="">
                                </div>`
                                <div class="text">Wheels & Tires</div>
                            </div>

                        </swiper-slide>
                        <swiper-slide>

                            <div class="categories-slide slide9"
                                :style="{ backgroundImage: `url(${specialtypartsImg})` }">
                                <div class="icon">
                                    <img src="assets/images/category-img-1-x2.png" alt="">
                                </div>
                                <div class="text">Specialty Parts</div>
                            </div>

                        </swiper-slide>

                    </swiper-container>
                </div>
            </div>
        </div>

        <!--  <div class="best-seller-section">
            <div class="wrapper">
                <div class="inner">
                    <div class="section-header">
                        <h2>Best Seller in <span class="highlight">Canada</span></h2>
                        <a href="" class="cta">
                            <span>All Categories</span>
                            <span class="arrow">
                                <svg xmlns="http://www.w3.org/2000/svg" width="7.07" height="11.31"
                                    viewBox="0 0 7.07 11.31">
                                    <path d="M7.07 5.66 1.41 11.3 0 9.9l5.66-5.66z"></path>
                                    <path d="M5.66 7.07 0 1.42 1.41 0l5.66 5.66z"></path>
                                </svg>
                            </span>
                        </a>
                    </div>
                    <div class="products-grid" v-if="!bestSellerProducts.loading">
                        <div class="product-card" v-for="(product, productIdx) in bestSellerProducts.data">
                            <a href="" class="link-wrapper"></a>
                            <div class="product-content-top">
                                <div class="compare-wishlist-wrapper">
                                    <div class="add-to-wishlist">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15.998" height="15.006"
                                            viewBox="0 0 15.998 15.006">
                                            <path
                                                d="M805,648.4a4.485,4.485,0,0,0-3.44-1.723,3.953,3.953,0,0,0-3.333,1.573,3.677,3.677,0,0,0-3.333-1.573,4.482,4.482,0,0,0-3.44,1.724,5.511,5.511,0,0,0-1.136,4.455c.84,4.471,7.2,8.525,7.474,8.7a.817.817,0,0,0,.871,0c.27-.17,6.634-4.224,7.474-8.7A5.514,5.514,0,0,0,805,648.4Zm-.482,4.146c-.592,3.153-4.9,6.34-6.291,7.3-1.4-.96-5.7-4.147-6.292-7.3a3.819,3.819,0,0,1,.786-3.083,2.855,2.855,0,0,1,2.172-1.119,3.03,3.03,0,0,1,2.583,1.724.822.822,0,0,0,.746.487h0a.826.826,0,0,0,.748-.482,3.032,3.032,0,0,1,2.585-1.729,2.855,2.855,0,0,1,2.172,1.119,3.818,3.818,0,0,1,.795,3.085Z"
                                                transform="translate(-790.228 -646.676)"></path>
                                        </svg>
                                    </div>
                                    <div class="add-to-compare">
                                        <svg class="compare" xmlns="http://www.w3.org/2000/svg" width="22.077"
                                            height="16.651" viewBox="0 0 22.077 16.651">
                                            <g>
                                                <path
                                                    d="M13.62 10.882H3.42l2.067-2.066a1 1 0 0 0 0-1.412.989.989 0 0 0-.705-.293.992.992 0 0 0-.707.293L.319 11.159a.98.98 0 0 0 0 1.445l3.754 3.754a1 1 0 1 0 1.413-1.412l-2.067-2.067h10.2a1 1 0 1 0 0-2Z">
                                                </path>
                                                <path
                                                    d="M22.077 4.76a.989.989 0 0 0-.317-.722L18.003.283a1.023 1.023 0 0 0-1.412 0 1 1 0 0 0 0 1.412l2.066 2.066h-10.2a1 1 0 1 0 0 2h10.2L16.59 7.828a1 1 0 0 0 1.412 1.413l3.755-3.755a.988.988 0 0 0 .32-.726Z">
                                                </path>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="product-image">
                                <img :src="product.image" alt="">
                            </div>
                            <div class="product-content">
                                <div class="categories">
                                    <a href="">{{ product.categories.join() }}</a>
                                </div>
                                <div class="product-name">
                                    <a :href="localePath(`/${product.slug}`)">{{ product.name }}</a>
                                </div>
                                <div class="product-price">
                                    <span class="currency">$</span>
                                    {{ product.price }}
                                </div>
                            </div>
                            <a href="" class="cart-button">
                                <span>Select options</span>
                                <svg class="dropdown-cart" xmlns="http://www.w3.org/2000/svg" width="16.665" height="18"
                                    viewBox="0 0 16.665 18">
                                    <path
                                        d="M15.816 3.962a.85.85 0 0 0-.848.848v4.4a1 1 0 0 1-1 1H5.511a1 1 0 0 1-1-1V2.26a.848.848 0 0 0-.468-.759L1.222.092A.854.854 0 0 0 .085.473a.85.85 0 0 0 .381 1.138l2.349 1.174V9.21a2.7 2.7 0 0 0 2.694 2.7h8.461a2.7 2.7 0 0 0 2.7-2.7v-4.4a.85.85 0 0 0-.854-.848Z">
                                    </path>
                                    <path
                                        d="M6.534 13.073a2.464 2.464 0 1 0 2.464 2.463 2.465 2.465 0 0 0-2.464-2.463Zm0 3.231a.768.768 0 1 1 .768-.768.769.769 0 0 1-.768.768Z">
                                    </path>
                                    <path
                                        d="M14.018 13.073a2.464 2.464 0 1 0 2.464 2.463 2.465 2.465 0 0 0-2.464-2.463Zm0 3.231a.768.768 0 1 1 .768-.768.768.768 0 0 1-.768.768Z">
                                    </path>
                                    <path d="M12.257 2.977h-5.03a.85.85 0 1 0 0 1.7h5.03a.85.85 0 0 0 0-1.7Z"
                                        class="dropdown-cart-plus"></path>
                                    <path d="M10.59 6.34V1.31a.85.85 0 1 0-1.7 0v5.03a.85.85 0 1 0 1.7 0Z"
                                        class="dropdown-cart-plus"></path>


                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <!-- <div class="our-partners-section">
            <div class="wrapper">
                <div class="inner">
                    <h2>Join our mailing list <span class="highlight">to SAVE</span></h2>
                    <h4><span>Receive exclusive offers through email.</span></h4>
                    <p>Input type email and subscribe button laga de</p>
                </div>
            </div>
        </div> -->


        <div class="dual-cta-section">
            <div class="wrapper">
                <div class="inner">
                    <div class="cta-card-wrapper">
                        <div class="image-wrapper">
                            <img src="assets/images/chatwithexperts.jpg" alt="" />
                        </div>
                        <div class="content-wrapper">
                            <h2>Need Help?</h2>
                            <h3>Chat with auto parts experts</h3>
                            <a href="" class="cta">
                                <span>Chat now</span>
                            </a>
                        </div>
                    </div>
                    <div class="cta-card-wrapper">
                        <div class="image-wrapper">
                            <img src="assets/images/freeshipping.jpg" alt="" />
                        </div>
                        <div class="content-wrapper">
                            <h2>Free Shipping</h2>
                            <h3>On order above $99</h3>
                            <a href="" class="cta">
                                <span>Read more</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="latest-updates-section">
            <div class="wrapper">
                <div class="inner">
                    <div class="section-header">
                        <h2>Buying Guides & Articles <span class="highlight">on Auto Parts</span></h2>
                    </div>
                    <div class="blog-post-grid">
                        <div class="item">
                            <div class="image-wrapper">
                                <img src="assets/images/home-2-post-img-1.jpg" alt="">
                            </div>
                            <div class="meta-wrapper">
                                <div class="categories"><a href="">Automobile</a></div>
                                <div class="date"><a href="">July 22, 2024</a></div>
                            </div>
                            <div class="blog-title"><a href="">Top ten moto events not to miss in 2024</a></div>
                            <div class="blog-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In augue
                                ligula, feugiat ut nulla consequat. Ut est lacus, mole Lorem ipsum dolor sit, amet
                                consectetur adipisicing elit. Molestiae, excepturi debitis veniam modi commodi alias
                                veritatis, placeat laboriosam odio quod voluptatum. Exercitationem numquam soluta aut
                                quidem doloribus odio quod magnam?</div>
                        </div>
                        <div class="item">
                            <div class="image-wrapper">
                                <img src="assets/images/home-2-post-img-1.jpg" alt="">
                            </div>
                            <div class="meta-wrapper">
                                <div class="categories"><a href="">Automobile</a></div>
                                <div class="date"><a href="">July 22, 2024</a></div>
                            </div>
                            <div class="blog-title"><a href="">Top ten moto events not to miss in 2024</a></div>
                            <div class="blog-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In augue
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus suscipit voluptates
                                excepturi harum veniam laborum molestias voluptatibus eos cumque, quasi quo amet
                                distinctio! Autem expedita repudiandae rem, corrupti quasi delectus!
                                ligula, feugiat ut nulla consequat. Ut est lacus, mole</div>
                        </div>
                        <div class="item">
                            <div class="image-wrapper">
                                <img src="assets/images/home-2-post-img-1.jpg" alt="">
                            </div>
                            <div class="meta-wrapper">
                                <div class="categories"><a href="">Automobile</a></div>
                                <div class="date"><a href="">July 22, 2024</a></div>
                            </div>
                            <div class="blog-title"><a href="">Top ten moto events not to miss in 2024</a></div>
                            <div class="blog-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In augue
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus suscipit voluptates
                                excepturi harum veniam laborum molestias voluptatibus eos cumque, quasi quo amet
                                distinctio! Autem expedita repudiandae rem, corrupti quasi delectus!
                                ligula, feugiat ut nulla consequat. Ut est lacus, mole</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="trusted-payment-delivery-section">
            <div class="wrapper">
                <div class="inner">
                    <div class="trusted-shopping-wrapper">
                        <h2>Trusted Shopping</h2>
                        <div class="images-wrapper">
                            <div class="">
                                <div class="">
                                    <img src="https://partsavatar.ca/images/home/stripe.svg" alt="">
                                    <img src="https://partsavatar.ca/images/home/ssl.svg" alt="">
                                </div>
                                <img src="https://partsavatar.ca/cms/pubicImages/images/GoogleTopQualityStore.webp"
                                    alt="">
                            </div>
                            <img src="https://partsavatar.ca/images/home/norton.svg" alt="">
                        </div>
                    </div>
                    <div class="payment-options-wrapper">
                        <h2>Payment Options</h2>
                        <div class="images-wrapper">
                            <img src="assets/images/footer-img-1.png" alt="">
                            <div class="">
                                <h3>Drive Now Pay Later</h3>
                                <img src="https://partsavatar.ca/images/public/third-party/sezzle-logo.png" alt="">
                                <img src="https://partsavatar.ca/images/public/third-party/flexiti-logo.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="delivery-partners-wrapper">
                        <h2>Delivery Partners</h2>
                        <div class="images-wrapper">
                            <div class="">
                                <img src="https://partsavatar.ca/images/home/fedex.svg" alt="">
                                <img src="https://partsavatar.ca/images/home/canada-post.webp" alt="">
                            </div>
                            <div class="">
                                <img src="https://partsavatar.ca/images/home/loomis.webp" alt="">
                                <img src="https://partsavatar.ca/images/purolator.jpg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>