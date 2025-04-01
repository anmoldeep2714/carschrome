<script setup>
import { useAuthPopStore } from '~/stores/authpop';
import { useAuthStore } from '~/stores/auth';
const { $apiCall } = useNuxtApp();
const { locales, locale } = useI18n();
const config = useRuntimeConfig();
import { ref } from 'vue';

const authPopStore = useAuthPopStore();
const authStore = useAuthStore();
const submitErr = ref({ state: 0, message: '' });

const auth_token = useCookie('auth_token');
const auth_user = useCookie('auth_user');

const signupform = ref({
    name: '',
    email: '',
    password: '',
});
const signupErrors = ref({
    name: '',
    email: '',
    password: '',
});

const signupSubmitSuccess = ref({
    state: 0,
    message: '',
});
const signupSubmitError = ref({
    state: 0,
    message: '',
});

const validateSignupForm = () => {
    signupErrors.value = { name: '', email: '', password: '' };
    let isValid = true;

    if (!signupform.value.name.trim()) {
        signupErrors.value.name = 'Name is required';
        isValid = false;
    }

    if (!signupform.value.email.trim()) {
        signupErrors.value.email = 'Email is required';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupform.value.email)) {
        signupErrors.value.email = 'Invalid email format';
        isValid = false;
    }

    if (!signupform.value.password) {
        signupErrors.value.password = 'Password is required';
        isValid = false;
    } else if (signupform.value.password.length < 6) {
        signupErrors.value.password = 'Password must be at least 6 characters';
        isValid = false;
    }

    return isValid;
};
const onSignupSubmit = async () => {
    signupSubmitError.value = { state: 0, message: '' }; // Reset API error
    signupSubmitSuccess.value = { state: 0, message: '' }; // Reset API error

    if (!validateSignupForm()) return; // Stop if validation fails

    const params = {
        action: 'signup',
        name: signupform.value.name,
        email: signupform.value.email,
        password: signupform.value.password
    };

    try {
        const result = await $apiCall({
            url: `${config.public.apiBase}`,
            method: "GET",
            params: params
        });

        if (!result.success) {
            signupSubmitError.value = { state: 1, message: result.message };
        } else {
            signupSubmitSuccess.value = { state: 1, message: 'Signup successful!' };
            resetSignupForm();
            setTimeout(() => {
                signupSubmitSuccess.value = { state: 0, message: '' };
                authPopStore.openSigninPop();
            }, 1500);

        }
    } catch (error) {
        signupSuccess.value = { state: 1, message: 'Something went wrong. Please try again.' };
    }
};
const resetSignupForm = () => {
    signupform.value = { name: '', email: '', password: '' };
    signupErrors.value = { name: '', email: '', password: '' };
};

/* sign in */
const signinForm = ref({
    name: '',
    email: '',
    password: '',
});
const signinErrors = ref({
    name: '',
    email: '',
    password: '',
});

const signinSubmitSuccess = ref({
    state: 0,
    message: '',
});
const signinSubmitError = ref({
    state: 0,
    message: '',
});

