<script setup>
/* import { useRoute } from '#app'; */
/* import { useRouter, useRoute } from 'vue-router'; */
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from '#imports';
import { apiCall } from '~/utils/api';
const { locales, defaultLocale, locale } = useI18n();
const config = useRuntimeConfig();
import { useAuthStore } from '~/stores/auth';
import { useMenuStore } from '~/stores/menu';
import { useLocalePath } from "#imports";
import { useVehiclePopupStore } from '~/stores/vehiclePopup';

const vehiclePopup = useVehiclePopupStore();
const authStore = useAuthStore();
const menuStore = useMenuStore();
const localesArr = ref({ en: 'English', ar: 'Arabic' });
const siteUrl = config.public.siteUrl;
const auth_token = useCookie('auth_token');
const auth_user = useCookie('auth_user');
const cookie_storeVehicles = useCookie('cookie_storeVehicles');
const showLanguage = ref(0);
const localePath = useLocalePath();
const currentNavIndex = ref(null);
const subMenusRefs = ref([]);
const menuItemsRef = ref([]);



/* auth_token.value = null;
auth_user.value = null; */

/* update user if found auth_token in cookie*/
if (auth_token.value != null || auth_token.value == '') {
    authStore.signin(auth_token.value, auth_user.value);
}

/* update store vehicles if found stores vehicles in cookie*/
if (cookie_storeVehicles.value != null || cookie_storeVehicles.value == '') {
    vehiclePopup.updateStoreVehicles(cookie_storeVehicles.value);
}

const { data: menuData, status: menuStatus, error } = useAsyncData("menuData", async () => {
    const params = {
        action: 'get-menu',
        lang: locale.value
    }
    return await apiCall(config.public.apiBase, "GET", params);

});
/* },{lazy: true}); */

/* },{ server: false }); */


/* Runs when menuData changed */


watch(menuData, (newData) => {
    menuStore.setMenuData(newData);
    /*  useHead({
         title: "Title updated",
         meta: [
             { name: "description", content: "description updated" },
         ],
     }); */
}, { immediate: true });

/* Runs immediately on setup (doesn't wait for menuData to change). */
/* watchEffect(() => {
    useHead({
      title: "Title updateddd",
      meta: [
        { name: "description", content: "description updatedsdddd" },
      ],
    });
}); */


import { useAuthPopStore } from '~/stores/authpop';
const authPopStore = useAuthPopStore();


const router = useRouter();
const route = useRoute();
const slug = route.params.slug || '';

/* console.log('defaultLocale', defaultLocale);
console.log('locale', locale.value); */

// Extract all supported language codes (excluding 'en' if it's the default)
const localeCodes = locales.value.map(l => (typeof l === 'object' ? l.code : l));

const setLocale = (lang) => {
    const pathSegments = route.path.split('/').filter(Boolean); // Remove empty segments
    const currentLang = localeCodes.includes(pathSegments[0]) ? pathSegments[0] : defaultLocale;

    let newPath;
    showLanguage.value = 0;
    if (lang === defaultLocale) {

        if (currentLang === lang) return;
        // Remove language prefix if switching to default locale
        /* newPath = `/${pathSegments.slice(1).join('/')}`; */
        newPath = `/${slug}`;
    } else {
        // Add new locale if it's not already set
        if (currentLang === lang) return; // Do nothing if already in selected locale
        /*  newPath = `/${lang}/${pathSegments.slice(1).join('/')}`; */
        newPath = `/${lang}/${slug}`;
    }



    // Preserve query parameters
    router.replace({ path: newPath, query: route.query }).then(() => {
        locale.value = lang;
        location.reload(); // Reload to apply changes
    });
}


