<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="buttonClasses"
    :aria-disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ children }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Button props matching the React implementation
 */
interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  disabled: false,
  variant: 'primary',
  size: 'md',
  children: 'Button'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => [
  'atomic-button',
  `atomic-button--${props.variant}`,
  `atomic-button--${props.size}`,
  {
    'atomic-button--disabled': props.disabled
  }
])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.atomic-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: 500;
  border: 1px solid transparent;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  outline: none;
  font-family: inherit;
}

.atomic-button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Size variants */
.atomic-button--sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.atomic-button--md {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
}

.atomic-button--lg {
  padding: 0.625rem 1.25rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

/* Variant styles */
.atomic-button--primary {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.atomic-button--primary:hover:not(.atomic-button--disabled) {
  background-color: #2563eb;
  border-color: #2563eb;
}

.atomic-button--secondary {
  background-color: #6b7280;
  color: white;
  border-color: #6b7280;
}

.atomic-button--secondary:hover:not(.atomic-button--disabled) {
  background-color: #4b5563;
  border-color: #4b5563;
}

.atomic-button--outline {
  background-color: transparent;
  color: #3b82f6;
  border-color: #3b82f6;
}

.atomic-button--outline:hover:not(.atomic-button--disabled) {
  background-color: #3b82f6;
  color: white;
}

.atomic-button--ghost {
  background-color: transparent;
  color: #374151;
  border-color: transparent;
}

.atomic-button--ghost:hover:not(.atomic-button--disabled) {
  background-color: #f3f4f6;
}

/* Disabled state */
.atomic-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
</style>