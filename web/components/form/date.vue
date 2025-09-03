<script setup lang="ts">
import type { CalendarDate, DateValue } from '@internationalized/date'
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'

const props = defineProps<{
  modelValue?: CalendarDate
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', date: DateValue | DateValue[] | null | undefined): void
}>()
const df = new DateFormatter('en-US', {
  dateStyle: 'medium',
})
</script>

<template>
  <UPopover>
    <UButton
      icon="lucide:calendar"
      color="neutral"
      :variant="props.modelValue ? 'soft' : 'link'"
      label="Due Date"
    >
      <template #trailing>
        {{ props.modelValue ? df.format(props.modelValue.toDate(getLocalTimeZone())) : 'Select a date' }}
      </template>
    </UButton>

    <template #content>
      <UCalendar
        :model-value="props.modelValue" color="neutral" class="p-2"
        @update:model-value="(nw) => {
          if (nw && typeof nw === 'object' && 'start' in nw && 'end' in nw) {
            emit('update:modelValue', nw.start)
          }
          else {
            emit('update:modelValue', nw)
          }
        }"
      />
    </template>
  </UPopover>
</template>
