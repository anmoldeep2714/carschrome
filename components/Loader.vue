<script setup>
import {useLoaderStore} from '~/stores/loaderStore';
const loaderStore = useLoaderStore();
</script>
<template>
    <div class="loader-container" :class="{'active':loaderStore.showLoader}">
        <div class="loader"></div>
    </div>
</template>