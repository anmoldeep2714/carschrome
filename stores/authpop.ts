import {defineStore} from 'pinia';

export const useAuthPopStore = defineStore('authPop',{
    state:()=>({
        activePopup:null as string | null,
    }),
    actions:{
        openPopup(name:string){
            this.activePopup = null;
            this.activePopup = name;
        },
        closePopup(){
            this.activePopup = null;
        },
        openSigninPop(){
            this.closePopup();
            this.openPopup('signin');
        },
        openSignupPop(){
            this.closePopup();
            this.openPopup('signup');
        }
    },
});