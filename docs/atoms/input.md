# Atomic Input

The **Atomic Input** is your go-to form field component that handles every input type HTML has to offer—from simple text fields to color pickers, date selectors, and file uploads. Built with accessibility at its core, this atom automatically inherits all native HTML input attributes and ARIA properties, giving you bulletproof form controls that work seamlessly across frameworks.

Think of it as the Swiss Army knife of user input: one component that adapts to whatever data you need to collect, whether that's an email address, a phone number, or even a slider for adjusting volume. No matter which input type you choose, you get consistent validation, error handling, and keyboard navigation out of the box.

::: code-group

```tsx [React]
import { forwardRef } from "react";
import type { InputHTMLAttributes, AriaAttributes } from "react";

/**
 * Comprehensive Input component props.
 * Extends all standard HTML `<input>` attributes and ARIA attributes.
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input type - supports all modern HTML input types
   */
  type?: 
    | "text" | "email" | "password" | "number" | "tel" | "url" | "search"
    | "date" | "time" | "datetime-local" | "month" | "week" 
    | "color" | "range" | "file" | "hidden" | "checkbox" | "radio"
    | "submit" | "reset" | "button" | "image";

  /**
   * Input mode hint for virtual keyboards
   */
  inputMode?: "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";

  /**
   * Auto-complete behavior hint
   */
  autoComplete?: string;

  /**
   * Validation state indicator
   */
  "aria-invalid"?: AriaAttributes["aria-invalid"];

  /**
   * Error message association
   */
  "aria-describedby"?: AriaAttributes["aria-describedby"];

  /**
   * Required field indicator
   */
  "aria-required"?: AriaAttributes["aria-required"];
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      type = "text",
      disabled = false,
      readOnly = false,
      required = false,
      className,
      // Capture all other props including data-*, aria-*, event handlers
      ...rest
    } = props;

    return (
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        className={className}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;

// Usage Examples:
// <Input type="email" placeholder="your@email.com" required />
// <Input type="password" aria-describedby="pwd-help" />
// <Input type="range" min="0" max="100" step="5" />
// <Input type="date" value="2024-01-01" />
```

```vue [Vue]
<template>
  <input
    ref="inputRef"
    :type="type"
    :disabled="disabled"
    :readonly="readOnly"
    :required="required"
    v-bind="$attrs"
    @input="handleInput"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { AriaAttributes } from 'vue';

/**
 * Props for the Atomic Input component.
 * Supports all HTML input types with proper TypeScript validation.
 */
interface InputProps {
  /**
   * Input type - supports all modern HTML input types
   */
  type?: 
    | 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
    | 'date' | 'time' | 'datetime-local' | 'month' | 'week'
    | 'color' | 'range' | 'file' | 'hidden' | 'checkbox' | 'radio'
    | 'submit' | 'reset' | 'button' | 'image';

  /**
   * Input mode hint for virtual keyboards
   */
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Read-only state
   */
  readOnly?: boolean;

  /**
   * Required field indicator
   */
  required?: boolean;

  /**
   * Validation state
   */
  'aria-invalid'?: AriaAttributes['aria-invalid'];

  /**
   * Error message association
   */
  'aria-describedby'?: AriaAttributes['aria-describedby'];

  /**
   * Required field indicator for screen readers
   */
  'aria-required'?: AriaAttributes['aria-required'];
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  readOnly: false,
  required: false,
});

// Emit all standard input events
const emit = defineEmits<{
  input: [event: Event];
  change: [event: Event];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

// Local ref to the input element
const inputRef = ref<HTMLInputElement>();

// Event handlers that forward to parent
const handleInput = (event: Event) => emit('input', event);
const handleChange = (event: Event) => emit('change', event);
const handleFocus = (event: FocusEvent) => emit('focus', event);
const handleBlur = (event: FocusEvent) => emit('blur', event);

// Expose ref for parent access
defineExpose({ inputRef });
</script>

<!-- 
Usage Examples:
<Input type="email" placeholder="your@email.com" :required="true" />
<Input type="password" aria-describedby="pwd-help" />
<Input type="range" :min="0" :max="100" :step="5" />
<Input type="date" value="2024-01-01" />
-->
```

:::

## Key Features

### **🎯 Universal Input Types**
Supports every HTML input type from basic text fields to specialized controls like color pickers and file uploads. One component, infinite possibilities.

### **♿ Accessibility First**
Built-in ARIA support, proper keyboard navigation, and screen reader compatibility. Every input automatically gets the semantic markup assistive technologies expect.

### **📱 Mobile Optimized**
Smart `inputMode` support triggers the right virtual keyboard on mobile devices—numeric keypads for numbers, email keyboards for email fields.

### **🔧 Validation Ready**
Seamless integration with HTML5 validation and custom error states via `aria-invalid` and `aria-describedby` attributes.

### **🎨 Style Agnostic**
Zero default styling means this atom adapts to any design system. Bring your own CSS, design tokens, or component library styles.

## Common Use Cases

```jsx
// Email subscription
<Input 
  type="email" 
  placeholder="Enter your email" 
  required 
  aria-describedby="email-help"
/>

// Password with validation feedback
<Input 
  type="password"
  aria-invalid={hasError}
  aria-describedby="pwd-error"
/>

// Number input with constraints
<Input 
  type="number"
  min="1"
  max="100"
  step="1"
  inputMode="numeric"
/>

// File upload
<Input 
  type="file"
  accept="image/*"
  multiple
/>

// Search with debouncing
<Input 
  type="search"
  placeholder="Search products..."
  inputMode="search"
/>
```

## Accessibility Notes

- **Labels**: Always pair with a `<label>` element or use `aria-label`
- **Validation**: Use `aria-invalid` and `aria-describedby` for error states
- **Required Fields**: Combine `required` attribute with `aria-required`
- **Input Mode**: Set `inputMode` for optimal mobile keyboard experience
- **Auto-complete**: Use `autoComplete` to help users fill forms faster

The Input atom handles the complexity of form controls so you can focus on creating great user experiences. Whether you're building a simple contact form or a complex data entry interface, this component has you covered.