const getSetLocale = (lang) => {
    const pathSegments = route.path.split('/').filter(Boolean); // Remove empty segments
    const currentLang = localeCodes.includes(pathSegments[0]) ? pathSegments[0] : defaultLocale;

    let newPath;
    if (lang === defaultLocale) {

        if (currentLang === lang) return;
        // Remove language prefix if switching to default locale
        /* newPath = `/${pathSegments.slice(1).join('/')}`; */
        newPath = `/${slug}`;
    } else {
        // Add new locale if it's not already set
        if (currentLang === lang) return; // Do nothing if already in selected locale
        /*  newPath = `/${lang}/${pathSegments.slice(1).join('/')}`; */
        newPath = `/${lang}/${slug}`;
    }


    return router.resolve({ path: newPath, query: route.query }).href;



    // Preserve query parameters
    /* router.replace({ path: newPath, query: route.query }).then(() => {
        locale.value = lang;
        location.reload(); // Reload to apply changes
    }); */
}

const checkForSignin = () => {

    var token = localStorage.getItem("auth_token");
    var user = localStorage.getItem("auth_user");

    if (token !== null) {
        authStore.signin(token, JSON.parse(user));
    }
}

const logout = () => {
    auth_token.value = null;
    auth_user.value = null;
    location.reload();
}

const OpenLnaguage = () => {
    if (showLanguage.value) {
        showLanguage.value = !showLanguage.value;
    }
    else {
        showLanguage.value = 1;
    }
}

const handleClickOutSide = (event) => {
    if (
        menuItemsRef.value.some((menu) => menu?.contains(event.target)) ||
        subMenusRefs.value.some((submenu) => submenu?.contains(event.target))
    ) {
        return;
    }
    currentNavIndex.value = null;
}

const openNavInner = (idx) => {
    if (idx === currentNavIndex.value) {
        currentNavIndex.value = null;
    }
    else {
        currentNavIndex.value = idx;
    }


}

const closeNavBar = () => {
    currentNavIndex.value = null;
}

onMounted(() => {
    /*  checkForSignin(); */
    document.addEventListener("click", handleClickOutSide);
});

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
})

