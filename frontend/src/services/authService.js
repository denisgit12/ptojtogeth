import {baseURL, urlsAuth} from "../configs";
import {axiosService} from "./axiosService";

const accessToken = "access";
const refreshToken = "refresh";

const authService = {

    login: async function (data){
        const response = await axiosService.post(urlsAuth.auth.login, data);
        if (response.status === 200){
            this.setTokens(response.data)
        }
        return response;
    },

    refresh: async function() {

        const refreshTok = this.getRefreshToken();


        if (!refreshTok){
            throw new Error("Refresh token isn't exist")
        }

        const url = baseURL + '/auth/refresh';

       const response = await fetch(url, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': refreshTok
            },

        })
        const data = await response.json()
        this.setTokens(data);
        //     .then((response)=>{
        //     if (response.status === 200){
        //
        //         return response.json();
        //
        //     }else if (response.status === 401){
        //         error = response;
        //         console.log(response)
        //         return response.json();
        //     }
        // }).then((data)=> {
        //     console.log(error)
        //     // console.log(error?.status)
        //     if (error?.status === 200 || !error){
        //         console.log(12)
        //         this.setTokens(data)
        //     }if (error?.status === 401){
        //         console.log(11)
        //         return data
        //     }
            // return data;
        // })
        // const data = await axiosService.post('/auth/refresh' , {},{headers:{Authorization: refreshTok}});
        // if (response.status === 200){
        //     console.log(data)
        //     this.setTokens(data);
        //
        // } else if (response.statusText === 'Unauthorized') {
        //     this.deletesToken()
        //     history.replace('/')
        //     // this.setTokens(null)
        // }

    },


    setTokens:({tokenPair})=>{

        localStorage.setItem(accessToken, tokenPair.accessToken )
        localStorage.setItem(refreshToken,tokenPair.refreshToken )

    },
    getAccessToken:()=> localStorage.getItem(accessToken),
    getRefreshToken:()=> localStorage.getItem(refreshToken),

    deletesToken:()=>{
        localStorage.removeItem(accessToken)
        localStorage.removeItem(refreshToken)

    },
    deletesManagerLoc:()=>{
        localStorage.removeItem('manager');

    },
    isAuthenticated:()=> !!localStorage.getItem(accessToken),

    forgotPassword:(email)=> axiosService.post(urlsAuth.auth.forgotPassword, email),

    forgotPasswordPut:(token,password)=> axiosService.put(urlsAuth.auth.forgotPassword, { password},{params:{token}}),

    addPassword:(email)=> axiosService.post(urlsAuth.auth.addPassword, email),
    addPasswordPut:(token,password)=> axiosService.put(urlsAuth.auth.addPassword, { password},{params:{token}}),

}
export {
    authService
}