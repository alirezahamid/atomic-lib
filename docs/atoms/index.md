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

## Common Types of Atoms

- **Typography**
  - Headings:  
    ```html
    <h1> … </h1> … <h6> … </h6>
    ```
  - Paragraphs:  
    ```html
    <p> … </p>
    ```
  - Inline text:  
    ```html
    <span> … </span>
    <strong> … </strong>
    <em> … </em>
    ```

- **Form Controls**
  - Text inputs:  
    ```html
    <input type="text" />
    <input type="email" />
    ```
  - Textarea:  
    ```html
    <textarea></textarea>
    ```
  - Select:  
    ```html
    <select>
      <option>Option 1</option>
    </select>
    ```
  - Button / Submit:  
    ```html
    <button>Click me</button>
    <input type="submit" value="Send" />
    ```

- **Media & Icons**
  - Images:  
    ```html
    <img src="…" alt="…" />
    <svg> … </svg>
    ```
  - Icons (inline SVG or icon font):  
    ```html
    <svg class="icon"> … </svg>
    ```

- **Interactive Elements**
  - Links:  
    ```html
    <a href="…">Learn more</a>
    ```
  - Checkbox / Radio:  
    ```html
    <input type="checkbox" />
    <input type="radio" />
    ```

- **Layout Helpers**
  - Container:  
    ```html
    <div> … </div>
    <span> … </span>
    ```
  - Divider:  
    ```html
    <hr />
    ```

> **Tip:** When documenting each atom in your VitePress site, include:
> - **Usage**: Markdown snippets showing how to import and render the atom  
> - **Props / Variants**: Configurable options (e.g. sizes, states)  
> - **Anatomy**: A simple diagram or bullet list of sub-elements (if any)  
> - **Accessibility notes**: ARIA roles, keyboard behavior, label requirements  
> - **Design tokens**: Colors, typography, or spacing variables used  

---

_By starting with a clear, well-documented set of atoms, you lay the groundwork for predictable, maintainable, and scalable UI code. From here, you’ll compose molecules and organisms that bring these atoms together into rich, real-world interfaces._  
