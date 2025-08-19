# Atomic Select

The **Atomic Select** is your essential dropdown component for presenting users with a curated list of choices. While it might seem straightforward, this atom handles the complex intersection of user experience, accessibility, and browser compatibility that makes dropdown menus work seamlessly across all devices and assistive technologies.

More than just a list of options, the Select atom deals with keyboard navigation, screen reader announcements, option grouping, and the delicate balance between native browser behavior and custom styling needs. It's the foundation for everything from simple country pickers to complex category selectors in your applications.

::: code-group

```tsx [React]
import { forwardRef, ReactNode } from "react";
import type { SelectHTMLAttributes, OptionHTMLAttributes, OptgroupHTMLAttributes } from "react";

/**
 * Option component for use within Select
 */
export interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
  /**
   * The value to be submitted when this option is selected
   */
  value: string | number;

  /**
   * Whether this option is disabled
   */
  disabled?: boolean;

  /**
   * Label for the option (displayed text)
   */
  label?: string;
}

export const Option = forwardRef<HTMLOptionElement, OptionProps>(
  ({ value, disabled = false, label, children, ...rest }, ref) => (
    <option
      ref={ref}
      value={value}
      disabled={disabled}
      label={label}
      {...rest}
    >
      {children || label || value}
    </option>
  )
);

Option.displayName = "Option";

/**
 * Option Group component for organizing options
 */
export interface OptgroupProps extends OptgroupHTMLAttributes<HTMLOptGroupElement> {
  /**
   * Label for the option group
   */
  label: string;

  /**
   * Whether this group is disabled
   */
  disabled?: boolean;
}

export const Optgroup = forwardRef<HTMLOptGroupElement, OptgroupProps>(
  ({ label, disabled = false, children, ...rest }, ref) => (
    <optgroup
      ref={ref}
      label={label}
      disabled={disabled}
      {...rest}
    >
      {children}
    </optgroup>
  )
);

Optgroup.displayName = "Optgroup";

/**
 * Accessible Select component props.
 * Extends all standard HTML `<select>` attributes.
 */
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * Allow multiple selections
   */
  multiple?: boolean;

  /**
   * Number of visible options when multiple is true
   */
  size?: number;

  /**
   * Placeholder option text
   */
  placeholder?: string;

  /**
   * Show placeholder as disabled option
   */
  showPlaceholder?: boolean;

  /**
   * Validation state
   */
  "aria-invalid"?: boolean;

  /**
   * Error message association
   */
  "aria-describedby"?: string;

  /**
   * Required field indicator
   */
  "aria-required"?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const {
      multiple = false,
      disabled = false,
      required = false,
      placeholder,
      showPlaceholder = true,
      className,
      children,
      ...rest
    } = props;

    return (
      <select
        ref={ref}
        multiple={multiple}
        disabled={disabled}
        required={required}
        className={className}
        {...rest}
      >
        {placeholder && showPlaceholder && !multiple && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

// Export the complete Select compound component
const SelectComponent = Object.assign(Select, {
  Option,
  Optgroup,
});

export default SelectComponent;

// Usage Examples:
// <Select placeholder="Choose a country">
//   <Option value="us">United States</Option>
//   <Option value="ca">Canada</Option>
// </Select>
//
// <Select multiple size={4}>
//   <Optgroup label="Fruits">
//     <Option value="apple">Apple</Option>
//     <Option value="banana">Banana</Option>
//   </Optgroup>
// </Select>
```

```vue [Vue]
<template>
  <select
    ref="selectRef"
    :multiple="multiple"
    :disabled="disabled"
    :required="required"
    :class="selectClass"
    v-bind="$attrs"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <option
      v-if="placeholder && showPlaceholder && !multiple"
      value=""
      disabled
      hidden
    >
      {{ placeholder }}
    </option>
    <slot />
  </select>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

/**
 * Props for the Atomic Select component.
 * Supports single and multiple selection with full accessibility.
 */
interface SelectProps {
  /**
   * Allow multiple selections
   */
  multiple?: boolean;

  /**
   * Number of visible options when multiple is true
   */
  size?: number;

  /**
   * Placeholder option text
   */
  placeholder?: string;

  /**
   * Show placeholder as disabled option
   */
  showPlaceholder?: boolean;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Required field indicator
   */
  required?: boolean;

  /**
   * Model value for v-model support
   */
  modelValue?: string | string[] | number | number[];

  /**
   * Additional CSS classes
   */
  class?: string;

  /**
   * Validation state
   */
  'aria-invalid'?: boolean;

  /**
   * Error message association
   */
  'aria-describedby'?: string;

  /**
   * Required field indicator for screen readers
   */
  'aria-required'?: boolean;
}

const props = withDefaults(defineProps<SelectProps>(), {
  multiple: false,
  showPlaceholder: true,
  disabled: false,
  required: false,
});

// Emit events
const emit = defineEmits<{
  'update:modelValue': [value: string | string[] | number | number[]];
  change: [event: Event];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

// Local refs
const selectRef = ref<HTMLSelectElement>();

// Computed properties
const selectClass = computed(() => {
  const classes = [props.class];
  return classes.filter(Boolean).join(' ');
});

// Event handlers
const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  
  if (props.multiple) {
    const selectedValues = Array.from(target.selectedOptions).map(option => option.value);
    emit('update:modelValue', selectedValues);
  } else {
    emit('update:modelValue', target.value);
  }
  
  emit('change', event);
};

const handleFocus = (event: FocusEvent) => emit('focus', event);
const handleBlur = (event: FocusEvent) => emit('blur', event);

// Expose ref for parent access
defineExpose({ selectRef });
</script>

<!-- Option component -->
<script setup lang="ts" name="SelectOption">
interface OptionProps {
  /**
   * The value to be submitted when this option is selected
   */
  value: string | number;

  /**
   * Whether this option is disabled
   */
  disabled?: boolean;

  /**
   * Label for the option (displayed text)
   */
  label?: string;
}

defineProps<OptionProps>();
</script>

<template name="SelectOption">
  <option
    :value="value"
    :disabled="disabled"
    :label="label"
  >
    <slot>{{ label || value }}</slot>
  </option>
</template>

<!-- Optgroup component -->
<script setup lang="ts" name="SelectOptgroup">
interface OptgroupProps {
  /**
   * Label for the option group
   */
  label: string;

  /**
   * Whether this group is disabled
   */
  disabled?: boolean;
}

defineProps<OptgroupProps>();
</script>

<template name="SelectOptgroup">
  <optgroup
    :label="label"
    :disabled="disabled"
  >
    <slot />
  </optgroup>
</template>

<!-- 
Usage Examples:
<Select placeholder="Choose a country" v-model="selectedCountry">
  <option value="us">United States</option>
  <option value="ca">Canada</option>
</Select>

<Select :multiple="true" :size="4" v-model="selectedFruits">
  <optgroup label="Fruits">
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
  </optgroup>
</Select>
-->
```

