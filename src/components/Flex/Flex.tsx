import classNames from 'classnames'
import { forwardRef, HTMLAttributes } from 'react'

export type FlexProps = HTMLAttributes<HTMLDivElement> & {
  gap?:
    | 'gap-0'
    | 'gap-1'
    | 'gap-2'
    | 'gap-4'
    | 'gap-6'
    | 'gap-8'
    | 'gap-10'
    | 'gap-12'
  alignItems?: 'items-center' | 'items-start' | 'items-end' | 'items-stretch'
  justifyContent?:
    | 'justify-start'
    | 'justify-center'
    | 'justify-between'
    | 'justify-end'
    | 'justify-around'
  isMobileFlexRowCenter?: boolean
}

export const Flex = ({
  isMobileFlexRowCenter = false,
  gap = 'gap-4',
  alignItems = 'items-center',
  justifyContent,
  children,
  className,
  ...props
}: FlexProps) => {
  return (
    <div
      className={classNames(
        'flex',
        isMobileFlexRowCenter &&
          'flex-col items-stretch text-center sm:flex-row sm:items-center sm:text-left',
        gap,
        alignItems,
        justifyContent,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
