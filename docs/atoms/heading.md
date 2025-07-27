# Atomic Heading

The **Atomic Heading** is the core title element in our design system, built to be completely style-free, fully accessible, and framework-agnostic. Under the hood it leverages TypeScript’s built-in `HTMLAttributes<HTMLHeadingElement>` and ARIA typings to automatically support every native heading prop and semantic—so you never have to re-declare `id`, `data-*`, `onClick`, `role`, or `aria-level` manually—everything just works and is fully type-checked.

By adopting a single API surface in both React and Vue, this atom guarantees consistent behavior and markup across your codebase. You get sensible defaults (e.g. `level=1`, `role="heading"`, `aria-level=1`), ref-forwarding, and seamless attribute forwarding (`...rest`)—all without extra boilerplate. Drop this atom into any component, style it however you like, and know that semantic structure, keyboard navigation, and assistive-technology support are already taken care of.

::: code-group

```tsx [React]
import React, { forwardRef, type ElementType } from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
// Support string values for JSX attributes as well (e.g., <Heading level="2" />)
type HeadingLevelString = `${HeadingLevel}`;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading level (1–6) */
  level?: HeadingLevel | HeadingLevelString;
  /** Render as a different tag if needed */
  as?: ElementType;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level, as, children, ...rest }, ref) => {
    // Normalize level to numeric 1–6
    const numericLevel: HeadingLevel = ((): HeadingLevel => {
      if (typeof level === "string") {
        const parsed = parseInt(level, 10) as HeadingLevel;
        if (parsed >= 1 && parsed <= 6) return parsed;
      }
      return (level as HeadingLevel) ?? 1;
    })();

    // Determine tag: <h1>–<h6> or custom
    const Tag = (as || (`h${numericLevel}` as ElementType)) as ElementType;

    return (
      <Tag
        ref={ref}
        {...rest}
        role={rest.role || "heading"}
        aria-level={numericLevel}
      >
        {children}
      </Tag>
    );
  }
);

Heading.displayName = "Heading";

// Usage examples:
// <Heading level={2} id="section-title">Section Title</Heading>
// <Heading level="3">Subheading as string prop</Heading>
// <Heading as="div" level={4}>Custom element


```

```vue [Vue]
<template>
  <component
    :is="tag"
    v-bind="attrs"
    :role="attrs.role || 'heading'"
    :aria-level="numericLevel"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAttrs } from 'vue';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
// Allow string values for template usage
type HeadingLevelString = `${HeadingLevel}`;

interface Props {
  level?: HeadingLevel | HeadingLevelString;
  as?: string;
}

const props = defineProps<Props>();
const attrs = useAttrs();

// Normalize numeric level
const numericLevel = computed<HeadingLevel>(() => {
  const lvl = props.level;
  if (typeof lvl === 'string') {
    const parsed = parseInt(lvl, 10) as HeadingLevel;
    if (parsed >= 1 && parsed <= 6) return parsed;
  }
  return (props.level as HeadingLevel) ?? 1;
});

// Determine tag
const tag = computed(() => props.as || `h${numericLevel.value}`);
</script>

<!-- Usage:
<Heading level="3" id="main-title">Main Title</Heading>
<Heading as="hgroup" level="2">Grouped Heading</Heading>
-->

```

:::