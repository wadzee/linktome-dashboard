export interface AccordianProps {
  accordians: {
    title: string
    content: string
  }[]
  className?: string
}

export const Accordian = ({ accordians, className }: AccordianProps) => {
  return (
    <section className={className}>
      {accordians.map(({ title, content }, idx) => {
        return (
          <details key={idx} className="hover:cursor-pointer">
            <summary>{title}</summary>
            <div className="mt-4">
              <p
                dangerouslySetInnerHTML={{ __html: content }}
                className="text-light-navy"
              />
            </div>
          </details>
        )
      })}
    </section>
  )
}
