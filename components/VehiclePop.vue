<script setup>
import { useVehiclePopupStore } from "~/stores/vehiclePopup";
const vehiclePopup = useVehiclePopupStore();
import { onMounted, ref } from 'vue';
const config = useRuntimeConfig();
const { $apiCall } = useNuxtApp();
const { locales, locale } = useI18n();

const selectedVehicles = ref([]);
const showVehicleForm = ref({show:true,loading:1});

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

    vehiclePopup.closePopup();
}

const resetVehicle = () =>{
    selectedVehicles.value = [];
    showVehicleForm.value.show = true;
}


const modifyVehicle = () =>{
    showVehicleForm.value.show = true;
}

onMounted(() => {
    initManageStoreVehicles();
    getFitMentYears();
    /*  getRoute(); */
});
</script>
<template>
    <div v-if="vehiclePopup.showPopup" class="select-you-vehicle-section select-you-vehicle-popup">
        <div class="wrapper">
            <div class="inner">
                <div class="close-popup" @click="vehiclePopup.closePopup();"></div>
                <div class="select-you-vehicle-form" v-if="!showVehicleForm.loading && showVehicleForm.show">
                    <h2>Select your vehicle</h2>
                    <div class="input-row">
                        <div class="input-column">
                            <div class="input-wrapper input-select-wrapper">
                                <div class="serial">1</div>
                                <el-select filterable :automatic-dropdown="true" placeholder="Select Year" style="width: 240px"
                                    v-model="fitmentYears.selectedValue" @change="handleYearChange" ref="fitmentYearRef">
                                    <el-option v-for="(year, yearIdx) in fitmentYears.data" :label="year" :key="yearIdx"
                                        :value="year" />
                                </el-select>
                            </div>
                        </div>
                        <div class="input-column">
                            <div class="input-wrapper input-select-wrapper">
                                <div class="serial">2</div>
                                <el-select filterable :automatic-dropdown="true" placeholder="Select Make" style="width: 240px"
                                    v-model="fitmentMakes.selectedValue" ref="fitmentMakeRef" @change="handleMakeChange">
                                    <el-option v-for="(make, makeIdx) in fitmentMakes.data" :label="make.name" :key="makeIdx"
                                        :value="make.term_id" />
                                </el-select>
                            </div>
                        </div>
                        <div class="input-column">
                            <div class="input-wrapper input-select-wrapper">
                                <div class="serial">3</div>
                                <el-select filterable :automatic-dropdown="true" placeholder="Select Model" style="width: 240px"
                                    v-model="fitmentModels.selectedValue" ref="fitmentModelRef">
                                    <el-option v-for="(model, makeIdx) in fitmentModels.data" :label="model.name" :key="makeIdx"
                                        :value="model.term_id" />
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
                <div v-if="!showVehicleForm.loading && !showVehicleForm.show"
                    class="select-you-vehicle-form active-vehicle-form">
                    <h3>Your vehicle</h3>
                    <div class="input-row">
                        <div class="input-column">
                            <div class="input-wrapper">
                                <div class="active-image">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path
                                            d="M135.2 117.4L109.1 192l293.8 0-26.1-74.6C372.3 104.6 360.2 96 346.6 96L165.4 96c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32l181.2 0c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2l0 144 0 48c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-48L96 400l0 48c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-48L0 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                                    </svg>
                                </div>
                                <div class="active-text"> <span>{{ selectedVehicles[0].year }} </span> <span>{{
                                        selectedVehicles[0].make.name }} </span> <span>{{ selectedVehicles[0].model.name }}
                                    </span> </div>
                                <div class="reset" @click="resetVehicle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path
                                            d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                                    </svg>
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
</template>