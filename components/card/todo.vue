<script setup lang="ts">
import type { ContextMenuItem, TableColumn } from '@nuxt/ui'
import type { Todo, User } from '~/types'

const props = defineProps<{
  todo: Todo
}>()

const todoStore = useTodoStore()

const UAvatar = resolveComponent('UAvatar')
const removeModalIsOpen = ref<boolean>(false)

const columns: TableColumn<User>[] = [
  {
    accessorKey: 'photo',
    header: 'Avatar',
    cell: ({ row }) => {
      const avatar = h(UAvatar, {
        src: row.original.photo,
        alt: row.original.name,
        size: 'sm',
      })
      return h('div', { class: 'flex justify-center items-center w-full' }, avatar)
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
  },
]

const items = computed<ContextMenuItem[]>(() => [
  {
    label: !props.todo.completed ? 'Mark as completed' : 'Mark as incomplete',
    icon: !props.todo.completed ? 'lucide:check' : 'lucide:x',
    onSelect: () => {
      todoStore.toggleComplete(props.todo.id)
    },
  },
  {
    label: 'Remove',
    icon: 'lucide:trash',
    onSelect: () => {
      removeModalIsOpen.value = true
    },
  },
  {
    label: 'Update',
    icon: 'lucide:pencil',
    disabled: true,
  },
])
</script>

<template>
  <UContextMenu
    :items="items"
    :ui="{
      content: 'w-48',
    }"
  >
    <div
      class="rounded-lg transition-all duration-300 w-full flex relative"
      :class="{
        'hover:pl-4': todo.severity,
      }"
    >
      <div class="absolute left-1 -z-10 flex items-center h-full">
        <span v-if="todo.severity" class="relative flex size-2">
          <span :class="`absolute inline-flex h-full w-full animate-ping rounded-full bg-${getColorWithSeverity(todo.severity)}-500 opacity-75`" />
          <span :class="`relative inline-flex size-2 rounded-full bg-${getColorWithSeverity(todo.severity)}-500`" />
        </span>
      </div>
      <UBadge
        color="neutral"
        class="w-full flex justify-between"
        size="lg"
        variant="outline"
      >
        <div class="flex flex-row gap-2 w-full justify-between items-center">
          <span
            class="whitespace-nowrap"
            :class="{
              'line-through': todo.completed,
            }"
          >
            {{ todo.text }}
          </span>

          <div class="flex flex-row gap-2 items-center">
            <UPopover
              :content="{
                align: 'end',
                side: 'bottom',
                sideOffset: 8,
              }"
            >
              <UButton size="xs" color="neutral" variant="ghost">
                <UAvatarGroup
                  v-if="todo.responsibles.length > 0"
                >
                  <UAvatar
                    v-for="user in todo.responsibles"
                    :key="user.id"
                    :name="user.name"
                    :src="user.photo"
                    size="3xs"
                  />
                </UAvatarGroup>
              </UButton>

              <template #content>
                <UTable
                  :data="todo.responsibles"
                  :columns="columns"
                />
              </template>
              <UKbd> {{ formatDateReadable(todo.dueDate) }} </UKbd>
            </UPopover>
          </div>
        </div>
      </UBadge>
    </div>
  </UContextMenu>

  <UModal v-model:open="removeModalIsOpen" title="Selected task will be deleted" :description="todo.text" :ui="{ footer: 'justify-end' }">
    <template #footer>
      <UButton
        label="Cancel" color="neutral" variant="outline" @click="() => {
          removeModalIsOpen = false
        }"
      />
      <UButton
        label="Remove Todo" color="error" variant="outline" @click="() => {
          todoStore.remove(todo.id)
          removeModalIsOpen = false
        }"
      />
    </template>
  </UModal>
</template>
