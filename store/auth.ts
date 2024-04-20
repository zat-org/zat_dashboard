import type { user } from "~/models/auth";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from 'jwt-decode'
interface CustomJwtPayload extends JwtPayload {
    [key: string]: string | string[] | number | undefined; // Define index signature
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref()
    const isauth = computed(() => {

        return !(user.value == null || undefined)
    })
    const role = computed(() => {
        if (user) {
            const decoded = jwtDecode(user.value) as CustomJwtPayload
            return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        } else {
            return null
        }
    })
    const name = computed(() => {
        if (user) {
            const decoded = jwtDecode(user.value) as CustomJwtPayload
            return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
        } else {
            return null
        }
    })
    const token_data = computed(() => {
        const decoded = jwtDecode(user.value);
        console.log(decoded)
        return decoded

    })
    const login = (token: string) => {

        user.value = token

    }
    const logout = () => {
        user.value = null
    }
    return {
        user, isauth, login, logout, role, name
    }

}, {

    persist: true
}
) 