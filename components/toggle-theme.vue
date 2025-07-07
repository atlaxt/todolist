<script setup lang="ts">
const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <UButton
    v-if="mounted"
    variant="link"
    :icon="isDark ? 'lucide:sun' : 'lucide:moon'"
    @click="toggleTheme"
  />
</template>
