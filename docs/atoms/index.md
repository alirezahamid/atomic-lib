# Overview

## Atoms

**Atoms** are the foundational building blocks in Brad Frost’s Atomic Design methodology. In chemistry, atoms are the smallest units of matter that retain their own properties. In UI design, atoms play a similar role: they are the simplest, indivisible elements of the interface.

## Key Characteristics
- **Single-purpose**  
  Each atom does exactly one thing—rendering text, an icon, or a form control—and does it well.
- **Semantic & Accessible**  
  Atoms map 1:1 to semantic HTML elements (e.g. `<button>`, `<input>`, `<h1>`), ensuring clear markup and baseline accessibility.
- **Style-agnostic foundation**  
  While atoms may carry default styles (typography, color, spacing), they shouldn’t depend on other components or complex CSS. They establish the core design tokens that higher-level components inherit.
- **Reusability**  
  Because atoms are self-contained, you can drop the same atomic component anywhere in your application without side effects.

## Why Atoms Matter
1. **Consistency**  
   Standardizing elemental pieces—buttons, form fields, icons—ensures uniform behavior, look, and feel across every page and component.
2. **Scalability**  
   A robust atom library makes it easy to assemble larger components (“molecules” and “organisms”) without reinventing the wheel each time.
3. **Maintainability**  
   Fix or update an atom once, and every instance in your ecosystem automatically benefits from the change.

## Available Atomic Components

### **Form & Interactive Elements**
- **[Button](/atoms/button)** - Clickable actions and form submissions with full accessibility  
- **[Input](/atoms/input)** - Universal input component supporting all HTML input types  
- **[Label](/atoms/label)** - Semantic form labeling with required field indicators  
- **[Textarea](/atoms/textarea)** - Multi-line text input with auto-resize capabilities  
- **[Select](/atoms/select)** - Dropdown selection with option grouping support  

### **Typography & Content**
- **[Heading](/atoms/heading)** - Semantic headings (h1-h6) with flexible rendering  
- **[Paragraph](/atoms/paragraph)** - Text content with typography variants and responsive sizing  
- **[Span](/atoms/span)** - Inline content styling with badges, emphasis, and interactions  

### **Navigation & Media**  
- **[Link](/atoms/link)** - Navigation component with security and accessibility features
- **[Image](/atoms/image)** - Responsive images with loading states and fallbacks

### **Quick Reference**

| Component | Use Case | Key Features |
|-----------|----------|--------------|
| Button | Actions, submissions | ARIA support, variants, disabled states |
| Input | Data collection | All input types, validation, mobile optimization |
| Label | Form accessibility | Required indicators, screen reader support |  
| Textarea | Multi-line text | Auto-resize, character counting |
| Select | Option selection | Single/multi-select, option grouping |
| Heading | Content hierarchy | Semantic levels, flexible rendering |
| Paragraph | Text content | Typography variants, responsive sizing |
| Span | Inline styling | Badges, code, emphasis, interactions |
| Link | Navigation | Security, external indicators, variants |
| Image | Media display | Responsive, loading states, accessibility |

### **Framework Support**
Each atomic component includes:
- **React** implementation with TypeScript support
- **Vue** implementation with Composition API  
- **Full accessibility** with ARIA attributes and keyboard navigation
- **Zero styling** - bring your own design system
- **Semantic HTML** foundation for SEO and screen readers

> **Tip:** When documenting each atom in your VitePress site, include:
> - **Usage**: Markdown snippets showing how to import and render the atom  
> - **Props / Variants**: Configurable options (e.g. sizes, states)  
> - **Anatomy**: A simple diagram or bullet list of sub-elements (if any)  
> - **Accessibility notes**: ARIA roles, keyboard behavior, label requirements  
> - **Design tokens**: Colors, typography, or spacing variables used  

---

_By starting with a clear, well-documented set of atoms, you lay the groundwork for predictable, maintainable, and scalable UI code. From here, you’ll compose molecules and organisms that bring these atoms together into rich, real-world interfaces._  
