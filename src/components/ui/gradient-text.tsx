import { cn } from "@/lib/utils"
import * as React from "react"

interface GradientTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of colors for the gradient
   * @default ["#ffaa40", "#9c40ff", "#ffaa40"]
   */
  colors?: string[]
  /**
   * Animation duration in seconds
   * @default 8
   */
  animationSpeed?: number
  /**
   * Show animated border
   * @default false
   */
  showBorder?: boolean
}

export function GradientText({
  children,
  className,
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 8,
  showBorder = false,
  ...props
}: GradientTextProps) {
  return (
    <div
      className={cn(
        "relative inline-block",
        className
      )}
      {...props}
    >
      {showBorder && (
        <div
          className="absolute inset-0 rounded-[1.25rem] animate-gradient"
          style={{
            background: `linear-gradient(to right, ${colors.join(", ")})`,
            backgroundSize: "300% 100%",
            animationDuration: `${animationSpeed}s`,
          }}
        >
          <div
            className="absolute inset-0 bg-background rounded-[1.25rem]"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}
      <span
        className="animate-gradient"
        style={{
          background: `linear-gradient(to right, ${colors.join(", ")})`,
          backgroundSize: "300% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animationDuration: `${animationSpeed}s`,
        }}
      >
        {children}
      </span>
    </div>
  )
} 