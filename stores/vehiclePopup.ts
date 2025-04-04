import { defineStore } from "pinia";
import { ref } from "vue";

export const useVehiclePopupStore = defineStore("vehiclePopup", () => {
    const showPopup = ref(false);
    const storeVehicles = ref([]);
    const pageReloadState = ref(false);
    const openPopup = (pageReload:boolean = false) => {
        showPopup.value = true;
        if(pageReload){
            pageReloadState.value = true;
        }
    };
    const closePopup = () => {
        showPopup.value = false;
        if(pageReloadState){
            location.reload();
        }
    };
    const updateStoreVehicles = (updatedVehicles:[]) => (storeVehicles.value=updatedVehicles);
    

    return { showPopup,storeVehicles,openPopup, closePopup,updateStoreVehicles };
});