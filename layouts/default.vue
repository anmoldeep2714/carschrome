<script>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import VehicleSelector  from '~/components/VehiclePop.vue';
export default {
    components: {
        Header,
        VehicleSelector,
        Footer
    }
}
</script>
<template>
    <Header></Header>
    <VehicleSelector></VehicleSelector>
    <NuxtPage />
    <Footer></Footer>
</template>