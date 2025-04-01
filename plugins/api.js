export default defineNuxtPlugin((nuxtApp) => {
    const apiCall = async ({ url, method = "GET", data = null, headers = {}, params = {} }) => {
        console.log("Actual API Call:");
        try {
            const config = {
               method,
               mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    ...headers
                }
            };
            if (data) {
                config.body = JSON.stringify(data);
            }

            if (Object.keys(params).length) {
                const queryString = new URLSearchParams(params).toString();
                url += `?${queryString}`;
            }

            const response = await fetch(url, config);
            if (!response.ok) {
                return {
                    success: false,
                    message: `${response.statusText}`
                }
            }


            const contentType = response.headers.get("content-type");

            if (!contentType) {
                return null; // Return null for empty responses
            } else if (contentType.includes("application/json")) {
                return await response.json();
            } else if (contentType.includes("text/")) {
                return await response.text();
            } else {
                return await response.blob(); // For file downloads (optional)
            }



            /* return await response.json(); */
            /* return response.json(); */

        }
        catch (error) {

            const returnData = {};
            returnData.success = false;
            returnData.status = error.statusCode || 500;
            returnData.message = error.message;

            if(returnData.status==406){
                const errors = returnData.errors;
                returnData.message = errors[0];
            }
             
            return returnData;
        }
    };

    return {
        provide: {
            apiCall,
        },
    };

});