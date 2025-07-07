<script setup lang="ts">
import type { Todo } from '~/types'

const todoStore = useTodoStore()

const _updatedTodo = ref<Todo>()

onMounted(() => {
  todoStore.getList()
})
</script>

<template>
  <NuxtLayout>
    <FormTodo class="mt-4" />
    <USeparator class="my-6" />
    <div class="space-y-2">
      <CardTodo
        v-for="(todo, key) in todoStore.list"
        :key :todo
      />
    </div>
  </NuxtLayout>
</template>
