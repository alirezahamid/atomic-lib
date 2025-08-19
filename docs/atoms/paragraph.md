# Atomic Paragraph

The **Atomic Paragraph** is the fundamental text content component that forms the backbone of readable web content. While it might seem like just a simple `<p>` tag, this atom handles the nuanced typography concerns that make text truly accessible and readable—from line height and spacing to semantic markup and responsive text sizing.

In the world of digital typography, paragraphs aren't just containers for sentences—they're carefully crafted units of information that need to balance readability, accessibility, and visual hierarchy. This atomic component provides the foundation for everything from article content and product descriptions to form help text and user interface copy.

::: code-group

```tsx [React]
import { forwardRef, ElementType } from "react";
import type { HTMLAttributes } from "react";

/**
 * Typography variants for different use cases
 */
type TypographyVariant = 
  | "body" | "body-large" | "body-small" 
  | "lead" | "caption" | "legal";

/**
 * Text alignment options
 */
type TextAlign = "left" | "center" | "right" | "justify" | "start" | "end";

/**
 * Accessible Paragraph component props.
 * Extends all standard HTML `<p>` attributes.
 */
export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Typography variant for different contexts
   */
  variant?: TypographyVariant;

  /**
   * Text alignment
   */
  align?: TextAlign;

  /**
   * Text color variant
   */
  color?: "primary" | "secondary" | "muted" | "success" | "warning" | "error";

  /**
   * Enable responsive text sizing
   */
  responsive?: boolean;

  /**
   * Maximum width for optimal readability
   */
  maxWidth?: string | number;

  /**
   * Line height override
   */
  lineHeight?: string | number;

  /**
   * Font weight override
   */
  fontWeight?: "normal" | "medium" | "semibold" | "bold" | number;

  /**
   * Render as a different HTML element
   */
  as?: ElementType;

  /**
   * Truncate text with ellipsis
   */
  truncate?: boolean;

  /**
   * Number of lines to show when truncated
   */
  clamp?: number;
}

export const Paragraph = forwardRef<HTMLElement, ParagraphProps>(
  (props, ref) => {
    const {
      variant = "body",
      align = "start",
      color = "primary",
      responsive = true,
      maxWidth,
      lineHeight,
      fontWeight,
      as,
      truncate = false,
      clamp,
      className,
      style,
      children,
      ...rest
    } = props;

    // Determine the element type
    const Element = (as || "p") as ElementType;

    // Build CSS classes
    const classes = [
      "paragraph",
      `paragraph--${variant}`,
      `paragraph--${color}`,
      responsive && "paragraph--responsive",
      truncate && "paragraph--truncate",
      clamp && "paragraph--clamp",
      className
    ].filter(Boolean).join(" ");

    // Build inline styles
    const paragraphStyle = {
      textAlign: align,
      maxWidth,
      lineHeight,
      fontWeight,
      ...(clamp && {
        display: "-webkit-box",
        WebkitLineClamp: clamp,
        WebkitBoxOrient: "vertical" as const,
        overflow: "hidden",
      }),
      ...style,
    };

    return (
      <Element
        ref={ref}
        className={classes}
        style={paragraphStyle}
        {...rest}
      >
        {children}
      </Element>
    );
  }
);

Paragraph.displayName = "Paragraph";

export default Paragraph;

// Usage Examples:
// <Paragraph>Standard body text paragraph.</Paragraph>
// <Paragraph variant="lead">Introduction paragraph with larger text.</Paragraph>
// <Paragraph variant="caption" color="muted">Small caption text.</Paragraph>
// <Paragraph truncate maxWidth="300px">Long text that will be truncated...</Paragraph>
// <Paragraph clamp={3}>Multi-line text clamped to 3 lines...</Paragraph>
```