const validateSigninForm = () => {
    signinErrors.value = { email: '', password: '' };
    let isValid = true;

    if (!signinForm.value.email.trim()) {
        signinErrors.value.email = 'Email is required';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signinForm.value.email)) {
        signinErrors.value.email = 'Invalid email format';
        isValid = false;
    }

    if (!signinForm.value.password) {
        signinErrors.value.password = 'Password is required';
        isValid = false;
    } else if (signinForm.value.password.length < 6) {
        signinErrors.value.password = 'Password must be at least 6 characters';
        isValid = false;
    }

    return isValid;
};
const onsigninSubmit = async () => {

    signinSubmitError.value = { state: 0, message: '' }; // Reset API error
    signinSubmitSuccess.value = { state: 0, message: '' }; // Reset API error

    if (!validateSigninForm()) return; // Stop if validation fails

    const params = {
        action: 'login',
        email: signinForm.value.email,
        password: signinForm.value.password
    };

    try {
        const result = await $apiCall({
            url: `${config.public.apiBase}`,
            method: "GET",
            params: params
        });


        if (!result.success) {
            signinSubmitError.value = { state: 1, message: result.message };
        } else {
            signinSubmitSuccess.value = { state: 1, message: 'Signin successful!' };
            /*   resetSigninForm(); */
            var data = result.data;
            var token = data.token;
            var user = data.user;

            auth_token.value = token;
            auth_user.value = user;

           /*  authStore.signin(token,user); */

            /* localStorage.setItem("auth_token", token);
            localStorage.setItem("auth_user", JSON.stringify(user)); */

            location.reload();
        }
    } catch (error) {
        /* signinSubmitError.value = { state: 1, message: 'Something went wrong. Please try again.' }; */
        signinSubmitError.value = { state: 1, message: error };
    }
};

const resetSigninForm = () => {
    signinForm.value = { name: '', email: '', };
    signinErrors.value = { name: '', email: '' };
};

