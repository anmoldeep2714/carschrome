<script>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import Loader from '~/components/Loader.vue';
export default {
    components: {
        Header,
        Loader,
        Footer
    }
}
</script>
<template>
    <Header></Header>
    <Loader></Loader>
    <NuxtPage />
    <Footer></Footer>
</template>