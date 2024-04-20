import { useAuthStore } from "~/store/auth"

export default defineNuxtRouteMiddleware((to, from) => {
// if it auth dont go to login again 
    const authStore = useAuthStore()


    if (authStore.isauth && to.name == "login") {


        return navigateTo('/')
    }


})
