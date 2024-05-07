<template>
  <div dir="rtl">
    <USlideover v-model="sideNav.state">
      <div class="flex justify-between gap-2 m-2" dir="rtl">
        <p class="text-primary">
          {{ user.name?.toString().toUpperCase() }}
        </p>
        <p>
          <UBadge size="lg">
            {{ user.role }}
          </UBadge>
        </p>
      </div>
      <UVerticalNavigation :links="links" dir="rtl" />
    </USlideover>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import { useSidenavStore } from "~/store/sidenav";

const sideNav = useSidenavStore();
const user = useAuthStore();

// links we have main page link /
const userslink = {
  label: "المستخدمين",
  icon: "i-heroicons-users",
  to: "/users",
  click: sideNav.closeSideNav,
  labelClass: "",
  activeClass: "",
};
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
  },
];

if (user.role == "Super") {
  links.push(userslink);
}
links.push({
  label: "الرسائل",
  icon: "i-heroicons-chat-bubble-bottom-center-text",
  to: "/messages",
  click: sideNav.closeSideNav,
  labelClass:"",
  activeClass:""
});
links.push({
  label: "الاخبار",
  icon: "i-heroicons-newspaper",
  to: "/News",
  click: sideNav.closeSideNav,
  labelClass:"",
  activeClass:""
});
</script>

<style></style>
