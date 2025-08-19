# Atomic Image

The **Atomic Image** is your comprehensive media display component that handles the complex world of modern image delivery—from responsive layouts and lazy loading to accessibility requirements and performance optimization. More than just an `<img>` tag, this atom manages loading states, fallback scenarios, and the intricate dance between user experience and technical requirements that make images work beautifully across all devices and connection speeds.

In today's web, images aren't just decorative—they're critical content that needs to load efficiently, display responsively, and remain accessible to all users. This atomic component provides the foundation for everything from product photos and user avatars to complex responsive artwork and performance-optimized galleries.

::: code-group

```tsx [React]
import { forwardRef, useState, useEffect, ImgHTMLAttributes, ReactNode } from "react";

/**
 * Image loading states
 */
type ImageLoadingState = "idle" | "loading" | "loaded" | "error";

/**
 * Accessible Image component props.
 * Extends all standard HTML `<img>` attributes.
 */
export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Image source URL
   */
  src: string;

  /**
   * Alternative text for accessibility (required)
   */
  alt: string;

  /**
   * Fallback image source if main image fails to load
   */
  fallbackSrc?: string;

  /**
   * Loading strategy
   */
  loading?: "lazy" | "eager";

  /**
   * Image decoding hint
   */
  decoding?: "async" | "sync" | "auto";

  /**
   * Show loading indicator
   */
  showLoader?: boolean;

  /**
   * Custom loading indicator
   */
  loader?: ReactNode;

  /**
   * Show error state when image fails to load
   */
  showError?: boolean;

  /**
   * Custom error content
   */
  errorContent?: ReactNode;

  /**
   * Aspect ratio for placeholder sizing
   */
  aspectRatio?: string;

  /**
   * Object fit behavior
   */
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";

  /**
   * Object position
   */
  objectPosition?: string;

  /**
   * Image sizes for responsive behavior
   */
  sizes?: string;

  /**
   * Source set for different resolutions
   */
  srcSet?: string;

  /**
   * Callback when image loads successfully
   */
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;

  /**
   * Callback when image fails to load
   */
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;

  /**
   * Caption text for the image
   */
  caption?: string;

  /**
   * Whether image is decorative (alt will be empty)
   */
  decorative?: boolean;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (props, ref) => {
    const {
      src,
      alt,
      fallbackSrc,
      loading = "lazy",
      decoding = "async",
      showLoader = true,
      loader,
      showError = true,
      errorContent,
      aspectRatio,
      objectFit = "cover",
      objectPosition = "center",
      caption,
      decorative = false,
      className,
      style,
      onLoad,
      onError,
      ...rest
    } = props;

    const [loadingState, setLoadingState] = useState<ImageLoadingState>("idle");
    const [currentSrc, setCurrentSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    // Reset state when src changes
    useEffect(() => {
      setLoadingState("loading");
      setCurrentSrc(src);
      setHasError(false);
    }, [src]);

    const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
      setLoadingState("loaded");
      setHasError(false);
      onLoad?.(event);
    };

    const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
      setLoadingState("error");
      setHasError(true);
      
      // Try fallback if available and not already using it
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        setLoadingState("loading");
        return;
      }
      
      onError?.(event);
    };

    const imageStyle = {
      ...style,
      aspectRatio,
      objectFit,
      objectPosition,
    };

    const containerClass = `image-container ${className || ''}`.trim();
    const imageClass = `image-element ${loadingState}`;

    // Default loader
    const defaultLoader = (
      <div className="image-loader" aria-label="Loading image">
        <span className="loader-spinner"></span>
      </div>
    );

    // Default error content
    const defaultError = (
      <div className="image-error" role="img" aria-label="Image failed to load">
        <span className="error-icon">⚠️</span>
        <span className="error-text">Image unavailable</span>
      </div>
    );

    const imageElement = (
      <img
        ref={ref}
        src={currentSrc}
        alt={decorative ? "" : alt}
        loading={loading}
        decoding={decoding}
        className={imageClass}
        style={imageStyle}
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
      />
    );

    if (caption) {
      return (
        <figure className={containerClass}>
          <div className="image-wrapper">
            {showLoader && loadingState === "loading" && (loader || defaultLoader)}
            {showError && hasError && currentSrc === fallbackSrc && (errorContent || defaultError)}
            {imageElement}
          </div>
          <figcaption className="image-caption">{caption}</figcaption>
        </figure>
      );
    }

    return (
      <div className={containerClass}>
        <div className="image-wrapper">
          {showLoader && loadingState === "loading" && (loader || defaultLoader)}
          {showError && hasError && currentSrc === fallbackSrc && (errorContent || defaultError)}
          {imageElement}
        </div>
      </div>
    );
  }
);

Image.displayName = "Image";

export default Image;

// Usage Examples:
// <Image src="/photo.jpg" alt="Beautiful landscape" />
// <Image src="/avatar.jpg" alt="User profile" aspectRatio="1/1" />
// <Image src="/hero.jpg" alt="Hero image" loading="eager" caption="Our office" />
// <Image src="/icon.svg" alt="" decorative />
```