</script>
<template>
    <footer>
        <div class="footer-top">
            <div class="wrapper">
                <div class="inner">
                    <h2>Sign up to Newsletter</h2>
                    <div class="newsletter-form-wrapper">
                        <form action="">
                            <input type="text" placeholder="Enter your email address">
                            <button type="">
                                <span>Send</span>
                            </button>
                        </form>
                    </div>
                    <div class="socials-media-links">
                        <a href="" class="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                                <path
                                    d="M13.871 0H5.679A5.685 5.685 0 0 0 0 5.679v8.192a5.685 5.685 0 0 0 5.679 5.679h8.192a5.685 5.685 0 0 0 5.679-5.679V5.679A5.685 5.685 0 0 0 13.871 0Zm4.152 13.871a4.156 4.156 0 0 1-4.152 4.152H5.679a4.156 4.156 0 0 1-4.152-4.152V5.679a4.156 4.156 0 0 1 4.152-4.152h8.192a4.156 4.156 0 0 1 4.152 4.152Z">
                                </path>
                                <path
                                    d="M9.775 4.306a5.469 5.469 0 1 0 5.469 5.469 5.475 5.475 0 0 0-5.469-5.469Zm0 9.353a3.884 3.884 0 1 1 3.884-3.884 3.888 3.888 0 0 1-3.884 3.884Z">
                                </path>
                                <circle cx=".78" cy=".78" r=".78" transform="translate(14.428 3.748)"></circle>
                            </svg>
                        </a>
                        <a href="" class="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19.278" height="19.278">
                                <path
                                    d="M18.214 0H1.063A1.064 1.064 0 0 0 0 1.064v17.151a1.064 1.064 0 0 0 1.064 1.063H10.3v-7.455H7.8V8.9h2.5V6.757a3.505 3.505 0 0 1 3.74-3.846 20.6 20.6 0 0 1 2.245.115v2.6h-1.532c-1.209 0-1.443.574-1.443 1.417V8.9h2.89l-.377 2.918H13.31v7.455h4.9a1.064 1.064 0 0 0 1.064-1.064V1.063A1.064 1.064 0 0 0 18.214 0Z">
                                </path>
                            </svg>
                        </a>
                        <a href="" class="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16.016" height="18.246">
                                <path
                                    d="M5.407 18.245c-.316-.049-.634-.084-.946-.149a5.631 5.631 0 0 1-.034-11.012 5.756 5.756 0 0 1 1.983-.1.575.575 0 0 1 .087.017.692.692 0 0 1 .072.026v2.991c-.175-.032-.339-.065-.506-.088a2.685 2.685 0 1 0 2.343 2.719c.023-1.557.009-3.116.011-4.673V.002h2.942a4.719 4.719 0 0 0 4.657 4.6v2.929a7.614 7.614 0 0 1-4.612-1.562v.228l.021 6.277a5.651 5.651 0 0 1-4.4 5.609c-.275.067-.563.088-.844.131-.056.009-.114.023-.172.035Z">
                                </path>
                            </svg>
                        </a>
                        <a href="" class="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26.483" height="14.336">
                                <path
                                    d="M26.477 12.028a.852.852 0 0 0-.132-.421 13.991 13.991 0 0 0-2.655-2.9l-1.131-1c.432-.665.863-1.286 1.249-1.934a14.735 14.735 0 0 0 1.508-4.253c.118-.493.244-.986.371-1.508h-6.202c-.495 0-.39-.093-.543.4a13.063 13.063 0 0 1-2.158 4.291c-.057.072-.119.138-.224.258V.032H8.837c0 .724.021 1.426-.009 2.126a.923.923 0 0 0 .377.885 1.725 1.725 0 0 1 .754 1.811 7.933 7.933 0 0 0-.007 1.067c-.169-.145-.291-.237-.4-.343a6 6 0 0 1-1.758-3.845c-.054-.559-.009-1.128-.009-1.7H-.002a22.03 22.03 0 0 0 .138 2.308 15.294 15.294 0 0 0 3.459 7.478 12.117 12.117 0 0 0 9.644 4.519h3.321v-3.093a.319.319 0 0 1 .082.009c.062.037.122.076.182.118a6.357 6.357 0 0 1 2.226 2.725.356.356 0 0 0 .383.244c2.254-.009 4.507-.006 6.761-.006h.284c-.001-.79.01-1.552-.001-2.307Zm-3.813.45h-1.929a.7.7 0 0 1-.639-.351 8.051 8.051 0 0 0-3.263-2.906l-.1-.049h-2.019v3.293l-.925.006c-.409.007-.81.011-1.208-.011a10.2 10.2 0 0 1-5.472-1.9 12.67 12.67 0 0 1-4.285-5.6 15.6 15.6 0 0 1-.545-1.662c-.067-.235-.135-.47-.206-.7a1.475 1.475 0 0 1-.047-.239l-.067-.417.41-.083h3.545l.049.3a7.406 7.406 0 0 0 5.846 6.586V7.489c0-1.414 0-2.828.007-4.242a.417.417 0 0 0-.152-.393 3 3 0 0 1-.262-.241l-.787-.751h4.084v5.495h.315c.595 0 1.2 0 1.793-.007a.212.212 0 0 0 .1-.043 13.974 13.974 0 0 0 3.34-5.028.686.686 0 0 1 .552-.427 57.25 57.25 0 0 1 1.557-.01h.945l-.106.442a10.355 10.355 0 0 1-1.338 3.127 12.894 12.894 0 0 1-1.961 2.312l.459.427c.53.495 1.057.985 1.588 1.469l.437.394a17.054 17.054 0 0 1 1.878 1.865l.486.586Z">
                                </path>
                            </svg>
                        </a>
                        <a href="" class="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21">
                                <path
                                    d="M20.853 9.846v1.141c-.014.072-.031.145-.042.218-.063.449-.1.9-.189 1.347a10.432 10.432 0 0 1-8.691 8.177c-.314.047-.63.081-.944.121H9.845c-.153-.018-.307-.038-.46-.054a10.048 10.048 0 0 1-5.509-2.27A10.188 10.188 0 0 1 .124 8.778a9.741 9.741 0 0 1 2.83-5.634 10.21 10.21 0 0 1 9.105-3.02 9.9 9.9 0 0 1 5.295 2.512 10.244 10.244 0 0 1 3.379 6.284c.046.312.083.621.12.926Zm-11.323 3.3c.2.129.384.239.558.368a2.605 2.605 0 0 0 2.311.346 3.735 3.735 0 0 0 2.462-2.151 6.064 6.064 0 0 0 .565-3.366 3.691 3.691 0 0 0-1.693-2.86 5.622 5.622 0 0 0-5.538-.43 4.6 4.6 0 0 0-2.759 5.071 2.141 2.141 0 0 0 1.588 1.889c.157.046.213 0 .274-.133a1.1 1.1 0 0 0-.056-1.159 2.587 2.587 0 0 1-.309-2.166 3.455 3.455 0 0 1 1.363-1.991 3.647 3.647 0 0 1 3.064-.738 2.552 2.552 0 0 1 2.072 1.777 4.824 4.824 0 0 1-.59 4.132 1.778 1.778 0 0 1-1.663.919c-.631-.042-1.2-.3-1.093-1.194a9.009 9.009 0 0 1 .234-1.09c.142-.578.32-1.148.442-1.729a.941.941 0 0 0-.545-1.13 1.145 1.145 0 0 0-1.342.267 2.685 2.685 0 0 0-.437 2.711.6.6 0 0 1 .039.328c-.042.246-.107.489-.17.731a23.479 23.479 0 0 0-.846 4.055 8.524 8.524 0 0 0 .074 1.912 3.215 3.215 0 0 0 .832-.886 7.65 7.65 0 0 0 .948-2.5c.074-.315.139-.639.214-.983Z">
                                </path>
                            </svg>
                        </a>
                        <a href="" class="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16.575" height="16.943">
                                <path
                                    d="M16.033 0 13.98 2.4q-2.026 2.359-4.056 4.715c-.014.017-.028.034-.049.063l6.7 9.753c-.068 0-.114.011-.16.011h-4.632a.238.238 0 0 1-.228-.12q-2.158-3.149-4.322-6.294c-.034-.049-.069-.1-.112-.156-.4.462-.787.913-1.175 1.365q-2.183 2.539-4.365 5.08a.327.327 0 0 1-.282.126c-.419-.008-.836 0-1.3 0L6.47 9.422 5.432 7.909.097.145A1.589 1.589 0 0 1 .018.003h4.93c.011.018.02.039.032.057l4.173 6.072c.017.026.04.048.066.082.048-.051.089-.094.128-.139q2.4-2.786 4.8-5.576c.139-.16.266-.331.4-.5Zm-1.469 15.885c-.034-.055-.046-.078-.062-.1Q9.408 8.496 4.31 1.211a.3.3 0 0 0-.216-.1c-.65-.008-1.3 0-1.952 0-.035 0-.071 0-.134.008l.131.2q1.835 2.622 3.666 5.243 3.221 4.607 6.438 9.214a.259.259 0 0 0 .243.126c.633-.006 1.268 0 1.9 0Z">
                                </path>
                            </svg>
                        </a>
                        <a href="" class="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                                <path
                                    d="m0 19.545.32-1.174c.334-1.212.667-2.426 1.007-3.636a.465.465 0 0 0-.046-.383A9.391 9.391 0 0 1 .11 8.931 9.6 9.6 0 0 1 7.234.375a9.411 9.411 0 0 1 8.91 1.975 9.182 9.182 0 0 1 3.236 5.567A9.71 9.71 0 0 1 11.686 19.2a9.6 9.6 0 0 1-6.325-.892.531.531 0 0 0-.4-.052q-2.354.622-4.712 1.233a2.25 2.25 0 0 1-.249.056Zm2.343-2.3c.964-.251 1.892-.489 2.817-.739a.546.546 0 0 1 .458.067 8.085 8.085 0 0 0 12.078-8.666 8.084 8.084 0 0 0-7.631-6.252 7.722 7.722 0 0 0-3.606.733 7.9 7.9 0 0 0-4.717 6.961 7.521 7.521 0 0 0 1.214 4.6.769.769 0 0 1 .1.708c-.248.853-.47 1.709-.713 2.588Z">
                                </path>
                                <path
                                    d="M4.502 7.675a2.472 2.472 0 0 1 .969-1.894 1.01 1.01 0 0 1 .688-.246c.161 0 .321.017.48.005a.488.488 0 0 1 .515.282c.306.62.613 1.242.893 1.872a.425.425 0 0 1-.063.37 8.209 8.209 0 0 1-.647.762.312.312 0 0 0-.036.447 6.93 6.93 0 0 0 3.577 2.669.446.446 0 0 0 .524-.112c.254-.276.515-.549.767-.828.194-.212.291-.258.578-.145.728.288 1.446.6 2.168.894a.274.274 0 0 1 .179.3c-.03.948-.344 1.409-1.517 1.844a3.53 3.53 0 0 1-2.1.02 10.548 10.548 0 0 1-5.75-3.692 5.087 5.087 0 0 1-1.114-1.892c-.052-.217-.075-.437-.111-.656Z">
                                </path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-main">
            <div class="wrapper">
                <div class="inner">
                    <div class="footer-quick-links-row">
                        <div class="footer-quick-links-column">
                            <a href="" class="logo-wrapper">
                                <img src="assets/images/logo.png" alt="">
                            </a>
                            <h3>Need A Hand?</h3>
                            <ul>
                                <li>
                                    <a href="mailto:sales@carschrome.ca">sales@carschrome.ca</a>
                                </li>
                            </ul>
                            <h3>Your Voice Matters</h3>
                            <p>We'd love to learn more about your shopping experience and how we can improve!</p>
                            <a href="" class="take-a-survey-button">
                                <span>Take a servey</span>
                            </a>
                        </div>
                        <div class="footer-quick-links-column">
                            <h2>Help & Support</h2>
                            <ul class="quick-links">
                                <li>
                                    <a href="">Help Center</a>
                                </li>
                                <li>
                                    <a href="">Track My Order</a>
                                </li>
                                <li>
                                    <a href="">Returns & Exchanges</a>
                                </li>
                                <li>
                                    <a href="">FAQs</a>
                                </li>
                                <li>
                                    <a href="">Warranty Policy</a>
                                </li>
                                <li><a href="">My Account</a></li>
                                <li><a href="">My Order</a></li>
                                <li><a href="">Report A Bug</a></li>
                                <li><a href="">Sign Up</a></li>
                            </ul>
                        </div>
                        <div class="footer-quick-links-column">
                            <h2>Education</h2>
                            <ul class="quick-links">
                                <li><a href="">Blog</a></li>
                                <li><a href="">Car-Parts Buying Guide</a></li>
                                <li><a href="">Fitment Guide</a></li>
                                <li><a href="">Installation Tips</a></li>
                                <li><a href="">Shop by Parts</a></li>
                                <li><a href="">Shop by Brands</a></li>
                                <li><a href="">Shipping Information</a></li>
                                <li><a href="">Same Day Delivery</a></li>
                                <li><a href="">In-store Pickup Process</a></li>
                            </ul>
                        </div>
                        <div class="footer-quick-links-column">
                            <h2>About Us</h2>
                            <ul class="quick-links">
                                <li><a href="">Our Story</a></li>
                                <li><a href="">Customer Review</a></li>
                                <li><a href="">Careers</a></li>
                                <li><a href="">Right-to-Repair</a></li>
                                <li><a href="">Sustainable Mobility</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-copyright-row">
            <div class="wrapper">
                <div class="inner">
                    <p>&copy; 2025 Carschrome Inc. All Rights Reserved Website by Twins Technolabs Pvt. Ltd.</p>
                    <div class="img-wrapper">
                        <img src="assets/images/footer-img-1.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <div class="popup-sign-form sign-in-popop"
        :style="{ display: authPopStore.activePopup == 'signin' ? 'flex' : 'none' }">
        <div class="inner">
            <div class="popImg"><img src="assets/images/popup.jpg" height="50" alt=""></div>

            <div class="">
                <div class="close" @click="authPopStore.closePopup()"><span></span></div>
                <form @submit.prevent="onsigninSubmit">
                    <h2>Login</h2>
                    <div class="input-row">
                        <div class="input-column"><label>Email*</label>
                            <div class="input-wrapper"><input v-model="signinForm.email" type="text"><span
                                    class="icon user-icon"></span></div>
                            <p v-if="signinErrors.email">{{ signinErrors.email }}</p>
                        </div>
                    </div>
                    <div class="input-row">
                        <div class="input-column"><label>Psssword*</label>
                            <div class="input-wrapper"><input v-model="signinForm.password" type="password"><span
                                    class="icon pass-icon"></span></div>
                            <p v-if="signinErrors.password">{{ signinErrors.password }}</p>
                        </div>
                    </div>

                    <div class="input-row" v-if="signinSubmitError.state">
                        <p class="error-message">{{ signinSubmitError.message }}</p>
                    </div>

                    <div class="input-row" v-if="signinSubmitSuccess.state">
                        <p class="success-message">{{ signinSubmitSuccess.message }}</p>
                    </div>
                    <div class="input-row submit-row">
                        <div class="input-column">
                            <button type="submit">
                                <span>Login</span>
                            </button>
                            <div class="lost-password-link"><input type="checkbox" id="rememberMe"><label
                                    for="rememberMe">Remember Me</label></div>

                        </div>
                    </div>
                </form>
                <div class="form-popup-nav">
                    <p><a href="" class="">Lost Your Password</a></p>
                    <p>New to site? <a @click="authPopStore.openSignupPop()" class="sign-up-popup-toggle"><b>Create an
                                Account</b></a></p>
                </div>
            </div>
        </div>
    </div>
    <div class="popup-sign-form sign-up-popop"
        :style="{ display: authPopStore.activePopup == 'signup' ? 'flex' : 'none' }">
        <div class="inner">
            <div class="popImg"><img src="assets/images/popup.jpg" height="50" alt=""></div>
            <div class="">
                <div class="close" @click="authPopStore.closePopup()"><span></span></div>
                <form @submit.prevent="onSignupSubmit">
                    <h2>Welcome to CarsChrome <span>Sign up to get all information.</span></h2>

                    <div class="input-row">

                        <div class="input-column"><label>Name*</label>
                            <div class="input-wrapper"><input v-model="signupform.name" type="text"><span
                                    class="icon user-icon"></span></div>
                            <p v-if="signupErrors.name">{{ signupErrors.name }}</p>
                        </div>
                    </div>
                    <div class="input-row">

                        <div class="input-column"><label>Email *</label>
                            <div class="input-wrapper"><input v-model="signupform.email" type="text"><span
                                    class="icon user-icon"></span></div>
                            <p v-if="signupErrors.email">{{ signupErrors.email }}</p>
                        </div>
                    </div>
                    <div class="input-row">

                        <div class="input-column"><label>Enter your passsword</label>
                            <div class="input-wrapper"><input v-model="signupform.password" type="password"><span
                                    class="icon pass-icon"></span></div>
                            <p v-if="signupErrors.password">{{ signupErrors.password }}</p>
                        </div>
                    </div>
                    <div class="input-row" v-if="signupSubmitError.state">
                        <p class="error-message">{{ signupSubmitError.message }}</p>
                    </div>

                    <div class="input-row" v-if="signupSubmitSuccess.state">
                        <p class="success-message">{{ signupSubmitSuccess.message }}</p>
                    </div>
                    <div class="input-row submit-row">
                        <div class="input-column">
                            <button type="submit">
                                <span>Register</span>
                            </button>
                        </div>
                    </div>
                </form>
                <div class="form-popup-nav">
                    <p>Already have an account? <a @click="authPopStore.openSigninPop()"
                            class="sign-in-popup-toggle"><b>Login</b></a></p>
                </div>
            </div>
        </div>
    </div>
</template>