```vue [Vue]
<template>
  <component
    :is="elementType"
    ref="paragraphRef"
    :class="paragraphClass"
    :style="paragraphStyle"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

/**
 * Typography variants for different use cases
 */
type TypographyVariant = 
  | 'body' | 'body-large' | 'body-small' 
  | 'lead' | 'caption' | 'legal';

/**
 * Text alignment options
 */
type TextAlign = 'left' | 'center' | 'right' | 'justify' | 'start' | 'end';

/**
 * Props for the Atomic Paragraph component.
 * Provides semantic text content with typography control.
 */
interface ParagraphProps {
  /**
   * Typography variant for different contexts
   */
  variant?: TypographyVariant;

  /**
   * Text alignment
   */
  align?: TextAlign;

  /**
   * Text color variant
   */
  color?: 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'error';

  /**
   * Enable responsive text sizing
   */
  responsive?: boolean;

  /**
   * Maximum width for optimal readability
   */
  maxWidth?: string | number;

  /**
   * Line height override
   */
  lineHeight?: string | number;

  /**
   * Font weight override
   */
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | number;

  /**
   * Render as a different HTML element
   */
  as?: string;

  /**
   * Truncate text with ellipsis
   */
  truncate?: boolean;

  /**
   * Number of lines to show when truncated
   */
  clamp?: number;

  /**
   * Additional CSS classes
   */
  class?: string;
}

const props = withDefaults(defineProps<ParagraphProps>(), {
  variant: 'body',
  align: 'start',
  color: 'primary',
  responsive: true,
  truncate: false,
});

// Local refs
const paragraphRef = ref<HTMLElement>();

// Computed properties
const elementType = computed(() => props.as || 'p');

const paragraphClass = computed(() => {
  const classes = [
    'paragraph',
    `paragraph--${props.variant}`,
    `paragraph--${props.color}`,
    props.responsive && 'paragraph--responsive',
    props.truncate && 'paragraph--truncate',
    props.clamp && 'paragraph--clamp',
    props.class
  ];
  return classes.filter(Boolean).join(' ');
});

const paragraphStyle = computed(() => ({
  textAlign: props.align,
  maxWidth: props.maxWidth,
  lineHeight: props.lineHeight,
  fontWeight: props.fontWeight,
  ...(props.clamp && {
    display: '-webkit-box',
    WebkitLineClamp: props.clamp,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }),
}));

// Expose ref for parent access
defineExpose({ paragraphRef });
</script>

<style scoped>
/* Base paragraph styles */
.paragraph {
  margin: 0;
  padding: 0;
}

/* Variant styles */
.paragraph--body {
  font-size: 1rem;
  line-height: 1.6;
}

.paragraph--body-large {
  font-size: 1.125rem;
  line-height: 1.6;
}

.paragraph--body-small {
  font-size: 0.875rem;
  line-height: 1.5;
}

.paragraph--lead {
  font-size: 1.25rem;
  line-height: 1.6;
  font-weight: 400;
}

.paragraph--caption {
  font-size: 0.75rem;
  line-height: 1.4;
}

.paragraph--legal {
  font-size: 0.6875rem;
  line-height: 1.4;
}

/* Responsive text sizing */
.paragraph--responsive {
  font-size: clamp(0.875rem, 2vw, 1rem);
}

.paragraph--responsive.paragraph--body-large {
  font-size: clamp(1rem, 2.5vw, 1.125rem);
}

.paragraph--responsive.paragraph--lead {
  font-size: clamp(1.125rem, 3vw, 1.25rem);
}

/* Color variants */
.paragraph--primary {
  color: currentColor;
}

.paragraph--secondary {
  color: #6b7280;
}

.paragraph--muted {
  color: #9ca3af;
}

.paragraph--success {
  color: #059669;
}

.paragraph--warning {
  color: #d97706;
}

.paragraph--error {
  color: #dc2626;
}

/* Truncation styles */
.paragraph--truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.paragraph--clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<!-- 
Usage Examples:
<Paragraph>Standard body text paragraph.</Paragraph>
<Paragraph variant="lead">Introduction paragraph with larger text.</Paragraph>
<Paragraph variant="caption" color="muted">Small caption text.</Paragraph>
<Paragraph :truncate="true" max-width="300px">Long text that will be truncated...</Paragraph>
<Paragraph :clamp="3">Multi-line text clamped to 3 lines...</Paragraph>
-->
```

:::

## Key Features

