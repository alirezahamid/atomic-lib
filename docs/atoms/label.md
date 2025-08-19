# Atomic Label

The **Atomic Label** is the unsung hero of accessible forms—a simple yet powerful component that creates the essential connection between form controls and their descriptions. While it might look like just text, this atom is doing heavy lifting behind the scenes, enabling screen readers to announce what each form field is for and allowing users to click labels to focus their associated inputs.

Think of labels as the translators of your form. They take the technical `<input type="email">` and tell users "This is where your email goes." Without proper labels, forms become mysterious puzzles that frustrate users and fail accessibility standards. This atomic component ensures every form field has a clear, semantic relationship with its description.

::: code-group

```tsx [React]
import { forwardRef } from "react";
import type { LabelHTMLAttributes, ReactNode } from "react";

/**
 * Accessible Label component props.
 * Extends all standard HTML `<label>` attributes.
 */
export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * The form control this label is associated with.
   * Can be the ID of the control or the control can be nested inside the label.
   */
  htmlFor?: string;

  /**
   * Visual indicator for required fields
   */
  required?: boolean;

  /**
   * Custom required indicator (defaults to "*")
   */
  requiredIndicator?: ReactNode;

  /**
   * Position of required indicator
   */
  requiredPosition?: "before" | "after";

  /**
   * Hide the label visually but keep it available to screen readers
   */
  srOnly?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (props, ref) => {
    const {
      htmlFor,
      required = false,
      requiredIndicator = " *",
      requiredPosition = "after",
      srOnly = false,
      className,
      children,
      ...rest
    } = props;

    // Screen reader only styling (if srOnly is true)
    const srOnlyClass = srOnly ? "sr-only" : "";
    const combinedClassName = [className, srOnlyClass].filter(Boolean).join(" ");

    const requiredElement = required ? (
      <span aria-label="required" className="required-indicator">
        {requiredIndicator}
      </span>
    ) : null;

    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={combinedClassName}
        {...rest}
      >
        {requiredPosition === "before" && requiredElement}
        {children}
        {requiredPosition === "after" && requiredElement}
      </label>
    );
  }
);

Label.displayName = "Label";

export default Label;

// Usage Examples:
// <Label htmlFor="email">Email Address</Label>
// <Label htmlFor="password" required>Password</Label>
// <Label required requiredIndicator="(required)" requiredPosition="before">
//   Full Name
// </Label>
// <Label srOnly htmlFor="search">Search products</Label>
```

```vue [Vue]
<template>
  <label
    ref="labelRef"
    :for="htmlFor"
    :class="labelClass"
    v-bind="$attrs"
  >
    <span
      v-if="required && requiredPosition === 'before'"
      class="required-indicator"
      aria-label="required"
    >
      {{ requiredIndicator }}
    </span>
    
    <slot />
    
    <span
      v-if="required && requiredPosition === 'after'"
      class="required-indicator"
      aria-label="required"
    >
      {{ requiredIndicator }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

/**
 * Props for the Atomic Label component.
 * Provides semantic labeling for form controls with accessibility features.
 */
interface LabelProps {
  /**
   * The form control this label is associated with.
   * Should match the ID of the target form control.
   */
  htmlFor?: string;

  /**
   * Visual indicator for required fields
   */
  required?: boolean;

  /**
   * Custom required indicator text/symbol
   */
  requiredIndicator?: string;

  /**
   * Position of the required indicator
   */
  requiredPosition?: 'before' | 'after';

  /**
   * Hide the label visually but keep it available to screen readers
   */
  srOnly?: boolean;

  /**
   * Additional CSS classes
   */
  class?: string;
}

const props = withDefaults(defineProps<LabelProps>(), {
  required: false,
  requiredIndicator: ' *',
  requiredPosition: 'after',
  srOnly: false,
});

// Local ref to the label element
const labelRef = ref<HTMLLabelElement>();

// Computed class with screen reader only styling
const labelClass = computed(() => {
  const classes = [props.class];
  if (props.srOnly) {
    classes.push('sr-only');
  }
  return classes.filter(Boolean).join(' ');
});

// Expose ref for parent access
defineExpose({ labelRef });
</script>

<style scoped>
/* Screen reader only utility - hide visually but keep accessible */
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
</style>

<!-- 
Usage Examples:
<Label html-for="email">Email Address</Label>
<Label html-for="password" :required="true">Password</Label>
<Label :required="true" required-indicator="(required)" required-position="before">
  Full Name
</Label>
<Label :sr-only="true" html-for="search">Search products</Label>
-->
```

:::

## Key Features

### **🔗 Semantic Association**
Creates proper programmatic relationships between labels and form controls via the `htmlFor` attribute, enabling screen readers to announce labels when users focus on inputs.

### **⚡ Click-to-Focus**
Users can click anywhere on the label text to focus the associated form control—a small UX detail that makes forms feel more responsive and intuitive.

### **📍 Required Field Indicators**
Built-in support for visually indicating required fields with customizable symbols and positioning, while maintaining screen reader compatibility.

### **👻 Screen Reader Only Option**
Sometimes you need labels for accessibility but not visual design. The `srOnly` prop hides labels visually while keeping them available to assistive technologies.

### **🎨 Flexible Styling**
Clean, semantic markup that works with any design system. Style the label text, required indicators, and states however your brand requires.

## Form Association Patterns

```jsx
// Explicit association (recommended)
<Label htmlFor="username">Username</Label>
<Input id="username" type="text" />

// Implicit association (label wraps input)
<Label>
  Email Address
  <Input type="email" />
</Label>

// Required field with custom indicator
<Label htmlFor="password" required requiredIndicator=" (required)">
  Password
</Label>

// Screen reader only label for icon buttons
<Label srOnly htmlFor="search-input">
  Search our products
</Label>
<Input id="search-input" type="search" />
```

## Required Field Patterns

```jsx
// Standard asterisk after label
<Label htmlFor="email" required>
  Email Address
</Label>

// Custom indicator before label
<Label 
  htmlFor="phone" 
  required 
  requiredIndicator="* " 
  requiredPosition="before"
>
  Phone Number
</Label>

// Descriptive text indicator
<Label 
  htmlFor="message" 
  required 
  requiredIndicator=" (required)"
>
  Message
</Label>
```

## Accessibility Best Practices

- **Always Use Labels**: Every form control should have an associated label
- **Unique Associations**: Each label should be associated with exactly one form control
- **Clear Language**: Use descriptive, jargon-free label text
- **Required Indicators**: Clearly mark required fields both visually and semantically
- **Context**: Provide additional context via `aria-describedby` when needed

The Label atom might seem simple, but it's fundamental to creating forms that work for everyone. It bridges the gap between visual design and semantic meaning, ensuring your forms are both beautiful and accessible.