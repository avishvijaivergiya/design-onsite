# HealthBook Animation System

A comprehensive animation system for the HealthBook UI components, designed to create smooth, consistent, and meaningful interactions.

## Core Animation Principles

### 1. Timing
- Base transition speed: 200ms
- Easing function: cubic-bezier(0.4, 0, 0.2, 1)
- Dynamic timing for content transitions: 100ms per element (capped at 400ms)

### 2. Scale Transforms
- Hover scale: 1.02 (2% increase)
- Active/Click scale: 1.05 (5% increase)
- All scale transforms maintain the element's original position

### 3. Content Transitions
- New content slides in from top with fade
- Existing content smoothly shifts down
- Transition duration based on content size
- Smooth height animations for expanding/collapsing elements

## Animation Classes

### Base Scale Animation
- Use for elements that should scale on hover/active states
- Automatically handles transform transitions
- Example: `<div class="animate-scale">Scalable Content</div>`

### Content Shift System

- Use for elements that need to animate in/out
- Handles height, opacity, and position transitions
- Example: `<div class="content-shift">Dynamic Content</div>`

## Component-Specific Animations

### Buttons
- Scale up on hover (2%)
- Scale up further on click (5%)
- Smooth color transitions
- Hardware-accelerated transforms

### Form Inputs
- Scale up slightly on focus
- Smooth border color transitions
- Subtle hover states

### Checkboxes & Radio Buttons
- Scale up on hover
- Smooth state transitions
- Custom check/radio animations

### Dropdowns
- Scale up on focus
- Smooth border transitions
- Custom arrow animation

## Usage

1. Include the animation system:

2. For dynamic content transitions:

## Animation Rules

1. **Scale Rule**
   - Elements scale up on hover/focus
   - Scale amount is proportional to element size
   - Larger elements use smaller scale factors

2. **Content Timing Rule**
   - Transition time = 100ms × number of elements
   - Maximum transition time capped at 400ms
   - Minimum transition time is 200ms

3. **Content Shift Rule**
   - New content pushes existing content down
   - Transitions are smooth and proportional
   - Content shifts maintain document flow

4. **Hardware Acceleration**
   - Use `will-change: transform` for performance
   - Apply to elements with frequent animations
   - Remove when animations complete

## Best Practices

1. **Performance**
   - Use `will-change` sparingly
   - Avoid animating expensive properties (layout, paint)
   - Prefer transform and opacity animations

2. **Accessibility**
   - Respect reduced-motion preferences
   - Ensure animations don't interfere with screen readers
   - Provide alternative states for non-animated views

3. **Consistency**
   - Use predefined animation tokens
   - Maintain consistent timing across similar interactions
   - Follow the established scale factors

## Implementation Example