```vue [Vue]
<template>
  <component
    :is="containerTag"
    :class="containerClass"
  >
    <div class="image-wrapper">
      <!-- Loading state -->
      <div
        v-if="showLoader && loadingState === 'loading'"
        class="image-loader"
        aria-label="Loading image"
      >
        <slot name="loader">
          <span class="loader-spinner"></span>
        </slot>
      </div>

      <!-- Error state -->
      <div
        v-if="showError && hasError && currentSrc === fallbackSrc"
        class="image-error"
        role="img"
        aria-label="Image failed to load"
      >
        <slot name="error">
          <span class="error-icon">⚠️</span>
          <span class="error-text">Image unavailable</span>
        </slot>
      </div>

      <!-- Image element -->
      <img
        ref="imageRef"
        :src="currentSrc"
        :alt="decorative ? '' : alt"
        :loading="loading"
        :decoding="decoding"
        :class="imageClass"
        :style="imageStyle"
        v-bind="$attrs"
        @load="handleLoad"
        @error="handleError"
      />
    </div>

    <!-- Caption -->
    <figcaption
      v-if="caption"
      class="image-caption"
    >
      {{ caption }}
    </figcaption>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

/**
 * Image loading states
 */
type ImageLoadingState = 'idle' | 'loading' | 'loaded' | 'error';

/**
 * Props for the Atomic Image component.
 * Handles loading states, fallbacks, and accessibility.
 */
interface ImageProps {
  /**
   * Image source URL
   */
  src: string;

  /**
   * Alternative text for accessibility (required)
   */
  alt: string;

  /**
   * Fallback image source if main image fails to load
   */
  fallbackSrc?: string;

  /**
   * Loading strategy
   */
  loading?: 'lazy' | 'eager';

  /**
   * Image decoding hint
   */
  decoding?: 'async' | 'sync' | 'auto';

  /**
   * Show loading indicator
   */
  showLoader?: boolean;

  /**
   * Show error state when image fails to load
   */
  showError?: boolean;

  /**
   * Aspect ratio for placeholder sizing
   */
  aspectRatio?: string;

  /**
   * Object fit behavior
   */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

  /**
   * Object position
   */
  objectPosition?: string;

  /**
   * Image sizes for responsive behavior
   */
  sizes?: string;

  /**
   * Source set for different resolutions
   */
  srcSet?: string;

  /**
   * Caption text for the image
   */
  caption?: string;

  /**
   * Whether image is decorative (alt will be empty)
   */
  decorative?: boolean;

  /**
   * Additional CSS classes
   */
  class?: string;
}

const props = withDefaults(defineProps<ImageProps>(), {
  loading: 'lazy',
  decoding: 'async',
  showLoader: true,
  showError: true,
  objectFit: 'cover',
  objectPosition: 'center',
  decorative: false,
});

// Emit events
const emit = defineEmits<{
  load: [event: Event];
  error: [event: Event];
}>();

// Reactive state
const loadingState = ref<ImageLoadingState>('idle');
const currentSrc = ref(props.src);
const hasError = ref(false);
const imageRef = ref<HTMLImageElement>();

// Computed properties
const containerTag = computed(() => props.caption ? 'figure' : 'div');

const containerClass = computed(() => {
  const classes = ['image-container', props.class];
  return classes.filter(Boolean).join(' ');
});

const imageClass = computed(() => `image-element ${loadingState.value}`);

const imageStyle = computed(() => ({
  aspectRatio: props.aspectRatio,
  objectFit: props.objectFit,
  objectPosition: props.objectPosition,
}));

// Watch for src changes
watch(() => props.src, (newSrc) => {
  loadingState.value = 'loading';
  currentSrc.value = newSrc;
  hasError.value = false;
});

// Event handlers
const handleLoad = (event: Event) => {
  loadingState.value = 'loaded';
  hasError.value = false;
  emit('load', event);
};

const handleError = (event: Event) => {
  loadingState.value = 'error';
  hasError.value = true;
  
  // Try fallback if available and not already using it
  if (props.fallbackSrc && currentSrc.value !== props.fallbackSrc) {
    currentSrc.value = props.fallbackSrc;
    loadingState.value = 'loading';
    return;
  }
  
  emit('error', event);
};

// Initialize loading state
loadingState.value = 'loading';

// Expose ref for parent access
defineExpose({ imageRef });
</script>

<style scoped>
.image-container {
  position: relative;
  display: inline-block;
}

.image-wrapper {
  position: relative;
  display: block;
}

.image-element {
  display: block;
  max-width: 100%;
  height: auto;
}

.image-loader,
.image-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
}

.loader-spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-icon {
  font-size: 2rem;
}

.error-text {
  font-size: 0.875rem;
  color: #6b7280;
}

.image-caption {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
}
</style>

<!-- 
Usage Examples:
<Image src="/photo.jpg" alt="Beautiful landscape" />
<Image src="/avatar.jpg" alt="User profile" aspect-ratio="1/1" />
<Image src="/hero.jpg" alt="Hero image" loading="eager" caption="Our office" />
<Image src="/icon.svg" alt="" :decorative="true" />
-->
```

