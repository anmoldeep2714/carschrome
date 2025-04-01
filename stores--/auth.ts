import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null as any,
        token: null as any,
    }),
    actions: {
        signup() {
            // Signup logic here
        },
        signin(token: any, data: any) {
            this.token = token;
            this.user = data;
            /* if (this.token) {
                this.token.value = token;
            } */
        },
        logout() {
            this.token = null;
            this.user = null;
            navigateTo("/");
        },
        isLoggedIn() {
            return this.token ? true : false;
        }
    },
});