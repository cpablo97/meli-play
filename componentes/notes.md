# Card omponent

https://www.figma.com/design/EVCEu4TPFHOPwOweW8kTCY/Mercado-play-Familia-y-Amigos?node-id=51-2313&t=PksKp3BxRONq0EWf-4

## Task
Create an interactive recomendation card component that matches the Figma design with these behaviors:

### Core Functionality
- **Two states**: "Closed" state shows minimal information, "Open" state when the user clicks over the component chevron and shows the description.
- **State switching**: Component changes appearance between states
- **Variants**: The component can show one or multiple recomendations within the same card
### Required Interactions
1. **Default state**: Component shows initial appearance from Figma
3. **Hover state**: The card changes on click and shows more information per recomendation
2. **Click card**: Ease out in 150ms

### Technical Requirements
- **Framework**: Use React
- **Styling**: Match Figma specs exactly (colors, fonts, spacing, borders)
- **Icons**: Implement material symbols as the icon library for this component
- **Responsive**: This is a native mobile component
- **Accessible**: Keyboard navigation + screen reader support
- **Events**: Emit changes so parent components can respond

### Implementation Guide
1. **Analyze Figma**: Identify the two states and their visual differences
2. **Extract tokens**: Colors, typography, spacing, border radius from design
3. **Plan interactions**: Map user actions to state changes
4. **Build component**: Start with static states, add interactivity
5. **Test thoroughly**: Verify all interactions work across devices

### Success Criteria
✅ Visual design matches Figma exactly  
✅ State transitions work smoothly  
✅ Accessible via keyboard and screen readers  
✅ Works on mobile and desktop  

**Deliverable**: Functional card component that replicates Figma design with full interactivity.