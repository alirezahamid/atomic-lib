<template>
  <div class="button-playground">
    <div class="playground-preview">
      <div class="preview-container">
        <AtomicButton
          :type="config.type"
          :disabled="config.disabled"
          :variant="config.variant"
          :size="config.size"
          @click="handleButtonClick"
        >
          {{ config.text }}
        </AtomicButton>
      </div>
      
      <div class="click-feedback" v-if="clickCount > 0">
        🎉 Button clicked {{ clickCount }} time{{ clickCount !== 1 ? 's' : '' }}!
      </div>
    </div>

    <div class="playground-controls">
      <h4>🎛️ Interactive Controls</h4>
      
      <div class="control-group">
        <label class="control-label">
          <span class="label-text">Button Text</span>
          <input 
            type="text" 
            v-model="config.text"
            class="text-input"
            placeholder="Enter button text"
          />
        </label>
      </div>

      <div class="control-group">
        <label class="control-label">
          <span class="label-text">Variant</span>
          <select v-model="config.variant" class="select-input">
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="outline">Outline</option>
            <option value="ghost">Ghost</option>
          </select>
        </label>
      </div>

      <div class="control-group">
        <label class="control-label">
          <span class="label-text">Size</span>
          <select v-model="config.size" class="select-input">
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </label>
      </div>

      <div class="control-group">
        <label class="control-label">
          <span class="label-text">Type</span>
          <select v-model="config.type" class="select-input">
            <option value="button">Button</option>
            <option value="submit">Submit</option>
            <option value="reset">Reset</option>
          </select>
        </label>
      </div>

      <div class="control-group">
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            v-model="config.disabled"
            class="checkbox-input"
          />
          <span class="checkbox-text">Disabled</span>
        </label>
      </div>

      <div class="generated-code">
        <h5>📋 Generated Code</h5>
        <div class="code-tabs">
          <button 
            :class="['tab-button', { active: activeTab === 'react' }]"
            @click="activeTab = 'react'"
          >
            React
          </button>
          <button 
            :class="['tab-button', { active: activeTab === 'vue' }]"
            @click="activeTab = 'vue'"
          >
            Vue
          </button>
        </div>
        
        <div class="code-content">
          <pre v-if="activeTab === 'react'"><code>{{ reactCode }}</code></pre>
          <pre v-if="activeTab === 'vue'"><code>{{ vueCode }}</code></pre>
        </div>
        
        <button @click="copyCode" class="copy-button">
          {{ copied ? '✅ Copied!' : '📋 Copy Code' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import AtomicButton from './AtomicButton.vue'

// Reactive configuration
const config = ref({
  text: 'Click me!',
  variant: 'primary' as 'primary' | 'secondary' | 'outline' | 'ghost',
  size: 'md' as 'sm' | 'md' | 'lg',
  type: 'button' as 'button' | 'submit' | 'reset',
  disabled: false
})

// UI state
const clickCount = ref(0)
const activeTab = ref<'react' | 'vue'>('react')
const copied = ref(false)

// Generated code
const reactCode = computed(() => {
  const props = []
  
  if (config.value.type !== 'button') props.push(`type="${config.value.type}"`)
  if (config.value.variant !== 'primary') props.push(`variant="${config.value.variant}"`)
  if (config.value.size !== 'md') props.push(`size="${config.value.size}"`)
  if (config.value.disabled) props.push('disabled')
  
  const propsString = props.length > 0 ? ` ${props.join(' ')}` : ''
  
  return `<Button${propsString}>\n  ${config.value.text}\n</Button>`
})

const vueCode = computed(() => {
  const props = []
  
  if (config.value.type !== 'button') props.push(`type="${config.value.type}"`)
  if (config.value.variant !== 'primary') props.push(`variant="${config.value.variant}"`)
  if (config.value.size !== 'md') props.push(`size="${config.value.size}"`)
  if (config.value.disabled) props.push(':disabled="true"')
  
  const propsString = props.length > 0 ? ` ${props.join(' ')}` : ''
  
  return `<Button${propsString}>\n  ${config.value.text}\n</Button>`
})

// Event handlers
const handleButtonClick = () => {
  clickCount.value++
}

const copyCode = async () => {
  const code = activeTab.value === 'react' ? reactCode.value : vueCode.value
  
  try {
    await navigator.clipboard.writeText(code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy code:', err)
  }
}

// Reset copied state when switching tabs
watch(activeTab, () => {
  copied.value = false
})
</script>

<style scoped>
.button-playground {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fafafa;
}

.playground-preview {
  flex: 1;
  min-width: 250px;
}

.preview-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  background: white;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.click-feedback {
  text-align: center;
  color: #059669;
  font-weight: 500;
  margin-top: 0.5rem;
}

.playground-controls {
  flex: 1;
  min-width: 300px;
}

.playground-controls h4 {
  margin: 0 0 1rem 0;
  color: #374151;
  font-size: 1.125rem;
}

.control-group {
  margin-bottom: 1rem;
}

.control-label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label-text {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.text-input, .select-input {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
}

.text-input:focus, .select-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-input {
  width: 1rem;
  height: 1rem;
}

.checkbox-text {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.generated-code {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.generated-code h5 {
  margin: 0 0 0.75rem 0;
  color: #374151;
  font-size: 1rem;
}

.code-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.tab-button {
  padding: 0.375rem 0.75rem;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-button:hover {
  background: #f9fafb;
}

.tab-button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.code-content {
  background: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;
}

.code-content pre {
  margin: 0;
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.copy-button {
  padding: 0.375rem 0.75rem;
  background: #059669;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background 0.2s;
}

.copy-button:hover {
  background: #047857;
}

@media (max-width: 768px) {
  .button-playground {
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>