### **📝 Typography Variants**
Pre-defined text styles for different content contexts—from body text and captions to lead paragraphs and legal text with optimal sizing and spacing.

### **📱 Responsive Text**
Built-in responsive font sizing using CSS clamp() for optimal readability across all device sizes without manual breakpoints.

### **🎨 Flexible Styling**
Configurable alignment, color, weight, and spacing options while maintaining semantic HTML structure and accessibility.

### **✂️ Smart Truncation**
Advanced text truncation with single-line ellipsis or multi-line clamping for responsive layouts and card-based designs.

### **♿ Semantic Structure**
Proper paragraph markup that works with screen readers and maintains document structure for better accessibility and SEO.

## Common Use Cases

```jsx
// Article body text
<Paragraph>
  This is the main content of your article. It uses the default body variant 
  with optimal line height and spacing for comfortable reading across devices.
</Paragraph>

// Lead paragraph
<Paragraph variant="lead">
  This introduction paragraph uses larger text to draw attention and 
  set the tone for the content that follows.
</Paragraph>

// Product description
<Paragraph variant="body-large" maxWidth="60ch">
  Our premium headphones deliver exceptional audio quality with advanced 
  noise cancellation technology for the perfect listening experience.
</Paragraph>

// Image caption
<Paragraph variant="caption" color="muted" align="center">
  Figure 1: User engagement metrics showing 40% increase over 6 months
</Paragraph>

// Card excerpt with truncation
<Paragraph clamp={3} color="secondary">
  This is a longer description that will be clamped to exactly three lines 
  with an ellipsis, perfect for card layouts where space is constrained 
  and you need consistent visual rhythm.
</Paragraph>

// Legal disclaimer
<Paragraph variant="legal" color="muted" as="small">
  * Terms and conditions apply. See website for full details and restrictions.
</Paragraph>
```

## Typography Hierarchy

```jsx
// Article structure
<article>
  <Paragraph variant="lead" color="secondary">
    Introduction paragraph that sets the context and draws readers in.
  </Paragraph>
  
  <Paragraph>
    Main body content with standard formatting for optimal readability 
    and comfortable scanning by your audience.
  </Paragraph>
  
  <Paragraph variant="body-small">
    Supporting details or additional context that complements the main content 
    without overwhelming the primary message.
  </Paragraph>
  
  <Paragraph variant="caption" color="muted">
    Source attribution or additional metadata about the content.
  </Paragraph>
</article>

// Product card
<div className="product-card">
  <Paragraph variant="body-large" fontWeight="semibold">
    Product Name
  </Paragraph>
  
  <Paragraph clamp={2} color="secondary">
    Brief product description that highlights key features and benefits 
    in a concise, scannable format.
  </Paragraph>
  
  <Paragraph variant="caption" color="muted">
    SKU: ABC123 | In Stock
  </Paragraph>
</div>
```

## Responsive Design Patterns

```jsx
// Responsive lead text
<Paragraph 
  variant="lead" 
  responsive 
  maxWidth="70ch"
  align="center"
>
  Scale beautifully from mobile to desktop with fluid typography
</Paragraph>

// Constrained reading width
<Paragraph maxWidth="65ch">
  Optimal line length for comfortable reading, preventing lines from 
  becoming too long on wide screens while maintaining readability.
</Paragraph>

// Flexible truncation
<Paragraph 
  clamp={window.innerWidth < 768 ? 2 : 3}
  variant="body-small"
>
  Adaptive text clamping that shows fewer lines on mobile devices 
  and more content on larger screens for better space utilization.
</Paragraph>
```

## Accessibility Best Practices

- **Semantic Markup**: Use proper paragraph elements for text content
- **Reading Width**: Limit line length to 45-75 characters for optimal readability
- **Color Contrast**: Ensure sufficient contrast ratios for all color variants
- **Font Sizing**: Use relative units and responsive scaling for accessibility
- **Line Height**: Maintain adequate spacing between lines (1.4-1.6)
- **Alternative Elements**: Use `as` prop for semantic flexibility when needed

The Paragraph atom provides the foundation for readable, accessible text content that scales beautifully across devices while maintaining the semantic structure that makes your content discoverable and navigable for all users.