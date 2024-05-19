export default defineAppConfig({
    ui: {
        primary: 'cyan',
        gray: "cool",
        notifications: {
            // Show toasts at the top right of the screen
            position: 'top-0 bottom-auto'
          },
        card:{
            base: 'flex flex-col  grow border border-primary ',
            background: 'bg-transparent dark:bg-transparent',
            body: { base: 'flex flex-col gap-2 grow' },
        }
    },
})
