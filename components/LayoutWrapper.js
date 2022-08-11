import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import DarkLogo from '@/data/svg/logo.svg'
import LightLogo from '@/data/svg/logo-light.svg'
import LightLogoText from '@/data/svg/all-things-siraius-light.svg'
import DarkLogoText from '@/data/svg/all-things-siraius.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { useTheme } from 'next-themes'

const Logo = () => {
  const { resolvedTheme } = useTheme()

  switch (resolvedTheme) {
    case 'dark':
      return (
        <>
          <div className="mr-3">
            <DarkLogo />
          </div>
          <DarkLogoText />
        </>
      )
    case 'light':
      return (
        <>
          <div className="mr-3">
            <LightLogo />
          </div>
          <LightLogoText />
        </>
      )
    default:
      return null
  }
}

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between border border-slate-400/10 py-5 px-10 backdrop-blur transition-all">
        <div>
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <div className="flex items-center justify-between">
              <Logo />
            </div>
          </Link>
        </div>
        <div className="flex items-center text-base leading-5">
          <div className="hidden sm:block">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="p-1 font-medium uppercase tracking-widest text-gray-900 dark:text-gray-100 sm:p-4"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <ThemeSwitch />
          <MobileNav />
        </div>
      </header>
      <SectionContainer>
        <main className="mb-auto">{children}</main>
        <Footer />
      </SectionContainer>
    </>
  )
}

export default LayoutWrapper
