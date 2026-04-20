import type { ReactNode } from 'react'

type Props = {
  ticker: ReactNode
  rail: ReactNode
  status: ReactNode
  children: ReactNode
}

export default function Shell({ ticker, rail, status, children }: Props) {
  return (
    <div className="shell">
      <div data-area="ticker" className="rule-b">
        {ticker}
      </div>
      <div data-area="rail" className="md:rule-r">
        {rail}
      </div>
      <div data-area="main">{children}</div>
      <div data-area="status" className="rule-t">
        {status}
      </div>
    </div>
  )
}
