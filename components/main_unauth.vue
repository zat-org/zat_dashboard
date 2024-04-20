<template>
    <!-- in case not log in -->
  
    <div class="h-full">
      <div class="px-4 md:px-20 flex flex-col justify-around gap-10 h-full">
        <div class="flex flex-col justify-around gap-10">
          <h4 class="md:text-4xl text-xl font-bold">
            انت <span class="text-cyan-500 text-5xl font-bold "  >المدير</span>
          </h4>
          <h1 class="md:text-5xl text-xl leading-10 md:font-bold font-bold">
            نقوم بتنظيم سلسلة من بطولات البلوت <br />
            وتقديم محتوى اخباري <br />
            تحليلي شامل و تطويري للعبة البلوت
          </h1>
          <h2
            class="text-lg md:text-2xl font-bold animated-text md:leading-[3.5rem]">
            لادارة المحتوي علي موقع ذات من <br />
            <span class="text-3xl"> </span>
          </h2>
        </div>
        <div>

          <UButton
          v-if="!authStore.isauth"
            class="text-xl md:text-2xl p-5 rounded-xl cursor-pointer"
            size="xl"
            to="/login"
            icon="i-heroicons-arrow-left-20-solid"
            trailing
            label="سجل الدخول الان">
            <!-- <template #trailing>
              <UIcon name="i-heroicons-arrow-left-20-solid" class="w-100 h-100" />
            </template> -->
          </UButton>
       
        </div>
      </div>
    </div>
  </template>
  <script setup lang="ts">
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore()

</script>
  <style scoped>
  .animated-text span {
    position: relative;
  }
  .animated-text span::before {
    content: "المباريات";
    color: rgb(21, 179, 179);
    animation: words 20s infinite;
  }
  .animated-text span::after {
    content: "";
    position: absolute;
    width: calc(100% + 8px);
    height: 80%;
    background: white;
    border-right: 4px solid rgb(21, 179, 179);
    left: -8px;
    animation: cursor 0.8s infinite, typing 20s steps(20) infinite;
    @apply dark:bg-[#121212];
  }
  @keyframes cursor {
    to {
      border-right: 2px solid transparent;
    }
  }
  @keyframes words {
    0%,
    20% {
      content: "المباريات";
    }
    21%,
    40% {
      content: "البطولات";
    }
    41%,
    60% {
      content: "الوظائف";
    }
    61%,
    80% {
      content: "الرسائل";
    }
    81%,
    100% {
      content: "التوقعات";
    }
  }
  @keyframes typing {
    10%,
    15%,
    30%,
    35%,
    50%,
    55%,
    70%,
    75%,
    90%,
    95% {
      width: 0;
    }
    5%,
    20%,
    25%,
    40%,
    45%,
    60%,
    65%,
    80%,
    85% {
      width: calc(100% + 8px);
    }
  }
  </style>
  