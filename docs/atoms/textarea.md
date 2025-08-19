# Atomic Textarea

The **Atomic Textarea** is your go-to component for multi-line text input—perfect for comments, feedback forms, message composition, and any scenario where users need to express themselves beyond a single line. This isn't just a bigger input field; it's a thoughtfully crafted component that handles text overflow, provides intelligent auto-resizing, and maintains accessibility standards while giving users the space they need to communicate.

Unlike single-line inputs, textareas deal with the unique challenges of multi-line content: How much space should it take initially? Should it grow as users type? How do you handle long content gracefully? This atomic component solves these problems with smart defaults while staying flexible enough to adapt to your specific use cases.

::: code-group

```tsx [React]
import { forwardRef, useCallback, useEffect, useRef } from "react";
import type { TextareaHTMLAttributes, ChangeEvent } from "react";

/**
 * Accessible Textarea component props.
 * Extends all standard HTML `<textarea>` attributes.
 */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Enable automatic height adjustment based on content
   */
  autoResize?: boolean;

  /**
   * Minimum height in rows when auto-resizing
   */
  minRows?: number;

  /**
   * Maximum height in rows when auto-resizing
   */
  maxRows?: number;

  /**
   * Character count limit
   */
  maxLength?: number;

  /**
   * Show character count indicator
   */
  showCharCount?: boolean;

  /**
   * Resize behavior
   */
  resize?: "none" | "both" | "horizontal" | "vertical";

  /**
   * Validation state
   */
  "aria-invalid"?: boolean;

  /**
   * Error message association
   */
  "aria-describedby"?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const {
      autoResize = false,
      minRows = 3,
      maxRows = 10,
      showCharCount = false,
      resize = "vertical",
      disabled = false,
      readOnly = false,
      className,
      style,
      onChange,
      ...rest
    } = props;

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const combinedRef = useCallback((node: HTMLTextAreaElement) => {
      textareaRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }, [ref]);

    // Auto-resize functionality
    const adjustHeight = useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea || !autoResize) return;

      // Reset height to get accurate scrollHeight
      textarea.style.height = 'auto';
      
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20;
      const minHeight = minRows * lineHeight;
      const maxHeight = maxRows * lineHeight;
      
      const scrollHeight = textarea.scrollHeight;
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      
      textarea.style.height = `${newHeight}px`;
    }, [autoResize, minRows, maxRows]);

    // Handle change with auto-resize
    const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        adjustHeight();
      }
      onChange?.(event);
    }, [onChange, autoResize, adjustHeight]);

    // Adjust height on mount and when content changes
    useEffect(() => {
      if (autoResize) {
        adjustHeight();
      }
    }, [adjustHeight, rest.value, rest.defaultValue]);

    const textareaStyle = {
      ...style,
      resize: autoResize ? 'none' : resize,
      minHeight: autoResize ? `${minRows * 1.5}em` : undefined,
      maxHeight: autoResize ? `${maxRows * 1.5}em` : undefined,
    };

    return (
      <div className="textarea-container">
        <textarea
          ref={combinedRef}
          disabled={disabled}
          readOnly={readOnly}
          className={className}
          style={textareaStyle}
          onChange={handleChange}
          {...rest}
        />
        {showCharCount && rest.maxLength && (
          <div className="char-count" aria-live="polite">
            {(rest.value?.toString().length || rest.defaultValue?.toString().length || 0)} / {rest.maxLength}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;

// Usage Examples:
// <Textarea placeholder="Share your thoughts..." />
// <Textarea autoResize minRows={2} maxRows={8} />
// <Textarea maxLength={500} showCharCount />
// <Textarea resize="none" rows={5} />
```

