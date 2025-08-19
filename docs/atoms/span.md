# Atomic Span

The **Atomic Span** is the versatile inline content component that handles text styling, semantic markup, and interactive elements within flowing text. While it might seem like the simplest HTML element, this atom manages the complex world of inline typography—from text highlighting and emphasis to badges, labels, and micro-interactions that enhance content without disrupting reading flow.

Unlike block elements, spans live within the text stream, making them perfect for targeted styling, semantic markup, and interactive elements that need to coexist harmoniously with surrounding content. This atomic component provides the foundation for everything from syntax highlighting and status indicators to interactive tooltips and inline forms.

::: code-group

```tsx [React]
import { forwardRef, ElementType, MouseEvent, KeyboardEvent } from "react";
import type { HTMLAttributes, ReactNode } from "react";

/**
 * Inline content variants for different use cases
 */
type InlineVariant = 
  | "text" | "emphasis" | "strong" | "highlight" | "code" 
  | "badge" | "tag" | "label" | "keyboard" | "variable";

/**
 * Interactive states for clickable spans
 */
type InteractiveState = "default" | "hover" | "active" | "focus" | "disabled";

/**
 * Accessible Span component props.
 * Extends all standard HTML attributes for inline elements.
 */
export interface SpanProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Content variant for different styling contexts
   */
  variant?: InlineVariant;

  /**
   * Text color variant
   */
  color?: "primary" | "secondary" | "muted" | "success" | "warning" | "error" | "info";

  /**
   * Background color for badges and labels
   */
  background?: "neutral" | "primary" | "secondary" | "success" | "warning" | "error" | "info";

  /**
   * Size variant for the content
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Font weight override
   */
  weight?: "normal" | "medium" | "semibold" | "bold" | number;

  /**
   * Make the span clickable with proper accessibility
   */
  clickable?: boolean;

  /**
   * Disable interactions for clickable spans
   */
  disabled?: boolean;

  /**
   * Render as a different inline element
   */
  as?: "span" | "em" | "strong" | "mark" | "code" | "kbd" | "samp" | "var" | "small" | "sub" | "sup";

  /**
   * Add visual separator (useful for breadcrumbs, tags)
   */
  separator?: ReactNode;

  /**
   * Show separator before content
   */
  separatorBefore?: boolean;

  /**
   * Truncate content with ellipsis
   */
  truncate?: boolean;

  /**
   * Maximum width before truncation
   */
  maxWidth?: string | number;

  /**
   * Tooltip content for additional context
   */
  title?: string;

  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;

  /**
   * ARIA description reference
   */
  "aria-describedby"?: string;
}

export const Span = forwardRef<HTMLSpanElement, SpanProps>(
  (props, ref) => {
    const {
      variant = "text",
      color = "primary",
      background,
      size = "md",
      weight,
      clickable = false,
      disabled = false,
      as,
      separator,
      separatorBefore = false,
      truncate = false,
      maxWidth,
      className,
      style,
      children,
      onClick,
      onKeyDown,
      ...rest
    } = props;

    // Determine the element type
    const Element = (as || "span") as ElementType;

    // Build CSS classes
    const classes = [
      "span",
      `span--${variant}`,
      `span--${color}`,
      background && `span--bg-${background}`,
      `span--${size}`,
      clickable && "span--clickable",
      disabled && "span--disabled",
      truncate && "span--truncate",
      className
    ].filter(Boolean).join(" ");

    // Build inline styles
    const spanStyle = {
      fontWeight: weight,
      maxWidth: truncate ? maxWidth : undefined,
      ...style,
    };

    // Handle click events for clickable spans
    const handleClick = (event: MouseEvent<HTMLSpanElement>) => {
      if (disabled || !clickable) return;
      onClick?.(event);
    };

    // Handle keyboard events for clickable spans
    const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
      if (disabled || !clickable) return;
      
      // Activate on Enter or Space
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick?.(event as any);
      }
      
      onKeyDown?.(event);
    };

    // Add interactive attributes for clickable spans
    const interactiveProps = clickable ? {
      role: "button",
      tabIndex: disabled ? -1 : 0,
      "aria-disabled": disabled,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
    } : {};

    const separatorElement = separator && (
      <span className="span__separator" aria-hidden="true">
        {separator}
      </span>
    );

    return (
      <Element
        ref={ref}
        className={classes}
        style={spanStyle}
        {...interactiveProps}
        {...rest}
      >
        {separatorBefore && separatorElement}
        {children}
        {!separatorBefore && separatorElement}
      </Element>
    );
  }
);

Span.displayName = "Span";

export default Span;

// Usage Examples:
// <Span>Regular inline text</Span>
// <Span variant="highlight" color="warning">Important note</Span>
// <Span variant="badge" background="success">Active</Span>
// <Span variant="code">console.log()</Span>
// <Span clickable onClick={handleClick}>Interactive text</Span>
```

