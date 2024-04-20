import { defineStore } from 'pinia'

export const useSidenavStore = defineStore('SidenavStore', () => {
  const state = ref<boolean>(false)

  const toogleSideNav = () => {
    state.value = !state.value
  }
  const openSideNav = () => {
    state.value = true

  }
  const closeSideNav = () => {
    state.value = false

  }

  return {state ,toogleSideNav ,openSideNav,closeSideNav}
})
