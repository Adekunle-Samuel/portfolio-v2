# Sanity Assets - Example Data

This document provides example data for each content type to help you get started quickly.

## Site Settings Example

```javascript
{
  name: "Sam Adekunle",
  profileImage: {
    // Upload image in Sanity Studio
    asset: { _ref: "image-abc123..." }
  },
  tagline: "I am a designer working at the intersection of product, brand and development.",
  email: "hello@samadekunle.com",
  socialLinks: {
    linkedin: "https://linkedin.com/in/samadekunle",
    github: "https://github.com/samadekunle",
    twitter: "https://twitter.com/samadekunle",
    dribbble: "https://dribbble.com/samadekunle",
    behance: "https://behance.net/samadekunle"
  }
}
```

---

## Stack Items Examples

### Example 1: Figma
```javascript
{
  name: "Figma",
  description: "The design tool. Everyone uses it for a reason. The MCP is getting better everyday too.",
  icon: {
    // Upload Figma logo in Sanity Studio
    asset: { _ref: "image-figma123..." }
  },
  iconEmoji: "🎨", // Fallback if no icon image
  color: "#A855F7",
  order: 1,
  url: "https://figma.com"
}
```

### Example 2: Cursor
```javascript
{
  name: "Cursor",
  description: "AI-assisted development that actually gets it.",
  iconEmoji: "⚡", // Using emoji instead of image
  color: "#000000",
  order: 2,
  url: "https://cursor.sh"
}
```

### Example 3: Adobe Creative Suite
```javascript
{
  name: "Adobe Creative Suite",
  description: "Photoshop, After Effects and Illustrator — classic tools, still unmatched.",
  iconEmoji: "🅰️",
  color: "#FF0000",
  order: 3,
  url: "https://adobe.com"
}
```

### Example 4: Claude
```javascript
{
  name: "Claude",
  description: "My go-to LLM for thoughtful, nuanced responses.",
  iconEmoji: "🧠",
  color: "#D97706",
  order: 4,
  url: "https://claude.ai"
}
```

### Example 5: ChatGPT
```javascript
{
  name: "ChatGPT",
  description: "Fast, versatile, great for ideation and research.",
  iconEmoji: "💬",
  color: "#10B981",
  order: 5,
  url: "https://chatgpt.com"
}
```

---

## About Page Example

```javascript
{
  title: "About Me",
  bioParagraphs: [
    {
      text: "I'm Sam Adekunle, a designer who works across product, brand, and code. I focus on making things that look right, feel intuitive, and actually work."
    },
    {
      text: "I've built design systems, shaped brand narratives, and shipped full-stack products, from identity work that resonates to interfaces that feel effortless. My experience spans agencies, education, fintech, and pharma, where I learned to design for both emotion and complexity, balancing clarity with constraint."
    },
    {
      text: "Right now, I'm exploring the intersection of creativity and technology, combining design tools with development, systems thinking with storytelling, and AI with product strategy. Whether I'm prototyping an idea, defining a visual language, or building a brand from scratch, I'm always working toward the same thing: making concepts real, intentional, and built to scale."
    },
    {
      text: "I'm currently seeking opportunities where I can bring this blend of craft, systems thinking, and technical execution to a team that values thoughtful design and bold ideas. I'm looking to contribute depth, adaptability, and a drive to build things that matter."
    },
    {
      text: "Outside of client work, I'm usually testing AI tools, tweaking layouts until they click, or building side projects to push what's possible."
    }
  ],
  workExperience: [
    {
      company: "B150",
      role: "Product Designer",
      period: "2025–Present",
      description: "Leading product design for a fast-growing startup.",
      order: 1
    },
    {
      company: "Ernst & Young (EY)",
      role: "Production Designer (Contract)",
      period: "2024–2025",
      description: "Designed high-impact marketing materials and brand assets.",
      order: 2
    },
    {
      company: "Rowan College at Burlington County",
      role: "Visual Designer",
      period: "2022–2024",
      description: "Created visual identities and designed digital experiences for education.",
      order: 3
    }
  ]
}
```

---

## Brand Colors Reference

Here are some common brand colors you might use for your stack items:

```javascript
// Design Tools
Figma:            "#F24E1E" or "#A855F7"
Adobe:            "#FF0000" or "#ED2224"
Sketch:           "#FDB300"
Framer:           "#000000"

// Development
VS Code:          "#007ACC"
Cursor:           "#000000"
GitHub:           "#181717"
Vercel:           "#000000"

// AI Tools
ChatGPT:          "#10A37F" or "#10B981"
Claude:           "#D97706" or "#F59E0B"
Midjourney:       "#7B68EE"

// Others
Notion:           "#000000"
Slack:            "#E01E5A"
Linear:           "#5E6AD2"
```

---

## Tips for Writing Good Descriptions

### Stack Items:
- Keep it personal - how *you* use the tool
- Be specific about what makes it valuable
- 1-2 sentences is ideal
- Examples:
  - ✅ "My go-to LLM for thoughtful, nuanced responses."
  - ✅ "AI-assisted development that actually gets it."
  - ❌ "A tool for design." (too generic)
  - ❌ "This is the best tool ever and I use it for everything..." (too long)

### Bio Paragraphs:
- One main idea per paragraph
- Mix professional achievements with personal approach
- Show personality while staying professional
- Structure: Who you are → What you've done → What you do now → What you're looking for → Personal touch

### Work Experience:
- Use em dashes (–) for periods, not hyphens (-)
- Format: "2024–Present" or "2022–2024"
- Add descriptions only if they add meaningful context
- Order: Most recent first (order: 1)

---

## Emoji Ideas for Stack Items

If you don't have icon images, here are some emoji suggestions:

```
Design:         🎨 🖌️ ✏️ 🎭 🌈
Development:    💻 ⚡ 🚀 ⚙️ 🔧
AI/ML:          🤖 🧠 💡 ✨ 🎯
Communication:  💬 📱 💌 🗣️ 📢
Analytics:      📊 📈 🔍 📉 🎲
Productivity:   ⚡ 🚀 ✅ 📝 🎯
```

---

## Import Script (Optional)

If you want to quickly populate all the default data, you can use Sanity's API or the Studio UI. Here's how to do it via the Studio:

1. Go to `/studio`
2. Create **one** "Site Settings" document
3. Create **five** "Stack Item" documents (or however many tools you have)
4. Create **one** "About Page" document
5. Fill in the fields using the examples above
6. Click **Publish** for each document

That's it! Your content will immediately appear on your site.


