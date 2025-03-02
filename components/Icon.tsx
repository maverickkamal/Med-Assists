import type { IconProps } from "@/types/icon"

export function Icon({ name, className }: IconProps) {
  return <i className={`icon icon-${name} ${className}`} />
}

