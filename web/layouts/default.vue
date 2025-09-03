<script setup lang="ts">
</script>

<template>
  <div class="fixed left-0 top-0 w-screen h-dvh">
    <ToggleTheme class="absolute right-0 m-2" />
    <div class="w-3xl mx-auto mt-12 flex flex-col">
      <header class="items-center w-full flex justify-between">
        <div class="flex flex-row gap-2 items-center">
          <Icon name="simple-icons:todoist" class="text-2xl" />
          <h1> {{ "TODO APP" }} </h1>
        </div>
        <a href="https://github.com/atlaxt" target="_blank">
          <Icon class="text-xl" name="mdi:github" />
        </a>
      </header>
      <slot />
    </div>

    <!-- <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div class="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr dark:from-neutral-100 from-neutral-900 dark:to-neutral-100 to-neutral-900 opacity-10 sm:left-[calc(50%-30rem)] sm:w-288.75" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>

    <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
      <div class="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr dark:from-neutral-100 from-neutral-900 dark:to-neutral-100 to-neutral-900 opacity-10 sm:left-[calc(50%+36rem)] sm:w-288.75" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div> -->
  </div>
</template>
