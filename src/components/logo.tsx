import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        alt="Seazone Reservas"
        width={100}
        height={100}
        className="h-10 w-10"
      />
    </Link>
  )
}
