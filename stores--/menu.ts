import {defineStore} from 'pinia';

export const useMenuStore = defineStore('menuStore',{
    state:()=>({
        menuData:[],
        categoryData:[],
    }),
    actions:{
        setMenuData(data:[]){
            this.menuData = data;
        },
        getMenuData(){
            return this.menuData ? this.menuData : [];
        },
        setCategoryData(data:[]){
            this.categoryData = data;
        },
        getCategoryData(){
            return this.categoryData ? this.categoryData : [];
        }
    },
});