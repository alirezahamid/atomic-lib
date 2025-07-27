# Atomic Button Example

::: code-group

```tsx [React]
import React, {
  forwardRef,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Descriptive label for assistive technologies.
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role
   */
  'aria-label'?: string;
  /**
   * Indicates the element has a popup context menu or sub-level menu.
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup
   */
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  /**
   * Indicates the current “expanded” state of a collapsible button.
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded
   */
  'aria-expanded'?: boolean;
  /**
   * Identifies the element(s) whose contents or presence this button controls.
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls
   */
  'aria-controls'?: string;
  /**
   * Button contents.
   */
  children: ReactNode;
}

/**
 * Accessible, fully-typed Button component supporting all standard
 * HTML button attributes and common ARIA properties.
 *
 * MDN-listed attributes (via React.ButtonHTMLAttributes):
 * - type, disabled, autoFocus
 * - form, formAction, formEncType, formMethod, formNoValidate, formTarget
 * - name, value
 * - id, className, style, title, data-* attributes, etc.
 * - All global ARIA attributes
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      type = 'button',
      disabled = false,
      className,
      children,

      // ARIA props
      'aria-label': ariaLabel,
      'aria-haspopup': ariaHaspopup,
      'aria-expanded': ariaExpanded,
      'aria-controls': ariaControls,

      // everything else (id, name, value, data-*, event handlers…)
      ...rest
    } = props;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={className}
        aria-label={ariaLabel}
        aria-haspopup={ariaHaspopup}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
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
import { defineProps, useAttrs } from 'vue'
import type { PropType } from 'vue'

/**
 * Props for our Atomic Button
 */
const props = defineProps({
  /** native HTML button types */
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
  /** disable the button */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** ARIA: accessible label for icon-only buttons */
  ariaLabel: {
    type: String as PropType<string>,
    default: undefined,
  },
  /** ARIA: has a popup, e.g. menu, listbox, tree, grid, dialog */
  ariaHaspopup: {
    type: [Boolean, String] as PropType<
      boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
    >,
    default: undefined,
  },
  /** ARIA: is it expanded? (for e.g. accordions) */
  ariaExpanded: {
    type: Boolean,
    default: undefined,
  },
  /** ARIA: id of the controlled element */
  ariaControls: {
    type: String as PropType<string>,
    default: undefined,
  },
})

// capture any other native attrs (id, class, style, form-*, data-*, event listeners…)
const attrs = useAttrs()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :aria-haspopup="ariaHaspopup"
    :aria-expanded="ariaExpanded"
    :aria-controls="ariaControls"
    v-bind="attrs"
  >
    <slot />
  </button>
</template>

```

:::