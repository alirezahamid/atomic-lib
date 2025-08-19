# Atomic Link

The **Atomic Link** is the fundamental navigation component that connects your application's pages, sections, and external resources. Far more than just colored, underlined text, this atom handles the complex world of modern web navigation—from traditional page links to single-page app routing, external site warnings, download triggers, and accessibility considerations that ensure everyone can navigate your content.

In today's web landscape, links serve multiple purposes: they navigate between pages, trigger actions, download files, open emails, and even control application state. This atomic component provides the semantic foundation and accessibility features that make all these interactions work seamlessly across devices and assistive technologies.

::: code-group

```tsx [React]
import { forwardRef, ReactNode, MouseEvent } from "react";
import type { AnchorHTMLAttributes } from "react";

/**
 * Link relationship types for the `rel` attribute
 */
type LinkRel = 
  | "alternate" | "author" | "bookmark" | "canonical" | "dns-prefetch"
  | "external" | "help" | "icon" | "license" | "next" | "nofollow"
  | "noopener" | "noreferrer" | "pingback" | "preconnect" | "prefetch"
  | "preload" | "prev" | "search" | "stylesheet" | "tag";

/**
 * Accessible Link component props.
 * Extends all standard HTML `<a>` attributes.
 */
export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link destination
   */
  href: string;

  /**
   * Link relationship to current page
   */
  rel?: LinkRel | LinkRel[] | string;

  /**
   * Where to open the linked document
   */
  target?: "_self" | "_blank" | "_parent" | "_top" | string;

  /**
   * Media type of the linked resource
   */
  type?: string;

  /**
   * Language of the linked resource
   */
  hrefLang?: string;

  /**
   * Filename for downloads
   */
  download?: boolean | string;

  /**
   * Visual variant for different link styles
   */
  variant?: "inline" | "block" | "button" | "nav";

  /**
   * Disable the link (renders as span with disabled styling)
   */
  disabled?: boolean;

  /**
   * Show external link indicator
   */
  showExternalIcon?: boolean;

  /**
   * Custom external link icon
   */
  externalIcon?: ReactNode;

  /**
   * Automatically add security attributes for external links
   */
  autoSecure?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    const {
      href,
      target,
      rel,
      variant = "inline",
      disabled = false,
      showExternalIcon = false,
      externalIcon = "↗",
      autoSecure = true,
      className,
      children,
      onClick,
      ...rest
    } = props;

    // Determine if link is external
    const isExternal = href && (
      href.startsWith('http://') || 
      href.startsWith('https://') || 
      href.startsWith('//')
    ) && !href.includes(window?.location?.hostname);

    // Handle disabled state
    if (disabled) {
      return (
        <span
          className={`${className || ''} link-disabled`}
          aria-disabled="true"
          {...(rest as any)}
        >
          {children}
        </span>
      );
    }

    // Auto-secure external links
    const secureRel = autoSecure && (target === '_blank' || isExternal)
      ? ['noopener', 'noreferrer']
      : [];

    // Combine rel attributes
    const combinedRel = [
      ...(Array.isArray(rel) ? rel : rel ? [rel] : []),
      ...secureRel
    ].join(' ').trim();

    // Handle click events
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    const linkClass = `${className || ''} link-${variant}`.trim();

    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={combinedRel || undefined}
        className={linkClass}
        onClick={handleClick}
        {...rest}
      >
        {children}
        {showExternalIcon && isExternal && (
          <span 
            className="external-icon" 
            aria-label="opens in new window"
          >
            {externalIcon}
          </span>
        )}
      </a>
    );
  }
);

Link.displayName = "Link";

export default Link;

// Usage Examples:
// <Link href="/about">About Us</Link>
// <Link href="https://example.com" target="_blank">External Site</Link>
// <Link href="/file.pdf" download>Download PDF</Link>
// <Link href="#section" variant="nav">Jump to Section</Link>
```

