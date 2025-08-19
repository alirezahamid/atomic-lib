<template>
  <div class="button-demo">
    <div class="demo-section">
      <h4>Basic Button</h4>
      <AtomicButton>Default Button</AtomicButton>
    </div>

    <div class="demo-section">
      <h4>Button Variants</h4>
      <div class="button-group">
        <AtomicButton variant="primary">Primary</AtomicButton>
        <AtomicButton variant="secondary">Secondary</AtomicButton>
        <AtomicButton variant="outline">Outline</AtomicButton>
        <AtomicButton variant="ghost">Ghost</AtomicButton>
      </div>
    </div>

    <div class="demo-section">
      <h4>Button Sizes</h4>
      <div class="button-group">
        <AtomicButton size="sm">Small</AtomicButton>
        <AtomicButton size="md">Medium</AtomicButton>
        <AtomicButton size="lg">Large</AtomicButton>
      </div>
    </div>

    <div class="demo-section">
      <h4>Button States</h4>
      <div class="button-group">
        <AtomicButton>Normal</AtomicButton>
        <AtomicButton disabled>Disabled</AtomicButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AtomicButton from './AtomicButton.vue'
</script>

<style scoped>
.button-demo {
  padding: 1rem;
  space-y: 1.5rem;
}

.demo-section {
  margin-bottom: 1.5rem;
}

.demo-section h4 {
  margin: 0 0 0.75rem 0;
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
}

.button-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
}
</style>