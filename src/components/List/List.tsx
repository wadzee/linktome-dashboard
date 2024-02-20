import { FC, PropsWithChildren } from 'react'
import { Flex, FlexProps } from '../Flex/Flex'

import classNames from 'classnames'

export type ListProps = FlexProps

export const List: FC<PropsWithChildren<ListProps>> = ({
  children,
  className,
  alignItems = 'items-stretch',
  gap = 'gap-8',
  ...props
}) => {
  return (
    <Flex
      {...props}
      gap={gap}
      alignItems={alignItems}
      className={classNames('flex-col', className)}
    >
      {children}
    </Flex>
  )
}
