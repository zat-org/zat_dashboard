import md from "markdown-it";
export default defineNuxtPlugin((nuxtApp) => {
  const renderer = md();
  return {
    provide: {
      mdRenderer: renderer,
    },
  };
});
