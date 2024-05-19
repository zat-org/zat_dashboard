<template>
  <div>
    <UHorizontalNavigation :links="links" />
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import { useSidenavStore } from "~/store/sidenav";

// want to make computed depend on is auth in store
const router = useRouter();
const authStore = useAuthStore();
const sideNav =useSidenavStore()
const VisitsApi  = useVisits()
// const authenticatd = storeToRefs(useAuthStore())
const visits = await VisitsApi.getVisits()
const logout = () => {
  authStore.logout();
  router.push("/");
};
const opentoogleside =()=>{}
const links = computed(()=> [
  [
    {
      label: authStore.isauth?"" :"زات",
      labelClass: "text-lg md:text-2xl px-2",
      icon: "i-heroicons-home",
      iconClass:"text-lg md:text-2xl ",
      to: authStore.isauth?null:"/",
      click:authStore.isauth?sideNav.toogleSideNav:null
    },
  ],
  [
    {
      label: `${visits.data.value?.data} زياره `,
      labelClass: "text-lg md:text-2xl px-2",
      icon: "i-heroicons-eye",
      iconClass:"text-lg md:text-2xl ",
      // to: authStore.isauth?null:"/",
      // click:authStore.isauth?sideNav.toogleSideNav:null
    },
  ],
  [
      {
        label: authStore.isauth? "تسجيل الخروج" : "تسجيل الدخول",
        labelClass: "text-lg md:text-2xl px-2",
      iconClass:"text-lg md:text-2xl ",
        icon: "i-heroicons-user-circle-solid" ,
        click:authStore.isauth? logout : null  ,
        to: authStore.isauth?"/login":"/login"
      },
    ]
])
</script>

<style></style>