```vue [Vue]
<template>
  <component
    :is="elementType"
    ref="spanRef"
    :class="spanClass"
    :style="spanStyle"
    :role="interactiveRole"
    :tabindex="interactiveTabIndex"
    :aria-disabled="disabled || undefined"
    v-bind="$attrs"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <span
      v-if="separatorBefore && separator"
      class="span__separator"
      aria-hidden="true"
    >
      {{ separator }}
    </span>

    <slot />

    <span
      v-if="!separatorBefore && separator"
      class="span__separator"
      aria-hidden="true"
    >
      {{ separator }}
    </span>
  </component>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

/**
 * Inline content variants for different use cases
 */
type InlineVariant = 
  | 'text' | 'emphasis' | 'strong' | 'highlight' | 'code' 
  | 'badge' | 'tag' | 'label' | 'keyboard' | 'variable';

/**
 * Props for the Atomic Span component.
 * Handles inline content with styling and interaction capabilities.
 */
interface SpanProps {
  /**
   * Content variant for different styling contexts
   */
  variant?: InlineVariant;

  /**
   * Text color variant
   */
  color?: 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'error' | 'info';

  /**
   * Background color for badges and labels
   */
  background?: 'neutral' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

  /**
   * Size variant for the content
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Font weight override
   */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | number;

  /**
   * Make the span clickable with proper accessibility
   */
  clickable?: boolean;

  /**
   * Disable interactions for clickable spans
   */
  disabled?: boolean;

  /**
   * Render as a different inline element
   */
  as?: 'span' | 'em' | 'strong' | 'mark' | 'code' | 'kbd' | 'samp' | 'var' | 'small' | 'sub' | 'sup';

  /**
   * Add visual separator (useful for breadcrumbs, tags)
   */
  separator?: string;

  /**
   * Show separator before content
   */
  separatorBefore?: boolean;

  /**
   * Truncate content with ellipsis
   */
  truncate?: boolean;

  /**
   * Maximum width before truncation
   */
  maxWidth?: string | number;

  /**
   * Additional CSS classes
   */
  class?: string;
}

const props = withDefaults(defineProps<SpanProps>(), {
  variant: 'text',
  color: 'primary',
  size: 'md',
  clickable: false,
  disabled: false,
  separatorBefore: false,
  truncate: false,
});

// Emit events
const emit = defineEmits<{
  click: [event: MouseEvent];
  keydown: [event: KeyboardEvent];
}>();

// Local refs
const spanRef = ref<HTMLSpanElement>();

// Computed properties
const elementType = computed(() => props.as || 'span');

const spanClass = computed(() => {
  const classes = [
    'span',
    `span--${props.variant}`,
    `span--${props.color}`,
    props.background && `span--bg-${props.background}`,
    `span--${props.size}`,
    props.clickable && 'span--clickable',
    props.disabled && 'span--disabled',
    props.truncate && 'span--truncate',
    props.class
  ];
  return classes.filter(Boolean).join(' ');
});

const spanStyle = computed(() => ({
  fontWeight: props.weight,
  maxWidth: props.truncate ? props.maxWidth : undefined,
}));

const interactiveRole = computed(() => props.clickable ? 'button' : undefined);
const interactiveTabIndex = computed(() => {
  if (!props.clickable) return undefined;
  return props.disabled ? -1 : 0;
});

// Event handlers
const handleClick = (event: MouseEvent) => {
  if (props.disabled || !props.clickable) return;
  emit('click', event);
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (props.disabled || !props.clickable) return;
  
  // Activate on Enter or Space
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    emit('click', event as any);
  }
  
  emit('keydown', event);
};

// Expose ref for parent access
defineExpose({ spanRef });
</script>

<style scoped>
/* Base span styles */
.span {
  display: inline;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

/* Variant styles */
.span--text {
  /* Default text styling */
}

.span--emphasis {
  font-style: italic;
}

.span--strong {
  font-weight: 600;
}

.span--highlight {
  background-color: #fef3c7;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
}

.span--code {
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.span--badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1;
}

.span--tag {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.span--keyboard {
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  border-bottom-color: #9ca3af;
  border-radius: 0.25rem;
  padding: 0.125rem 0.25rem;
  font-size: 0.75rem;
}

/* Size variants */
.span--xs { font-size: 0.75rem; }
.span--sm { font-size: 0.875rem; }
.span--md { font-size: 1rem; }
.span--lg { font-size: 1.125rem; }
.span--xl { font-size: 1.25rem; }

/* Color variants */
.span--primary { color: currentColor; }
.span--secondary { color: #6b7280; }
.span--muted { color: #9ca3af; }
.span--success { color: #059669; }
.span--warning { color: #d97706; }
.span--error { color: #dc2626; }
.span--info { color: #2563eb; }

/* Background variants */
.span--bg-neutral { background-color: #f3f4f6; color: #374151; }
.span--bg-primary { background-color: #3b82f6; color: white; }
.span--bg-secondary { background-color: #6b7280; color: white; }
.span--bg-success { background-color: #059669; color: white; }
.span--bg-warning { background-color: #d97706; color: white; }
.span--bg-error { background-color: #dc2626; color: white; }
.span--bg-info { background-color: #2563eb; color: white; }

/* Interactive styles */
.span--clickable {
  cursor: pointer;
  transition: all 0.15s ease;
}

.span--clickable:hover:not(.span--disabled) {
  opacity: 0.8;
}

.span--clickable:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.span--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Truncation */
.span--truncate {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
}

/* Separator */
.span__separator {
  margin: 0 0.5rem;
  color: #9ca3af;
}
</style>

<!-- 
Usage Examples:
<Span>Regular inline text</Span>
<Span variant="highlight" color="warning">Important note</Span>
<Span variant="badge" background="success">Active</Span>
<Span variant="code">console.log()</Span>
<Span :clickable="true" @click="handleClick">Interactive text</Span>
-->
```

