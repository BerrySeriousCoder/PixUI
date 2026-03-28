import { z } from "zod";

export const uiAnalysisSchema = z.object({
  component_type: z
    .string()
    .describe(
      "Identify the component type using a clear, specific name. Examples: 'pricing-card', 'testimonial-slider', 'stats-dashboard', 'multi-step-form', 'file-upload-dropzone'. Use kebab-case. Be as specific as possible — prefer 'user-profile-card' over 'card'.",
    ),

  layout_structure: z
    .string()
    .describe(
      "Describe the full layout hierarchy in detail. Specify the CSS layout model used (grid, flexbox, absolute positioning). Include the number of rows/columns, alignment, and nesting depth. Example: 'Root is a flex-col container. Inside: a top image section (aspect-ratio 16:9), followed by a flex-col content block with a heading, a paragraph, and a row of 2 buttons aligned to the right using justify-end.'",
    ),

  dimensions: z.object({
    aspect_ratio: z
      .string()
      .describe(
        "Report the overall aspect ratio of the entire component (e.g., '16:9', '4:3', '1:1', 'auto'). If the component contains child elements with their own distinct aspect ratios (e.g., an image thumbnail), mention those too. Return 'auto' if no clear ratio is discernible.",
      ),
    relative_size: z
      .string()
      .describe(
        "Describe how much horizontal viewport space this component is designed to occupy. Examples: 'max-w-sm (small card)', 'max-w-2xl (medium content block)', 'full-width with container padding', 'fixed-width sidebar ~280px'. Be specific about the intended max-width.",
      ),
    padding_class: z
      .string()
      .describe(
        "Estimate the Tailwind padding and gap classes for the main container AND key child elements. Format as a comma-separated list. Example: 'Container: p-6, Inner content: space-y-4, Button row: gap-3, Image section: p-0'. Be granular — don't just say 'p-4'.",
      ),
  }),

  colors: z.object({
    background: z
      .string()
      .describe(
        "Provide the exact hex color code for the main container background. If it's a gradient, describe it fully (e.g., 'linear-gradient from #1a1a2e to #16213e'). If it maps cleanly to a Tailwind color, also mention it (e.g., '#ffffff / bg-white').",
      ),
    primary_text: z
      .string()
      .describe(
        "Provide the exact hex color code for the primary heading/body text. Include the Tailwind equivalent if obvious (e.g., '#111827 / text-gray-900'). If headings and body text differ in color, report both.",
      ),
    accent: z
      .string()
      .describe(
        "Provide the exact hex color code used for interactive elements like buttons, links, active indicators, or highlighted badges. Include what elements use this color (e.g., '#3b82f6 / bg-blue-500 — used on primary CTA button and active tab indicator').",
      ),
    border: z
      .string()
      .optional()
      .describe(
        "If borders, dividers, or box-shadows are visible, describe them precisely. Example: '1px solid #e5e7eb / border-gray-200 on card edge, plus shadow-sm'. Return nothing if no borders or shadows are present.",
      ),
  }),

  typography: z.object({
    heading_classes: z
      .string()
      .describe(
        "Estimate the full set of Tailwind typography classes for the primary heading. Include size, weight, tracking, line-height, and color. Example: 'text-2xl font-bold tracking-tight leading-snug text-gray-900'. If there are multiple heading levels visible, describe each.",
      ),
    body_classes: z
      .string()
      .describe(
        "Estimate the full set of Tailwind typography classes for the body/description text. Example: 'text-sm font-normal leading-relaxed text-gray-500'. If there are secondary labels or captions, describe those too.",
      ),
    font_family: z
      .string()
      .describe(
        "Identify the likely font family. Look for visual cues: rounded letterforms suggest sans-serif (Inter, Plus Jakarta Sans), high x-height with geometric shapes suggest Geist/DM Sans, monospaced digits suggest a mono font for stats. Report your best guess, e.g., 'sans-serif (likely Inter or system-ui)'.",
      ),
  }),

  elements: z
    .array(
      z.object({
        element_type: z
          .string()
          .describe(
            "The semantic type of this element. Be specific: 'primary-cta-button', 'avatar-image', 'status-badge', 'text-input-with-label', 'icon-button', 'section-heading', 'descriptive-paragraph', 'price-value', 'star-rating'.",
          ),
        content: z
          .string()
          .describe(
            "If text is visible, reproduce it EXACTLY as shown (preserve casing, punctuation). For images, describe what the image depicts. For icons, name the closest Lucide icon match (e.g., 'lucide: ArrowRight', 'lucide: Check').",
          ),
        position: z
          .string()
          .describe(
            "Describe the precise position within the layout hierarchy. Example: 'Inside the bottom action-bar, aligned to the right, after the secondary button'. Use parent-child relationships, not just 'top' or 'bottom'.",
          ),
        style_notes: z
          .string()
          .describe(
            "Report ALL notable visual styles: border-radius, shadows, opacity, gradients, icon size, badge colors, hover indicators, disabled states. Example: 'rounded-full, bg-green-100 text-green-700, text-xs font-medium, px-2.5 py-0.5'.",
          ),
      }),
    )
    .describe(
      "List EVERY significant visual element in the component from top to bottom, left to right. Do not skip decorative elements, dividers, or icons. Each entry should be detailed enough for a developer to recreate it without seeing the original image.",
    ),

  interactions: z
    .array(z.string())
    .describe(
      "List every potential interactive behavior. For each, describe the trigger and the expected visual change. Examples: 'Hover on primary button: background darkens from bg-blue-500 to bg-blue-600, cursor pointer', 'Focus on input: ring-2 ring-blue-500 ring-offset-2', 'Card hover: translateY(-2px) with shadow-lg transition'. Infer from visual cues even if not explicitly shown.",
    ),

  design_system_hints: z
    .array(z.string())
    .describe(
      "List the exact shadcn/ui components that should be composed together to build this. Be specific about hierarchy. Example: ['Card as outer wrapper', 'CardHeader containing title and description', 'CardContent for the body', 'Button variant=default for primary CTA', 'Badge variant=secondary for status tag', 'Separator between content and footer', 'CardFooter with justify-end for action buttons'].",
    ),

  complexity: z
    .string()
    .describe(
      "Assess complexity based on: number of distinct elements, nesting depth, number of interactive states, responsive breakpoint needs, and animation requirements. Example: 'Medium — 8 elements, 2-level nesting, 3 interactive states, needs md: breakpoint adjustments'.",
    ),
});

export type UIAnalysis = z.infer<typeof uiAnalysisSchema>;
