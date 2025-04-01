<script setup>
/* import { useRoute } from '#app'; */
/* import { useRouter, useRoute } from 'vue-router'; */
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from '#imports';
import { apiCall } from '~/utils/api';
const { locales, defaultLocale, locale } = useI18n();
const config = useRuntimeConfig();
import { useAuthStore } from '~/stores/auth';   
import { useLocalePath } from "#imports";

const authStore = useAuthStore();
const localesArr = ref({ en: 'English', ar: 'Arabic' });
const siteUrl = config.public.siteUrl;
const auth_token = useCookie('auth_token');
const auth_user = useCookie('auth_user');
const showLanguage = ref(0);
const localePath = useLocalePath();
const currentNavIndex = ref(null);
const subMenusRefs = ref([]);
const menuItemsRef = ref([]);



/* auth_token.value = null;
auth_user.value = null; */
if (auth_token.value != null || auth_token.value == '') {
    authStore.signin(auth_token.value, auth_user.value);
}

const { data: menuData, status: menuStatus, error } = useAsyncData("menuData", async () => {
    const params = {
        action: 'get-menu',
        menu_slug: 'categories-menu',
        lang: locale.value
    }
    return await apiCall(config.public.apiBase, "GET", params);

});
/* },{lazy: true}); */

/* },{ server: false }); */


/* Runs when menuData changed */


watch(menuData, (newData) => {
    useHead({
        title: "Title updated",
        meta: [
            { name: "description", content: "description updated" },
        ],
    });
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

onMounted(() => {
    /*  checkForSignin(); */
    document.addEventListener("click", handleClickOutSide);
});

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
})

</script>
<template>
    <header class="header ">
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
                        <img src="assets/images/logo.png" alt="carschrome-rahul">
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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path
                                        d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z" />
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
                                                <a @click="setLocale(idx)">{{ loc }}</a>
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
                                    <a v-html="menu.post_title" :class="{ 'active': menuIndex === currentNavIndex }"></a>
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
                                        <a class="" v-for="(childMenu, childMenuIndex) in menu.children"
                                            :key="childMenuIndex">
                                            <!--  <img :src="childMenu.thumbnail_guid" alt=""> -->
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