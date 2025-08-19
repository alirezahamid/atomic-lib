<template>
  <button 
    @click="increment" 
    :style="{ 
      padding: '8px 16px', 
      background: '#3b82f6', 
      color: 'white', 
      border: 'none', 
      borderRadius: '4px',
      cursor: 'pointer'
    }"
  >
    Simple Button (clicked {{ count }} times)
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const increment = () => {
  count.value++
}
</script>