<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 className="text-3xl font-bold underline text-red-500">
      {{ msg }}
    </h1>
    <div className="text-3xl demo">
          <span className="icon-[vscode-icons--file-type-access] hover:icon-hover-[vscode-icons--file-type-access2]"></span>
          <span className="icon-[vscode-icons--file-type-vue]"></span>
          <span className="icon-[cestc--file]"></span>
        </div>

    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
