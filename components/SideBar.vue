<template>
  <div dir="rtl">
    <!-- <USlideover v-model="sideNav.state"> -->
    <!-- <div class="flex justify-between gap-2 m-2" dir="rtl">
        <p class="text-primary">
          {{ user.name?.toString().toUpperCase() }}
        </p>
        <p>
          <UBadge size="lg">
            {{ user.role }}
          </UBadge>
        </p>
      </div> -->
    <UVerticalNavigation :links="links" dir="rtl" />
    <!-- </USlideover> -->
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import { useSidenavStore } from "~/store/sidenav";

const sideNav = useSidenavStore();
const user = useAuthStore();
const route = useRoute();

const links = [
  {
    label: "الصفحة الرئيسية",
    icon: "i-heroicons-home",
    to: "/",
    labelClass: "text-lg",
    click: sideNav.closeSideNav,
    activeClass: "text-cyan-500",
  },
  {
    label: "الوظائف",
    icon: "i-heroicons-briefcase",
    to: "/jobs",
    labelClass: "text-lg",
    click: sideNav.closeSideNav,
    activeClass: "text-cyan-500",
    exact: false,
  },
  {

    label: "المستخدمين",
    icon: "i-heroicons-users",
    to: "/users",
    click: sideNav.closeSideNav,
    labelClass: "",
    activeClass: "",
    exact: false,
  },
  {
    label: "الرسائل",
    icon: "i-heroicons-chat-bubble-bottom-center-text",
    to: "/messages",
    click: sideNav.closeSideNav,
    labelClass: "",
    activeClass: "",
    exact: false,
  },
  {
    label: "الاخبار",
    icon: "i-heroicons-newspaper",
    to: "/News",
    click: sideNav.closeSideNav,
    labelClass: "",
    activeClass: "",
    exact: false,
  },
  {
    label: " طلبات الحكام",
    icon: "i-heroicons-scale-solid",
    to: "/officiant",
    click: sideNav.closeSideNav,
    labelClass: "",
    activeClass: "",
    exact: false,
  },
  {
    label: "الشركاء",
    icon: "i-mdi-partnership",
    to: "/partner",
    click: sideNav.closeSideNav,
    labelClass: "",
    activeClass: "",
    exact: false,
  },
  {
    label: "اليوتيوب",
    icon: "i-mdi-youtube",
    to: "/youtube",
    click: sideNav.closeSideNav,
    labelClass: "",
    activeClass: "",
    exact: false,
  },
  {
    label: "اعلانات الصفحة الرئيسية",
    icon: "i-mdi-advertisements",
    to: "/HomeAds",
    click: sideNav.closeSideNav,
    labelClass: "",
    activeClass: "",
    exact: false,
  },
  {
    label: "social media",
    icon: "i-mdi-share",
    to: "/socialMedia",
    click: sideNav.closeSideNav,
    labelClass: "",
    activeClass: "",
    exact: false,
  },
  {
    label: "اللاعبين",
    icon: "i-mdi-user",
    to: "/player",
    click: sideNav.closeSideNav,
    labelClass: "",
    activeClass: "",
    exact: false,
  },
  {
    label: "الفرق",
    icon: "i-ri-team-fill",
    to: "/team",
    click: sideNav.closeSideNav,
    labelClass: "",
    activeClass: "",
    exact: false,
  },
];
</script>

<style></style>
