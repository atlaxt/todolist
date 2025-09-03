<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui'
import type { User } from '~/types'

import { h, resolveComponent } from 'vue'

const props = defineProps<{
  modelValue?: User[]
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', users: User[]): void
}>()

const UCheckbox = resolveComponent('UCheckbox')
const UAvatar = resolveComponent('UAvatar')
const userStore = useUserStore()

const rowSelection = ref<Record<string, boolean>>({ 0: true, 1: true })

watch(rowSelection, (nw) => {
  const selectedUsers = Object.entries(nw)
    .filter(([, isSelected]) => isSelected)
    .map(([id]) => userStore.users[Number(id)])
    .filter(Boolean) as User[]
  emit('update:modelValue', selectedUsers)
}, { immediate: true })

const columns: TableColumn<User>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(UCheckbox, {
        'modelValue': table.getIsSomePageRowsSelected()
          ? 'indeterminate'
          : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
          table.toggleAllPageRowsSelected(!!value),
        'aria-label': 'Select all',
        'color': 'neutral',
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        'modelValue': row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
        'aria-label': 'Select row',
        'color': 'neutral',
      }),
  },
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

function onSelect(row: TableRow<User>, _e?: Event) {
  row.toggleSelected(!row.getIsSelected())
}
</script>

<template>
  <UPopover
    :content="{
      align: 'end',
      side: 'bottom',
      sideOffset: 8,
    }"
  >
    <UButton
      :icon="props.modelValue?.length === 0 ? 'lucide:user' : ''"
      color="neutral"
      :variant="props.modelValue?.length === 0 ? 'soft' : 'solid'"
      class="transition-all duration-300"
    >
      <template #default>
        <UAvatarGroup v-if="props.modelValue?.length !== 0">
          <UAvatar
            v-for="(user, index) in props.modelValue"
            :key="index"
            size="2xs"
            :src="user.photo"
            :alt="user.name"
          />
        </UAvatarGroup>
      </template>
    </UButton>

    <template #content>
      <UTable
        v-model:row-selection="rowSelection"
        :data="userStore.users"
        :columns="columns"
        @select="onSelect"
      />
    </template>
  </UPopover>
</template>
