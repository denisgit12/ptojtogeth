const baseURL = "http://localhost:3100"

const urlsAuth ={
    auth:{
        login: '/auth/login',
        refresh : '/auth/refresh',
        forgotPassword: `/auth/forgot/password`,
        addPassword : '/auth/activate',
    }
};

const urlsOrders ={
    orders:{
        getAll: '/orders',
        getExel: '/orders/excel',
    getAllComments:(id)=> `/orders/${id}/comments`,
        postComments:(id)=> `/orders/${id}/comment`,
        updateOrder:(id)=> `/orders/${id}`,
        getOne:(id)=> `/orders/${id}`,

    }

}
const urlsGroup = {
    group:{
        getAll: '/orders/groups',
        addGroup: '/orders/create/group'
    }
}
const urlsManager = {
    manager:{
        gerAll: '/managers',
        getStatistic:(id) => `/managers/${id}/statistic`,

        create: '/managers/create',
        update:(id)=> `/managers/${id}`,
        getByToken: `/managers/token`
    }
}
export {urlsAuth, urlsOrders, urlsGroup, urlsManager, baseURL}