:::

## Key Features

### **🎨 Rich Variants**
Multiple styling variants from simple text and emphasis to badges, code snippets, and keyboard indicators for diverse content needs.

### **🖱️ Interactive Support**
Built-in clickable functionality with proper keyboard navigation, focus management, and disabled states for accessible micro-interactions.

### **📏 Flexible Sizing**
Responsive size variants and truncation options that work within flowing text while maintaining readability and visual hierarchy.

### **♿ Semantic Flexibility**
Render as different inline HTML elements (`em`, `strong`, `code`, `kbd`, etc.) while maintaining consistent styling and behavior.

### **🎯 Contextual Colors**
Semantic color system with both text colors and background variants for status indicators, badges, and highlighted content.

## Common Use Cases

```jsx
// Text emphasis and styling
<p>
  This sentence contains <Span variant="strong">important information</Span> and 
  some <Span variant="emphasis">emphasized content</Span> for better readability.
</p>

// Code and technical content
<p>
  To install the package, run <Span variant="code">npm install atomic-lib</Span> 
  in your terminal, then press <Span variant="keyboard">Ctrl+C</Span> to exit.
</p>

// Status badges and labels
<div className="user-profile">
  <h3>John Doe <Span variant="badge" background="success">Premium</Span></h3>
  <p>Status: <Span variant="tag" background="info">Online</Span></p>
</div>

// Interactive inline elements
<p>
  Need help? <Span clickable color="info" onClick={openModal}>
    Contact support
  </Span> or check our <Span clickable color="info" onClick={openDocs}>
    documentation
  </Span>.
</p>

// Highlighted content
<p>
  Please note that <Span variant="highlight" color="warning">
    this feature is experimental
  </Span> and may change in future versions.
</p>

// Breadcrumb navigation
<nav>
  <Span clickable separator="/">Home</Span>
  <Span clickable separator="/">Products</Span>
  <Span color="muted">Current Page</Span>
</nav>
```

