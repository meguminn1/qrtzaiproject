# QRTZ AI - Design Guidelines

## Design Approach
**System-Based Approach** with modern chat interface patterns inspired by Linear, ChatGPT, and Claude. Focus on technical precision, minimalist aesthetics, and developer-focused UX.

**Core Principles:**
- Engineering clarity over decorative elements
- Fast, distraction-free interaction
- Information density without clutter
- Professional technical aesthetic

---

## Typography

**Font Family:**
- Primary: Inter (Google Fonts) - body, messages, UI elements
- Monospace: JetBrains Mono (Google Fonts) - code blocks, technical output

**Scale:**
- Chat messages: text-sm to text-base (14-16px)
- User input: text-base (16px)
- Headers/titles: text-lg to text-xl (18-20px)
- Code blocks: text-sm (14px)
- Timestamps: text-xs (12px)

**Weights:**
- Regular (400) - message content
- Medium (500) - user names, labels
- Semibold (600) - headers, emphasis

---

## Layout System

**Spacing Primitives:**
- Micro spacing: 2, 3, 4 units (gaps, padding)
- Component spacing: 4, 6, 8 units (cards, buttons)
- Section spacing: 8, 12, 16 units (major layout areas)

**Grid Structure:**
- Single column chat layout (max-w-4xl centered)
- Input area: fixed bottom, full-width with inner max-w-4xl
- Sidebar (future): 280px fixed width

---

## Core Components

### Chat Container
- Full viewport height layout
- Three zones: header (fixed top), messages (scrollable center), input (fixed bottom)
- Messages area: py-6, smooth scroll behavior
- Gradient background treatment as per reference image

### Message Bubbles

**User Messages:**
- Right-aligned
- Max width: 85% on desktop, 90% on mobile
- Padding: px-4 py-3
- Rounded corners: rounded-2xl
- Spacing between messages: mb-4

**Assistant Messages:**
- Left-aligned
- Max width: 85% on desktop, 90% on mobile
- Padding: px-4 py-3
- Rounded corners: rounded-2xl
- Spacing: mb-4
- Support for code blocks, lists, and formatted content

**Message Metadata:**
- Timestamp: text-xs, positioned below bubble
- Status indicators: subtle, non-intrusive

### Input Area

**Layout:**
- Fixed bottom positioning with backdrop blur
- Inner container: max-w-4xl, mx-auto, px-4
- Padding: py-4 to py-6

**Input Field:**
- Multi-line textarea with auto-resize (max 6 lines before scroll)
- Padding: px-4 py-3
- Rounded: rounded-2xl
- Min height: 56px
- Placeholder: "Message QRTZ AI..."

**Action Icons Row:**
- Left side: attachment, deep search, search, voice icons
- Right side: send button (primary action)
- Icon size: 20-24px
- Spacing: gap-2 to gap-3
- Use Heroicons or Lucide icons via CDN

**Send Button:**
- Circular or rounded square
- Size: 40-44px
- Icon: paper airplane or arrow
- Positioned right side of input
- Disabled state when input empty

### Code Blocks
- Background treatment distinct from messages
- Syntax highlighting support structure
- Copy button in top-right corner
- Monospace font (JetBrains Mono)
- Padding: px-4 py-3
- Rounded: rounded-lg
- Language label in top-left

### Header (Optional Top Bar)
- Height: 60-64px
- Logo/branding: left-aligned
- Optional: model selector, settings icon
- Subtle bottom border or shadow

---

## Interaction Patterns

**Scrolling:**
- Auto-scroll to bottom on new messages
- Smooth scroll behavior
- Scroll-to-bottom button when user scrolls up

**Input Behavior:**
- Enter to send, Shift+Enter for newline
- Auto-focus on load
- Clear input after sending
- Show typing indicator while AI responds

**Message Loading:**
- Streaming text animation for assistant responses
- Subtle skeleton/pulse for loading state
- No heavy spinners

**Icons:**
- Use Heroicons outline style for consistency
- Size: w-5 h-5 (20px) for action icons
- Subtle hover state (opacity or slight scale)

---

## Accessibility

- Keyboard navigation: Tab through all interactive elements
- Focus visible states on all inputs and buttons
- ARIA labels for icon buttons
- Screen reader announcements for new messages
- Sufficient contrast for all text
- Maintain 44px minimum touch targets on mobile

---

## Responsive Behavior

**Desktop (1024px+):**
- Max width container: 896px (max-w-4xl)
- Side padding: px-6 to px-8
- Full feature set visible

**Tablet (768-1023px):**
- Max width: 768px
- Side padding: px-4
- Slightly smaller spacing

**Mobile (<768px):**
- Full width with px-4 padding
- Stack icon actions if needed
- Reduce message bubble max-width to 90%
- Input area: py-3

---

## Animation Guidelines

**Minimal Approach - Use Sparingly:**
- Message appearance: subtle fade-in (150ms)
- Button hover: opacity transition (100ms)
- Input focus: border transition (150ms)
- Scroll behavior: smooth
- NO complex animations, parallax, or scroll-triggered effects

---

## Asset Requirements

**Icons:**
- Primary library: Heroicons (outline style) via CDN
- Icons needed: paper-clip (attach), magnifying-glass-circle (deep search), magnifying-glass (search), microphone (voice), paper-airplane (send), clipboard (copy code)
- Fallback: Lucide React icons

**Fonts:**
- Google Fonts CDN links for Inter and JetBrains Mono
- Load weights: 400, 500, 600

**Images:**
- No hero images required
- Logo/branding asset: simple SVG or text-based
- Avatar placeholders: user (U) and assistant (Q) initials in circles

---

## Technical Quality Standards

- Semantic HTML5 elements
- Proper heading hierarchy
- Focus management for modal/overlays if added
- Optimized bundle size (minimize dependencies)
- Fast initial load (<2s)
- Smooth 60fps interactions
- Production-ready code quality from start