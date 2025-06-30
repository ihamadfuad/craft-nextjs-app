import { cn } from "@/lib/utils"

type StackProps = React.HTMLAttributes<HTMLDivElement> & {
  padding?: string
  spacingX?: string
  spacingY?: string
  marginTop?: string
  marginBottom?: string
  marginLeading?: string
  marginTrailing?: string
  alignment?: string
}

export function VSpacer() {
  return <div className="flex flex-col h-full" />
}

export function HSpacer() {
  return <div className="flex flex-row w-full" />
}

export function VStack({
  padding, spacingX, spacingY,
  marginTop, marginBottom, marginLeading, marginTrailing,
  alignment, className, ...props }: StackProps) {
  return <div className={
    cn(
      "flex flex-col w-screen h-screen",
      padding ? `p-${padding}` : "p-0",
      spacingX ? `space-x-${spacingX}` : "",
      spacingY ? `space-y-${spacingY}` : "",
      marginTop ? `mt-${marginTop}` : "",
      marginBottom ? `mb-${marginBottom}` : "",
      marginLeading ? `ml-${marginLeading}` : "",
      marginTrailing ? `mr-${marginTrailing}` : "",
      alignment ? `items-${alignment} justify-${alignment} text-${alignment}` : "",
      className
    )}
    {...props}
  />
}

export function HStack({
  padding, spacingX, spacingY,
  marginTop, marginBottom, marginLeading, marginTrailing,
  alignment, className, ...props }: StackProps) {
  return <div className={
    cn(
      "flex flex-row w-screen h-screen",
      padding ? `p-${padding}` : "p-0",
      spacingX ? `space-x-${spacingX}` : "",
      spacingY ? `space-y-${spacingY}` : "",
      marginTop ? `mt-${marginTop}` : "",
      marginBottom ? `mb-${marginBottom}` : "",
      marginLeading ? `ml-${marginLeading}` : "",
      marginTrailing ? `mr-${marginTrailing}` : "",
      alignment ? `items-${alignment} justify-${alignment} text-${alignment}` : "",
      className
    )}
    {...props}
  />
}

export function ZStack({
  padding, spacingX, spacingY,
  marginTop, marginBottom, marginLeading, marginTrailing,
  alignment, className, ...props }: StackProps) {
  return <div className={
    cn(
      "reletive w-screen h-screen",
      padding ? `p-${padding}` : "p-0",
      spacingX ? `space-x-${spacingX}` : "",
      spacingY ? `space-y-${spacingY}` : "",
      marginTop ? `mt-${marginTop}` : "",
      marginBottom ? `mb-${marginBottom}` : "",
      marginLeading ? `ml-${marginLeading}` : "",
      marginTrailing ? `mr-${marginTrailing}` : "",
      alignment ? `items-${alignment} justify-${alignment} text-${alignment}` : "",
      className
    )}
    {...props}
  />
  }

  type ContentProps = React.HTMLAttributes<HTMLDivElement> & {
    width?: boolean
    height?: boolean
    padding?: string
    marginTop?: string
  marginBottom?: string
  marginLeading?: string
  marginTrailing?: string
  }

  export function StackContent({
    width, height, padding,
    marginTop, marginBottom, marginLeading, marginTrailing, 
    ...props
  }: ContentProps) {
    return <div className={cn(
      width ? "w-screen" : (height ? "h-screen" : "w-screen"),
      padding ? `p-${padding}` : "p-0",
      marginTop ? `mt-${marginTop}` : "",
      marginBottom ? `mb-${marginBottom}` : "",
      marginLeading ? `ml-${marginLeading}` : "",
      marginTrailing ? `mr-${marginTrailing}` : ""
    )}
    {...props}
    />
  }