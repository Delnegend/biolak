'use client'

import { cn } from '@/utilities/ui'
import React, { useRef } from 'react'

export function TextInput({
  label,
  type,
  onBlur,
  onFocus,
  inputRef,
  classNames,
  ...props
}: Omit<React.ComponentPropsWithRef<'input'>, 'placeholder'> & {
  label: string
  inputRef?: React.RefObject<HTMLInputElement>
  classNames?: { container?: string; input?: string; label?: string }
}): React.JSX.Element {
  const [elevated, setElevated] = React.useState(false)
  const internalRef = useRef<HTMLInputElement>(null)
  const ref_ = inputRef ?? internalRef

  return (
    <div
      className={cn(
        'relative h-14 flex items-end border-b-[#6b5a4a] border-b focus-within:border-b-black transition-colors',
        classNames?.container,
      )}
    >
      <input
        className={cn(
          'flex w-full h-10 bg-transparent ring-offset-background text-xl file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 relative border-none',
          classNames?.input,
        )}
        type={type}
        onFocus={(e) => {
          setElevated(true)
          onFocus?.(e)
        }}
        onBlur={(e) => {
          if (!Boolean(e.target.value)) {
            setElevated(false)
          }
          onBlur?.(e)
        }}
        {...props}
        ref={ref_}
      />
      <div
        className={cn(
          'absolute left-0 flex transition-all',
          elevated ? 'text-lg -top-3' : 'text-2xl top-0',
          classNames?.label,
        )}
        onClick={() => ref_.current?.focus?.()}
      >
        {label}
      </div>
    </div>
  )
}
