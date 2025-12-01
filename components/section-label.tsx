import { cn } from "@/lib/utils"

type SectionLabelTone = "dark" | "light"
type SectionLabelAlign = "left" | "center" | "right"
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p" | "div"

interface SectionLabelProps {
  text: string
  as?: HeadingTag
  tone?: SectionLabelTone
  align?: SectionLabelAlign
  className?: string
  textClassName?: string
  showDivider?: boolean
}

export function SectionLabel({
  text,
  as = "h2",
  tone = "dark",
  align = "center",
  className,
  textClassName,
  showDivider = true,
}: SectionLabelProps) {
  const Tag = as

  const toneStyles =
    tone === "light"
      ? {
          text: "text-white drop-shadow-[0_6px_24px_rgba(8,22,35,0.35)]",
          line: "via-white/60 to-white/20",
          dot: "bg-white/85",
        }
      : {
          text: "text-[#B38538] drop-shadow-[0_4px_20px_rgba(8,22,35,0.18)]",
          line: "via-[#B38538]/60 to-[#B38538]/30",
          dot: "bg-[#B38538]",
        }

  const alignmentStyles =
    align === "left"
      ? {
          wrapper: "items-start text-left",
          divider: "justify-start",
        }
      : align === "right"
        ? {
            wrapper: "items-end text-right",
            divider: "justify-end",
          }
        : {
            wrapper: "items-center text-center",
            divider: "justify-center",
          }

  return (
    <div className={cn("flex flex-col gap-2 sm:gap-3", alignmentStyles.wrapper, className)}>
      <Tag className={cn("imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none tracking-wide", toneStyles.text, textClassName)}>
        {text}
      </Tag>
      {showDivider && (
        <div className={cn("flex items-center gap-2 sm:gap-3", alignmentStyles.divider)}>
          <span className={cn("h-px w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent", toneStyles.line)} />
          <span className={cn("w-2 h-2 rounded-full", toneStyles.dot)} />
          <span className={cn("h-px w-12 sm:w-16 md:w-20 bg-gradient-to-l from-transparent", toneStyles.line)} />
        </div>
      )}
    </div>
  )
}

