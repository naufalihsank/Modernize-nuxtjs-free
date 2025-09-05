<template>
  <NuxtExampleLayout >
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </NuxtExampleLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const loading = ref(false)
const router = useRouter()

router.beforeEach(() => {
  loading.value = true
})
router.afterEach(() => {
  setTimeout(() => loading.value = false, 200) // small delay
})
</script>