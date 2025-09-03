export const useAppStore = defineStore('app', () => {
  const isClickNewTodoButton = ref<boolean>(false)

  return {
    isClickNewTodoButton,
  }
})
