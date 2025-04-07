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
    const closePopup = (pageReload:boolean = false) => {
        console.log('closePopup');
        pageReloadState.value = pageReload;
        showPopup.value = false;
        if(pageReload==true){
          location.reload();
        }
    };

    const triggershowPopup = () => {
        showPopup.value = true;

        console.log('showPopup_value',showPopup.value);
    };
    const updateStoreVehicles = (updatedVehicles:[]) => (storeVehicles.value=updatedVehicles);
    

    return { showPopup,storeVehicles,openPopup, closePopup,updateStoreVehicles,triggershowPopup };
});