:::

## Key Features

### **🎯 Single & Multiple Selection**
Supports both single-choice dropdowns and multi-select lists with configurable visible size and proper value handling.

### **📊 Option Grouping**
Built-in support for organizing options into logical groups with `<optgroup>` elements for better information architecture.

### **💡 Smart Placeholder**
Configurable placeholder options that are hidden from form submission but provide helpful context to users.

### **⌨️ Keyboard Navigation**
Full keyboard support including arrow keys, typing to search, space/enter selection, and proper focus management.

### **♿ Screen Reader Friendly**
Complete ARIA support with proper announcements for selection changes, group labels, and disabled states.

## Common Use Cases

```jsx
// Basic country selector
<Select placeholder="Select your country" required>
  <Option value="us">United States</Option>
  <Option value="ca">Canada</Option>
  <Option value="uk">United Kingdom</Option>
  <Option value="au">Australia</Option>
</Select>

// Multiple selection with categories
<Select multiple size={6} aria-label="Select skills">
  <Optgroup label="Frontend">
    <Option value="react">React</Option>
    <Option value="vue">Vue</Option>
    <Option value="angular">Angular</Option>
  </Optgroup>
  <Optgroup label="Backend">
    <Option value="node">Node.js</Option>
    <Option value="python">Python</Option>
    <Option value="java">Java</Option>
  </Optgroup>
</Select>

// Priority selector with disabled options
<Select defaultValue="medium">
  <Option value="low">Low Priority</Option>
  <Option value="medium">Medium Priority</Option>
  <Option value="high">High Priority</Option>
  <Option value="urgent" disabled>Urgent (Requires Approval)</Option>
</Select>

// Size selector with custom values
<Select placeholder="Choose size">
  <Option value="xs" label="Extra Small">XS (UK 6-8)</Option>
  <Option value="s" label="Small">S (UK 8-10)</Option>
  <Option value="m" label="Medium">M (UK 10-12)</Option>
  <Option value="l" label="Large">L (UK 12-14)</Option>
</Select>
```

## Form Integration Patterns

```jsx
// With validation state
<Label htmlFor="category" required>Category</Label>
<Select 
  id="category"
  aria-invalid={hasError}
  aria-describedby={hasError ? "category-error" : undefined}
  placeholder="Choose a category"
>
  <Option value="tech">Technology</Option>
  <Option value="design">Design</Option>
  <Option value="business">Business</Option>
</Select>
{hasError && (
  <div id="category-error" role="alert">
    Please select a category
  </div>
)}

// Multi-select with helper text
<Label htmlFor="tags">Tags (select multiple)</Label>
<Select id="tags" multiple size={4} aria-describedby="tags-help">
  <Option value="javascript">JavaScript</Option>
  <Option value="typescript">TypeScript</Option>
  <Option value="react">React</Option>
  <Option value="vue">Vue</Option>
</Select>
<div id="tags-help">
  Hold Ctrl (Cmd on Mac) to select multiple tags
</div>
```

## Accessibility Best Practices

- **Label Association**: Always use a `<label>` element or `aria-label`
- **Option Text**: Make option text descriptive and unique
- **Group Labels**: Use clear, concise labels for option groups
- **Error States**: Provide clear error messages with `aria-describedby`
- **Required Fields**: Mark required selects appropriately
- **Multiple Selection**: Explain multi-select behavior to users

The Select atom bridges the gap between user choice and data collection, providing an intuitive interface for decision-making while maintaining the semantic structure that makes forms accessible and submittable.