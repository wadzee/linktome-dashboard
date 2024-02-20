import { ReactNode } from 'react'
import classNames from 'classnames'

export interface GridProps {
  children: ReactNode
  className?: string
}

export const Grid3Cols = ({ children, className }: GridProps) => {
  return (
    <section
      className={classNames(
        'grid grid-cols-1 sm:grid-cols-3 items-center',
        className
      )}
    >
      {children}
    </section>
  )
}
