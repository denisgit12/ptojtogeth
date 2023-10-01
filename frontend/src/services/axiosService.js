import axios from "axios"
import {createBrowserHistory} from "history";

import {baseURL} from "../configs";
import {authService} from "./authService";

const axiosService = axios.create({baseURL});
const history = createBrowserHistory();

axiosService.interceptors.request.use((config)=>{
    if (authService.isAuthenticated()) {
        const token = authService.getAccessToken();

        config.headers.Authorization = `${token}`
    }
    return config
});



let isRefreshing = false;
const waitList = [];

axiosService.interceptors.response.use(config=>{
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true
                try {
                    await authService.refresh();
                    isRefreshing = false
                    afterRefresh()
                    return axiosService(originalRequest)
                } catch (e) {
                    authService.deletesToken();
                    authService.deletesManagerLoc();
                    isRefreshing = false
                    history.replace('/login?expSession=true')
                    // return Promise.reject(error)
                }
            }

            if (originalRequest.url === baseURL + '/auth/refresh') {
                return Promise.reject(error)
            }

            return new Promise(resolve => {
                subscribeToWaitList(() => resolve(axiosService(originalRequest)))
                // const myFunc = ()=>{
                //     resolve(axiosService(originalRequest))
                // }
                // subscribeToWaitList(myFunc)
            })

        }
        return Promise.reject(error)
    }
)
const subscribeToWaitList = (cb) => {
    waitList.push(cb)
}

const afterRefresh = () => {
    while (waitList.length) {
        const cb = waitList.pop();
        cb()
    }
}
export {
    axiosService,
    history
}