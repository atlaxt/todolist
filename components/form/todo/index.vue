<script setup lang="ts">
import type { Severity, User } from '~/types'
import { CalendarDate } from '@internationalized/date'

const userStore = useUserStore()
const todoStore = useTodoStore()
const appStore = useAppStore()

const todo = ref<string>()
const severity = ref<Severity>('low')
const responsibles = ref<User[]>(userStore.users)
const newDueDate = shallowRef(new CalendarDate(2025, 8, 12))

function refreshForm() {
  todo.value = undefined
  severity.value = undefined
  responsibles.value = userStore.users
  newDueDate.value = new CalendarDate(2025, 8, 12)
}

function saveTodo() {
  if (!todo.value)
    return

  todoStore.add({
    id: Date.now().toString(),
    text: todo.value,
    completed: false,
    date: new Date().toISOString(),
    dueDate: newDueDate.value.toString(),
    responsibles: responsibles.value,
    severity: severity.value ?? undefined,
  })

  refreshForm()
  appStore.isClickNewTodoButton = false
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <FormTodoButton />
    <Transition>
      <div v-if="appStore.isClickNewTodoButton" class="flex flex-col w-full gap-2">
        <div class="flex flex-row w-full gap-2">
          <UInput
            v-model="todo"
            class="w-full"
          />
          <UButton
            :disabled="!todo"
            color="neutral"
            class="px-[8px]"
            icon="lucide:check"
            @click="saveTodo"
          />
          <!-- {{ isUpdateMode }} -->
        </div>
        <div class="flex w-full justify-between gap-2 items-center">
          <div class="flex flex-row gap-1">
            <FormSeverity v-model="severity" />
          </div>
          <div class="flex flex-row items-center gap-2">
            <FormDate v-model="newDueDate" />
            <FormResponsibles v-model="responsibles" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-5px);

}
</style>
