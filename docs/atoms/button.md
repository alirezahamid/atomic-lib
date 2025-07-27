# Atomic Button

The **Atomic Button** is the foundational clickable element in our design system, engineered to be both fully accessible and framework-agnostic. Under the hood it leverages TypeScript’s built-in `ButtonHTMLAttributes` and `AriaAttributes` to automatically support every native HTML button property and ARIA semantic, so you never have to manually re-declare `disabled`, `form*`, `data-*`, or screen-reader attributes—everything just works and is fully type-checked.

By adopting a single API surface in both React and Vue, this atom guarantees consistent behavior across your codebase. You get sensible defaults (e.g. `type="button"`, `disabled=false`), ref-forwarding, and seamless attribute forwarding (`...rest`)—all without extra boilerplate. Drop this atom into any component, style it however you like, and know that keyboard navigation, focus management, and assistive-technology support are already taken care of.

::: code-group

```tsx [React]
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AriaAttributes } from "react";

/**
 * Accessible Button component props.
 * Extends all standard HTML `<button>` attributes and ARIA attributes.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Indicates presence of a popup context menu.
   * Acceptable values: `true`, `false`, `"menu"`, `"listbox"`, `"tree"`, `"grid"`, `"dialog"`.
   */
  "aria-haspopup"?: AriaAttributes["aria-haspopup"];

  /** Current expanded state of a collapsible button. */
  "aria-expanded"?: AriaAttributes["aria-expanded"];
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      type = "button",
      disabled = false,
      className,
      children,
      // everything else (id, name, value, data-*, onClick, etc.)
      ...rest
    } = props;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={className}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default Button;

```

```vue [Vue]
<script setup lang="ts">
import { withDefaults, defineProps, defineEmits, ref } from 'vue';
import type { AriaAttributes } from 'vue';

/**
 * Props for the Accessible Button component.
 * Extends standard HTML `<button>` attributes and ARIA attributes.
 *
 * @property {('button'|'submit'|'reset')} [type] - Button type. Defaults to 'button'.
 * @property {boolean} [disabled] - Disables the button. Defaults to false.
 * @property {AriaAttributes['aria-haspopup']} [aria-haspopup]
 *   Indicates presence of a popup context menu.
 *   Acceptable values: true, false, 'menu', 'listbox', 'tree', 'grid', 'dialog'.
 * @property {AriaAttributes['aria-expanded']} [aria-expanded]
 *   Current expanded state of a collapsible button.
 */
const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    'aria-haspopup'?: AriaAttributes['aria-haspopup'];
    'aria-expanded'?: AriaAttributes['aria-expanded'];
  }>(),
  {
    type: 'button',
    disabled: false,
  }
);

// Emits the native click event
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

// Local ref to the button element
const buttonRef = ref<HTMLButtonElement>();
</script>

<template>
  <button
    ref="buttonRef"
    :type="props.type"
    :disabled="props.disabled"
    :aria-haspopup="props['aria-haspopup']"
    :aria-expanded="props['aria-expanded']"
    v-bind="$attrs"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>

```

:::