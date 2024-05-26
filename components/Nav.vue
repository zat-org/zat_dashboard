<template>
  <div>
    <UHorizontalNavigation :links="links" />
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import { useSidenavStore } from "~/store/sidenav";

// want to make computed depend on is auth in store
const authApi = useAuth();
const logoutREQ = await authApi.logout();

const router = useRouter();
const authStore = useAuthStore();
const sideNav = useSidenavStore();
const VisitsApi = useVisits();
// const authenticatd = storeToRefs(useAuthStore())
const visits = await VisitsApi.getVisits();
// console.log(authStore.user)
const logout = async () => {
  await logoutREQ.execute();
  router.push("/");
};

const resfreshVisits = ()=>{
  refreshNuxtData("getVisits")
}
let visit_link = [
  {
    label: `${visits.data.value} زياره `,
    labelClass: "text-lg md:text-2xl px-2",
    icon: "i-heroicons-eye",
    iconClass: "text-lg md:text-2xl ",
    to: null,
    click:resfreshVisits
  },
];


const links = computed(() => {
  let nav_links = [
  [
    {
      label: authStore.user ? "" : "زات",
      labelClass: "text-lg md:text-2xl px-2",
      icon: "i-heroicons-home",
      iconClass: "text-lg md:text-2xl ",
      to: authStore.user ? null : "/",
      click: authStore.user ? sideNav.toogleSideNav : null,
    },
  ],
  [
    {
      label:
      authStore.user ? "تسجيل الخروج" : "تسجيل الدخول",
      labelClass: "text-lg md:text-2xl px-2",
      iconClass: "text-lg md:text-2xl ",
      icon: "i-heroicons-user-circle-solid",
      click: authStore.user ? logout : null,
      to:authStore.user ? "/login" : "/login",
    },
  ],
];
if(authStore.user){
  nav_links.splice(1, 0, visit_link);
  // console.log(visits.data.value)
}
return nav_links
});
</script>

<style></style>