## Badge and Tag Patterns

```jsx
// Status indicators
<div className="status-list">
  <Span variant="badge" background="success" size="sm">Active</Span>
  <Span variant="badge" background="warning" size="sm">Pending</Span>
  <Span variant="badge" background="error" size="sm">Inactive</Span>
</div>

// Category tags
<div className="article-tags">
  <Span variant="tag" background="primary" size="xs">React</Span>
  <Span variant="tag" background="secondary" size="xs">TypeScript</Span>
  <Span variant="tag" background="neutral" size="xs">Tutorial</Span>
</div>

// User roles
<div className="user-info">
  <span>Sarah Chen</span>
  <Span variant="badge" background="info" size="xs">Admin</Span>
  <Span variant="badge" background="success" size="xs">Verified</Span>
</div>
```

## Code and Technical Content

```jsx
// Inline code examples
<p>
  The <Span variant="code">useState</Span> hook returns an array with two elements: 
  the current state value and a <Span variant="code">setState</Span> function.
</p>

// Keyboard shortcuts
<p>
  Save your work with <Span variant="keyboard">Cmd+S</Span> or 
  <Span variant="keyboard">Ctrl+S</Span> depending on your operating system.
</p>

// Variable names
<p>
  The <Span variant="variable" as="var">userCount</Span> variable stores 
  the total number of active users in the system.
</p>
```

## Interactive Patterns

```jsx
// Clickable tags with actions
<div className="tag-list">
  {tags.map(tag => (
    <Span 
      key={tag.id}
      variant="tag" 
      background="neutral"
      clickable
      onClick={() => filterByTag(tag.id)}
    >
      {tag.name}
    </Span>
  ))}
</div>

// Inline form controls
<p>
  Your subscription expires on {expiryDate}. 
  <Span clickable color="info" onClick={handleRenew}>
    Renew now
  </Span> to continue enjoying premium features.
</p>

// Toggle states
<p>
  Notifications: 
  <Span 
    variant="badge"
    background={notificationsEnabled ? "success" : "error"}
    clickable
    onClick={toggleNotifications}
  >
    {notificationsEnabled ? "On" : "Off"}
  </Span>
</p>
```

## Accessibility Best Practices

- **Semantic Elements**: Use appropriate `as` values for semantic meaning
- **Interactive States**: Provide clear focus indicators for clickable spans
- **Screen Readers**: Use `aria-label` for context when visual styling isn't descriptive
- **Keyboard Navigation**: Ensure clickable spans work with keyboard interaction
- **Color Contrast**: Maintain sufficient contrast for all color variants
- **Context**: Provide enough surrounding context for meaningful interaction

The Span atom enables rich inline content styling and interaction while maintaining the semantic integrity and accessibility that make content truly usable for everyone.