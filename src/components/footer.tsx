import Link from 'next/link'
import { Icons } from './icons'
import { WidthWrapper } from './width-wrapper'

const LINKS = [
  {
    group: 'Cidades',
    items: [
      {
        title: 'São Paulo',
        href: '/s?cidade=São Paulo',
      },
      {
        title: 'Rio de Janeiro',
        href: '/s?cidade=Rio de Janeiro',
      },
      {
        title: 'Belo Horizonte',
        href: '/s?cidade=Belo Horizonte',
      },
      {
        title: 'Brasília',
        href: '/s?cidade=Brasília',
      },
      {
        title: 'Curitiba',
        href: '/s?cidade=Curitiba',
      },
      {
        title: 'Porto Alegre',
        href: '/s?cidade=Porto Alegre',
      },
    ],
  },
  {
    group: 'Estado',
    items: [
      {
        title: 'São Paulo',
        href: '/s?estado=SP',
      },
      {
        title: 'Rio de Janeiro',
        href: '/s?estado=RJ',
      },
      {
        title: 'Minas Gerais',
        href: '/s?estado=MG',
      },
      {
        title: 'Ceará',
        href: '/s?estado=CE',
      },
      {
        title: 'Pará',
        href: '/s?estado=PA',
      },
    ],
  },

  {
    group: 'Acomodações',
    items: [
      {
        title: 'Apartamento',
        href: '/s?tipo=Apartamento',
      },
      {
        title: 'Casa',
        href: '/s?tipo=Casa',
      },
      {
        title: 'Studio',
        href: '/s?tipo=Studio',
      },
      {
        title: 'Chalé',
        href: '/s?tipo=Chalé',
      },
      {
        title: 'Cobertura',
        href: '/s?tipo=Cobertura',
      },
      {
        title: 'Loft',
        href: '/s?tipo=Loft',
      },
      {
        title: 'Sítio',
        href: '/s?tipo=Sítio',
      },
    ],
  },
] as const

export function Footer() {
  return (
    <footer className="bg-muted border-t pt-20">
      <WidthWrapper>
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link
              href="/"
              aria-label="Ir para a home"
              className="block size-fit"
            >
              <Icons.logo />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:col-span-3">
            {LINKS.map((link, index) => (
              <div key={index} className="space-y-4 text-sm">
                <span className="block font-medium">{link.group}</span>
                {link.items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary block duration-150"
                  >
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t py-6">
          <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
            © {new Date().getFullYear()} Feito com ❤️ por{' '}
            <Link
              href="https://github.com/aridanpantoja"
              className="underline underline-offset-2"
              target="_blank"
            >
              Aridan Pantoja
            </Link>
          </span>
          <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X/Twitter"
              className="text-muted-foreground hover:text-primary block"
            >
              <Icons.x />
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary block"
            >
              <Icons.linkedin />
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-muted-foreground hover:text-primary block"
            >
              <Icons.facebook />
            </Link>

            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-primary block"
            >
              <Icons.instagram />
            </Link>
          </div>
        </div>
      </WidthWrapper>
    </footer>
  )
}
