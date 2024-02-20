import { ParamHTMLAttributes } from 'react'
import classNames from 'classnames'

interface TextProps extends ParamHTMLAttributes<HTMLParagraphElement> {
  isTextCenter?: boolean
}

export const Text = ({ isTextCenter, className, ...props }: TextProps) => {
  return (
    <p
      {...props}
      className={classNames(className, isTextCenter && 'text-center')}
    />
  )
}
