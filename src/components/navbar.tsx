import Image from 'next/image'
import { Logo } from './logo'
import Link from 'next/link'
import { WidthWrapper } from './width-wrapper'

export function Navbar() {
  return (
    <header>
      <WidthWrapper>
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>

          <nav>
            <ul className="flex items-center gap-4">
              <li>
                <Link href="/">Home</Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4"></div>
        </div>
      </WidthWrapper>
    </header>
  )
}