</script>
<template>
    <header class="header">
        <div class="header-top">
            <div class="wrapper">
                <div class="inner">
                    <ul class="float-left">
                        <!-- <li><a href="">My Account</a></li> -->
                        <!-- <li><a href="">Wishlist</a></li>
                        <li><a href="">Compare List</a></li> -->
                    </ul>
                    <div class="user-dash-wrapper">
                        <div class="user">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path
                                    d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
                            </svg>
                        </div>
                        <ul v-if="!authStore.isLoggedIn()">
                            <li><a @click="authPopStore.openSigninPop()" class="sign-in-popup-toggle">{{
                                $t('menu.signin_title') }}</a></li>
                            <li><a @click="authPopStore.openSignupPop()" class="sign-up-popup-toggle">{{
                                $t('menu.register_title') }}</a></li>
                        </ul>
                        <ul v-else>
                            <li><a :href="siteUrl">My Account</a></li>
                            <li><a @click="logout">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-main">
            <div class="wrapper">
                <div class="inner">
                    <a :href="localePath('/')" class="logo-wrapper">
                        <img src="assets/images/logo.png" alt="">
                    </a>
                    <div class="search-language-cart-wrapper">
                        <div class="search-bar-form-wrapper">
                            <form class="form">
                                <input type="text" :placeholder="$t('menu.search_input_placeholder')">
                                <button type="submit">
                                    <span>{{ $t('menu.search_btn_title') }}</span>
                                </button>
                            </form>
                        </div>
                        <div class="language-selector-wrapper">
                            <div class="icon">
                                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd"
                                    clip-rule="evenodd">
                                    <path
                                        d="M12.02 0c6.614.011 11.98 5.383 11.98 12 0 6.623-5.376 12-12 12-6.623 0-12-5.377-12-12 0-6.617 5.367-11.989 11.981-12h.039zm3.694 16h-7.427c.639 4.266 2.242 7 3.713 7 1.472 0 3.075-2.734 3.714-7m6.535 0h-5.523c-.426 2.985-1.321 5.402-2.485 6.771 3.669-.76 6.671-3.35 8.008-6.771m-14.974 0h-5.524c1.338 3.421 4.34 6.011 8.009 6.771-1.164-1.369-2.059-3.786-2.485-6.771m-.123-7h-5.736c-.331 1.166-.741 3.389 0 6h5.736c-.188-1.814-.215-3.925 0-6m8.691 0h-7.685c-.195 1.8-.225 3.927 0 6h7.685c.196-1.811.224-3.93 0-6m6.742 0h-5.736c.062.592.308 3.019 0 6h5.736c.741-2.612.331-4.835 0-6m-12.825-7.771c-3.669.76-6.671 3.35-8.009 6.771h5.524c.426-2.985 1.321-5.403 2.485-6.771m5.954 6.771c-.639-4.266-2.242-7-3.714-7-1.471 0-3.074 2.734-3.713 7h7.427zm-1.473-6.771c1.164 1.368 2.059 3.786 2.485 6.771h5.523c-1.337-3.421-4.339-6.011-8.008-6.771">
                                    </path>
                                </svg>
                            </div>
                            <div class="">
                                <div class="title">{{ $t('language') }}</div>

                                <div class="languages-dropdown">
                                    <div class="selected-value" @click="OpenLnaguage">{{ locale ? localesArr[locale] :
                                        '' }}</div>
                                    <div class="languages-dropdown-list" :class="{ show: showLanguage }">
                                        <ul>
                                            <li v-for="(loc, idx) in localesArr">
                                                <a :href="getSetLocale(idx)" @click="OpenLnaguage()">{{ loc }}</a>
                                                <!-- <a :href="getSetLocale(idx)" @click="setLocale(idx)">{{ loc }}</a> -->
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="shopping-cart-wrapper">
                            <div class="icon">
                                <div class="counter">0</div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path
                                        d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                                </svg>
                            </div>
                            <div class="">
                                <div class="title">{{ $t('menu.shopping_cart_title') }}</div>
                                <div class="total-price">$0.00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-menu-row">
            <div class="wrapper">
                <div class="inner">
                    <div class="mega-menu-main">
                        <!-- <div class="mega-menu-toggle">
                            <span class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>
                            </span>
                            <span>
                                Shop departments
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
                            </span>
                        </div> -->
                        <div class="mega-menu-wrapper">

                            <ul class="tab-menu">
                                <li v-for="(menu, menuIndex) in menuData" :key="menuIndex" ref="menuItemsRef"
                                    @click="openNavInner(menuIndex)">
                                    <a v-html="menu.post_title"
                                        :class="{ 'active': menuIndex === currentNavIndex }"></a>
                                </li>
                            </ul>
                            <!-- <ul class="tab-menu">
                                <li><a href="">Regular Service</a>
                                    
                                </li>
                                <li><a href="">replacement</a></li>
                                <li><a href="">body</a></li>
                                <li><a href="">Tires & wheels</a></li>
                                <li><a href="">lighting</a></li>
                                <li><a href="">tools</a></li>
                                <li><a href="">performance</a></li>
                                <li><a href="">interior</a></li>
                            </ul> -->
                            <div class="tab-content-wrapper">
                                <div class="tab-content" v-for="(menu, menuIndex) in menuData" :dataIndex="menuIndex"
                                    :class="{ 'active': menuIndex === currentNavIndex }" ref="subMenusRefs">
                                    <div class="parts-grid" v-if="menu.children.length > 0" :key="menuIndex">
                                        <!-- <a class="" v-for="(childMenu, childMenuIndex) in menu.children"
                                            :key="childMenuIndex" :href="localePath(`/${childMenu.menu_slug}`)">
                                            <img :src="childMenu.thumbnail_guid" alt="">
                                            <span class="text"v-html="childMenu.post_title"></span>
                                        </a> -->

                                        <a @click="closeNavBar" v-for="(childMenu, childMenuIndex) in menu.children"
                                            :href="localePath(`/${childMenu.menu_slug}`)">
                                            <span class="text" v-html="childMenu.post_title"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>