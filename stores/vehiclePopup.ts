import { defineStore } from "pinia";
import { ref } from "vue";

export const useVehiclePopupStore = defineStore("vehiclePopup", () => {
    const showPopup = ref(false);
    const openPopup = () => (showPopup.value = true);
    const closePopup = () => (showPopup.value = false);

    return { showPopup, openPopup, closePopup };
});