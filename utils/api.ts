/* const { $apiCall } = useNuxtApp(); */
const config = useRuntimeConfig();


export const apiCall = async (url: string, method = "GET", params = {}, body = null,headers: {} = {}) => {
    const { $apiCall } = useNuxtApp();
    
    const result = await $apiCall({
        url: url,
        method: method,
        params: params,
        data:body,
        headers:headers,
    });

    

    if(!result.success){
        return [];
    }
    return result.data;
};