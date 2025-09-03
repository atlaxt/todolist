import type { Todo } from '~/types'

export const useTodoStore = defineStore('todos', () => {
  const STORAGE_KEY = 'todos'

  const selectedTodo = ref<Todo>()
  const list = ref<Todo[]>([])

  function getList() {
    const data = localStorage.getItem(STORAGE_KEY)
    list.value = data ? JSON.parse(data) : []
  }

  function saveToLocal() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.value))
  }

  function add(todo: Todo) {
    list.value.push(todo)
    saveToLocal()
  }

  function remove(id: string) {
    list.value = list.value.filter(t => t.id !== id)
    saveToLocal()
  }

  function toggleComplete(id: string) {
    const todo = list.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
      saveToLocal()
    }
  }

  function update(updated: Todo) {
    const index = list.value.findIndex(t => t.id === updated.id)
    if (index !== -1) {
      list.value[index] = updated
      saveToLocal()
    }
  }

  const active = computed(() => list.value.filter(t => !t.completed))
  const completed = computed(() => list.value.filter(t => t.completed))

  return {
    selectedTodo,
    list,
    getList,
    add,
    remove,
    toggleComplete,
    update,
    active,
    completed,
  }
})
