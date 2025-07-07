<script setup lang="ts">
import type { Severity } from '~/types'

const props = defineProps<{
  modelValue: Severity
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', severity: Severity): void
}>()
const severityList: Severity[] = ['high', 'medium', 'low', undefined]
</script>

<template>
  <UButton
    v-for="(severity, key) in severityList.filter(s => s !== undefined)"
    :key
    class="uppercase"
    size="xs"
    :variant="props.modelValue !== severity ? 'link' : 'solid'"
    color="neutral"
    :label="severity"
    @click="() => {
      if (props.modelValue === severity)
        emit('update:modelValue', undefined)
      else
        emit('update:modelValue', severity)
    }"
  >
    <template #leading>
      <div
        class="h-2 w-2 rounded-full select-none"
        :class="{
          'bg-red-500': severity === 'high',
          'bg-yellow-500': severity === 'medium',
          'bg-green-500': severity === 'low',
        }"
      />
    </template>
  </UButton>
</template>