```vue [Vue]
<template>
  <div class="textarea-container">
    <textarea
      ref="textareaRef"
      :disabled="disabled"
      :readonly="readOnly"
      :class="textareaClass"
      :style="textareaStyle"
      v-bind="$attrs"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    
    <div
      v-if="showCharCount && maxLength"
      class="char-count"
      aria-live="polite"
    >
      {{ currentLength }} / {{ maxLength }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, watch } from 'vue';

/**
 * Props for the Atomic Textarea component.
 * Supports auto-resizing, character counting, and full accessibility.
 */
interface TextareaProps {
  /**
   * Enable automatic height adjustment based on content
   */
  autoResize?: boolean;

  /**
   * Minimum height in rows when auto-resizing
   */
  minRows?: number;

  /**
   * Maximum height in rows when auto-resizing
   */
  maxRows?: number;

  /**
   * Character count limit
   */
  maxLength?: number;

  /**
   * Show character count indicator
   */
  showCharCount?: boolean;

  /**
   * Resize behavior
   */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Read-only state
   */
  readOnly?: boolean;

  /**
   * Model value for v-model support
   */
  modelValue?: string;

  /**
   * Additional CSS classes
   */
  class?: string;
}

const props = withDefaults(defineProps<TextareaProps>(), {
  autoResize: false,
  minRows: 3,
  maxRows: 10,
  showCharCount: false,
  resize: 'vertical',
  disabled: false,
  readOnly: false,
  modelValue: '',
});

// Emit events
const emit = defineEmits<{
  'update:modelValue': [value: string];
  input: [event: Event];
  change: [event: Event];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

// Local refs
const textareaRef = ref<HTMLTextAreaElement>();

// Computed properties
const currentLength = computed(() => props.modelValue?.length || 0);

const textareaClass = computed(() => {
  const classes = [props.class];
  return classes.filter(Boolean).join(' ');
});

const textareaStyle = computed(() => ({
  resize: props.autoResize ? 'none' : props.resize,
  minHeight: props.autoResize ? `${props.minRows * 1.5}em` : undefined,
  maxHeight: props.autoResize ? `${props.maxRows * 1.5}em` : undefined,
}));

// Auto-resize functionality
const adjustHeight = async () => {
  if (!props.autoResize || !textareaRef.value) return;

  await nextTick();
  
  const textarea = textareaRef.value;
  
  // Reset height to get accurate scrollHeight
  textarea.style.height = 'auto';
  
  const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20;
  const minHeight = props.minRows * lineHeight;
  const maxHeight = props.maxRows * lineHeight;
  
  const scrollHeight = textarea.scrollHeight;
  const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
  
  textarea.style.height = `${newHeight}px`;
};

// Event handlers
const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
  emit('input', event);
  
  if (props.autoResize) {
    adjustHeight();
  }
};

const handleChange = (event: Event) => emit('change', event);
const handleFocus = (event: FocusEvent) => emit('focus', event);
const handleBlur = (event: FocusEvent) => emit('blur', event);

// Watch for external value changes
watch(() => props.modelValue, () => {
  if (props.autoResize) {
    adjustHeight();
  }
});

// Adjust height on mount
onMounted(() => {
  if (props.autoResize) {
    adjustHeight();
  }
});

// Expose ref for parent access
defineExpose({ textareaRef });
</script>

<style scoped>
.textarea-container {
  position: relative;
}

.char-count {
  font-size: 0.875em;
  color: #6b7280;
  text-align: right;
  margin-top: 0.25rem;
}
</style>

<!-- 
Usage Examples:
<Textarea placeholder="Share your thoughts..." />
<Textarea :auto-resize="true" :min-rows="2" :max-rows="8" />
<Textarea :max-length="500" :show-char-count="true" v-model="message" />
<Textarea resize="none" :rows="5" />
-->
```

:::

## Key Features

### **📏 Smart Auto-Resize**
Automatically adjusts height based on content with configurable minimum and maximum boundaries. No more scrolling in tiny text boxes or wasted vertical space.

### **🔢 Character Counting**
Built-in character count display with live updates and accessibility announcements. Helps users stay within limits without guessing.

### **⌨️ Keyboard Optimized**
Handles multi-line input gracefully with proper tab navigation, Enter key behavior, and text selection management.

### **♿ Accessibility Complete**
Full ARIA support including live regions for character counts, proper labeling, and screen reader compatibility for validation states.

### **🎛️ Flexible Resize Control**
Configure resize behavior—allow vertical resizing, disable it entirely, or let users resize in both directions based on your design needs.

## Common Use Cases

```jsx
// Auto-resizing comment box
<Textarea 
  placeholder="Add a comment..." 
  autoResize 
  minRows={2} 
  maxRows={6}
/>

// Feedback form with character limit
<Textarea 
  placeholder="Tell us about your experience"
  maxLength={500}
  showCharCount
  rows={4}
/>

// Message composition
<Textarea 
  placeholder="Type your message..."
  autoResize
  minRows={3}
  maxRows={12}
  aria-label="Message content"
/>

// Fixed-size notes field
<Textarea 
  placeholder="Additional notes"
  rows={3}
  resize="none"
/>

// Validation with error states
<Textarea 
  aria-invalid={hasError}
  aria-describedby="message-error"
  placeholder="Your message"
/>
```

## Auto-Resize Patterns

```jsx
// Minimal growing textarea
<Textarea autoResize minRows={1} maxRows={5} />

// Generous space for long content
<Textarea autoResize minRows={4} maxRows={20} />

// Controlled growth for constrained layouts
<Textarea autoResize minRows={2} maxRows={4} />
```

## Character Limit Patterns

```jsx
// Social media style with count
<Textarea 
  placeholder="What's on your mind?"
  maxLength={280}
  showCharCount
  autoResize
/>

// Form field with generous limit
<Textarea 
  placeholder="Describe your project"
  maxLength={1000}
  showCharCount
  rows={6}
/>
```

## Accessibility Best Practices

- **Label Association**: Always pair with a `<label>` or use `aria-label`
- **Error States**: Use `aria-invalid` and `aria-describedby` for validation feedback
- **Character Limits**: Announce character counts to screen readers with `aria-live`
- **Required Fields**: Use `required` attribute and proper labeling
- **Placeholder Text**: Keep placeholder text brief and descriptive

The Textarea atom gives users the space they need to express themselves while maintaining the structure and accessibility your forms require. Whether it's a quick comment or a lengthy essay, this component adapts to the content while keeping the experience smooth and accessible.