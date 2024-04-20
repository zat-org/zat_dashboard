import { defineStore } from 'pinia'
import type { AdminUser } from '~/models/adminUser'

export const useAdminUsersStore = defineStore("myAdminUsersStore", () => {

  const users = ref<AdminUser[]>()
  const selected_user = ref<AdminUser | null>()

  const select_user = (user: AdminUser) => {
    selected_user.value = user
  }
  const clear_user = () => {
    selected_user.value = null
  }
  // const intializeAdmins = computed(async () => {
  //   const _users = await adminApi.getAllAdmins()
    
  //   // await _users.execute()
  //   users.value = await _users.data.value?.data
  //   return _users.pending
  // })
 
  const isUserSelected = computed(() => { if (selected_user.value) { return true } else { return false } })

  return { users, selected_user, select_user, isUserSelected,clear_user }

})
