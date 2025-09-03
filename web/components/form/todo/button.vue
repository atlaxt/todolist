<script setup lang="ts">
const todoStore = useTodoStore()
const appStore = useAppStore()

const stats = computed(() => {
  const total = todoStore.list.length
  const completed = todoStore.completed.length
  const today = new Date().toISOString().split('T')[0]

  const dueToday = todoStore.list.filter(t => t.dueDate.startsWith(today)).length
  const highSeverity = todoStore.list.filter(t => t.severity === 'high').length

  return `Total: ${total}, Completed: ${completed}, Due Today: ${dueToday}, High Priority: ${highSeverity}`
})
</script>

<template>
  <div class="flex w-full justify-between gap-2">
    <UBadge color="neutral" variant="soft" class="w-full">
      {{ stats }}
    </UBadge>
    <UButton color="neutral" variant="soft" @click="appStore.isClickNewTodoButton = !appStore.isClickNewTodoButton">
      <UIcon
        name="heroicons:x-mark"
        class="text-lg transition-all duration-300 font-bold"
        :class="{
          'rotate-225 text-green-500': !appStore.isClickNewTodoButton,
          'rotate-0 text-red-500': appStore.isClickNewTodoButton,
        }"
      />
    </UButton>
  </div>
</template>