```vue [Vue]
<template>
  <component
    :is="componentTag"
    ref="linkRef"
    :href="disabled ? undefined : href"
    :target="target"
    :rel="combinedRel"
    :class="linkClass"
    :aria-disabled="disabled || undefined"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
    <span
      v-if="showExternalIcon && isExternal && !disabled"
      class="external-icon"
      aria-label="opens in new window"
    >
      {{ externalIcon }}
    </span>
  </component>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

/**
 * Link relationship types for the `rel` attribute
 */
type LinkRel = 
  | 'alternate' | 'author' | 'bookmark' | 'canonical' | 'dns-prefetch'
  | 'external' | 'help' | 'icon' | 'license' | 'next' | 'nofollow'
  | 'noopener' | 'noreferrer' | 'pingback' | 'preconnect' | 'prefetch'
  | 'preload' | 'prev' | 'search' | 'stylesheet' | 'tag';

/**
 * Props for the Atomic Link component.
 * Supports all navigation patterns with security and accessibility.
 */
interface LinkProps {
  /**
   * Link destination
   */
  href: string;

  /**
   * Link relationship to current page
   */
  rel?: LinkRel | LinkRel[] | string;

  /**
   * Where to open the linked document
   */
  target?: '_self' | '_blank' | '_parent' | '_top' | string;

  /**
   * Media type of the linked resource
   */
  type?: string;

  /**
   * Language of the linked resource
   */
  hrefLang?: string;

  /**
   * Filename for downloads
   */
  download?: boolean | string;

  /**
   * Visual variant for different link styles
   */
  variant?: 'inline' | 'block' | 'button' | 'nav';

  /**
   * Disable the link
   */
  disabled?: boolean;

  /**
   * Show external link indicator
   */
  showExternalIcon?: boolean;

  /**
   * Custom external link icon
   */
  externalIcon?: string;

  /**
   * Automatically add security attributes for external links
   */
  autoSecure?: boolean;

  /**
   * Additional CSS classes
   */
  class?: string;
}

const props = withDefaults(defineProps<LinkProps>(), {
  variant: 'inline',
  disabled: false,
  showExternalIcon: false,
  externalIcon: '↗',
  autoSecure: true,
});

// Emit events
const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

// Local refs
const linkRef = ref<HTMLAnchorElement | HTMLSpanElement>();

// Computed properties
const componentTag = computed(() => props.disabled ? 'span' : 'a');

const isExternal = computed(() => {
  if (!props.href) return false;
  
  return (
    props.href.startsWith('http://') || 
    props.href.startsWith('https://') || 
    props.href.startsWith('//')
  ) && !props.href.includes(window?.location?.hostname);
});

const combinedRel = computed(() => {
  const secureRel = props.autoSecure && (props.target === '_blank' || isExternal.value)
    ? ['noopener', 'noreferrer']
    : [];

  const relArray = [
    ...(Array.isArray(props.rel) ? props.rel : props.rel ? [props.rel] : []),
    ...secureRel
  ];

  return relArray.join(' ').trim() || undefined;
});

const linkClass = computed(() => {
  const classes = [
    props.class,
    `link-${props.variant}`,
    props.disabled ? 'link-disabled' : null
  ];
  return classes.filter(Boolean).join(' ');
});

// Event handlers
const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault();
    return;
  }
  emit('click', event);
};

// Expose ref for parent access
defineExpose({ linkRef });
</script>

<style scoped>
.link-disabled {
  cursor: not-allowed;
  opacity: 0.6;
  text-decoration: none;
}

.external-icon {
  margin-left: 0.25em;
  font-size: 0.875em;
  opacity: 0.7;
}
</style>

<!-- 
Usage Examples:
<Link href="/about">About Us</Link>
<Link href="https://example.com" target="_blank">External Site</Link>
<Link href="/file.pdf" :download="true">Download PDF</Link>
<Link href="#section" variant="nav">Jump to Section</Link>
-->
```

:::

## Key Features

### **🔗 Universal Navigation**
Handles all link types—internal pages, external sites, anchors, downloads, email links, and telephone links with appropriate semantic markup.

### **🔒 Auto-Security**
Automatically adds `noopener` and `noreferrer` attributes to external links and `target="_blank"` links to prevent security vulnerabilities.

### **🎯 Visual Variants**
Multiple styling variants (inline, block, button, nav) to fit different design contexts while maintaining semantic meaning.

### **♿ Accessibility Complete**
Full keyboard navigation, screen reader support, and proper ARIA attributes for disabled states and external link indicators.

### **📱 Mobile Optimized**
Touch-friendly target sizes and appropriate visual feedback for mobile interactions.

## Common Use Cases

```jsx
// Internal navigation
<Link href="/products">View Products</Link>

// External link with security
<Link 
  href="https://external-site.com" 
  target="_blank"
  showExternalIcon
>
  Visit Partner Site
</Link>

// Download link
<Link 
  href="/files/report.pdf" 
  download="quarterly-report.pdf"
  type="application/pdf"
>
  Download Report
</Link>

// Email link
<Link href="mailto:support@example.com">Contact Support</Link>

// Phone link
<Link href="tel:+1234567890">Call Us</Link>

// Anchor link
<Link href="#pricing" variant="nav">Jump to Pricing</Link>

// Button-styled link
<Link href="/signup" variant="button">Get Started</Link>

// Disabled state
<Link href="/premium" disabled>
  Premium Features (Coming Soon)
</Link>
```

## Navigation Patterns

```jsx
// Breadcrumb navigation
<nav aria-label="Breadcrumb">
  <Link href="/">Home</Link>
  <Link href="/category">Category</Link>
  <Link href="/category/product" aria-current="page">
    Current Product
  </Link>
</nav>

// Main navigation
<nav role="navigation">
  <Link href="/" variant="nav">Home</Link>
  <Link href="/about" variant="nav">About</Link>
  <Link href="/services" variant="nav">Services</Link>
  <Link href="/contact" variant="nav">Contact</Link>
</nav>

// Footer links
<footer>
  <Link href="/privacy">Privacy Policy</Link>
  <Link href="/terms">Terms of Service</Link>
  <Link href="https://social.com" target="_blank" rel="external">
    Follow Us
  </Link>
</footer>
```

## Security Best Practices

```jsx
// External links with security
<Link 
  href="https://untrusted-site.com"
  target="_blank"
  rel="noopener noreferrer external"
>
  External Resource
</Link>

// User-generated content links
<Link 
  href={userSubmittedUrl}
  rel="ugc nofollow"
  target="_blank"
>
  User Link
</Link>

// Sponsored/paid links
<Link 
  href="https://sponsor.com"
  rel="sponsored nofollow"
  target="_blank"
>
  Sponsored Link
</Link>
```

## Accessibility Best Practices

- **Descriptive Text**: Link text should describe the destination or action
- **Context**: Avoid "click here" or "read more" without context
- **External Links**: Indicate when links open in new windows
- **Download Links**: Specify file type and size when relevant
- **Keyboard Navigation**: Ensure links are focusable and have visible focus indicators
- **Screen Readers**: Use `aria-label` or `aria-describedby` for additional context

The Link atom is the foundation of web navigation, connecting content and enabling user journeys while maintaining security, accessibility, and semantic meaning across all interaction patterns.