:::

## Key Features

### **⚡ Smart Loading States**
Built-in loading indicators and error handling with automatic fallback support for reliable image display across network conditions.

### **📱 Responsive by Default**
Supports modern responsive image features including `srcset`, `sizes`, and flexible aspect ratios for optimal display on any device.

### **♿ Accessibility Complete**
Proper alt text handling, decorative image support, and screen reader compatibility with loading state announcements.

### **🎨 Flexible Display**
Configurable object-fit, positioning, and aspect ratio control for perfect image presentation in any layout context.

### **⚡ Performance Optimized**
Lazy loading by default, async decoding, and intelligent fallback strategies for optimal user experience.

## Common Use Cases

```jsx
// Basic content image
<Image 
  src="/article-image.jpg" 
  alt="Scientists working in laboratory" 
  caption="Research team at work"
/>

// User avatar with fallback
<Image 
  src="/user-avatar.jpg"
  fallbackSrc="/default-avatar.png" 
  alt="User profile picture"
  aspectRatio="1/1"
  objectFit="cover"
/>

// Hero image with eager loading
<Image 
  src="/hero-banner.jpg"
  alt="Welcome to our platform"
  loading="eager"
  objectFit="cover"
  className="hero-image"
/>

// Responsive product image
<Image 
  src="/product-large.jpg"
  srcSet="/product-small.jpg 400w, /product-medium.jpg 800w, /product-large.jpg 1200w"
  sizes="(max-width: 400px) 100vw, (max-width: 800px) 50vw, 400px"
  alt="Premium headphones"
/>

// Decorative icon
<Image 
  src="/decorative-pattern.svg"
  alt=""
  decorative
  className="background-pattern"
/>

// Gallery thumbnail
<Image 
  src="/thumbnail.jpg"
  alt="Gallery image 1 of 12"
  aspectRatio="4/3"
  objectFit="cover"
  loading="lazy"
/>
```

## Responsive Patterns

```jsx
// Art direction with different crops
<Image 
  src="/hero-desktop.jpg"
  srcSet="/hero-mobile.jpg 600w, /hero-tablet.jpg 1200w, /hero-desktop.jpg 1920w"
  sizes="100vw"
  alt="Product showcase"
/>

// Resolution switching
<Image 
  src="/photo.jpg"
  srcSet="/photo-1x.jpg 1x, /photo-2x.jpg 2x, /photo-3x.jpg 3x"
  alt="High-resolution artwork"
/>

// Size-based switching
<Image 
  src="/default.jpg"
  srcSet="/small.jpg 320w, /medium.jpg 768w, /large.jpg 1200w"
  sizes="(max-width: 320px) 280px, (max-width: 768px) 728px, 1160px"
  alt="Responsive content image"
/>
```

## Performance Patterns

```jsx
// Above-the-fold critical image
<Image 
  src="/hero.jpg"
  alt="Main banner"
  loading="eager"
  decoding="sync"
  priority
/>

// Lazy-loaded gallery
<Image 
  src="/gallery-item.jpg"
  alt="Gallery image"
  loading="lazy"
  decoding="async"
/>

// Progressive enhancement
<Image 
  src="/fallback.jpg"
  srcSet="/modern.webp, /fallback.jpg"
  alt="Progressive image"
/>
```

## Accessibility Best Practices

- **Meaningful Alt Text**: Describe the content and context, not just the visual appearance
- **Decorative Images**: Use empty alt (`alt=""`) or `decorative` prop for purely decorative images
- **Informative Images**: Provide alt text that conveys the same information as the image
- **Complex Images**: Use `aria-describedby` to reference detailed descriptions
- **Loading States**: Announce loading states to screen readers
- **Error States**: Provide meaningful error messages

The Image atom handles the complexity of modern image delivery while maintaining accessibility and performance standards, ensuring your visual content looks great and loads efficiently for all users.