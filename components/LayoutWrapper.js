import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import DarkLogo from '@/data/logo.svg'
import LightLogo from '@/data/logo-light.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { useTheme } from 'next-themes'
import Image from './Image'

const Logo = () => {
  const { theme, resolvedTheme } = useTheme()

  const textSrc =
    theme === 'dark' || resolvedTheme === 'dark'
      ? '/static/images/all-things-siraius-light.png'
      : '/static/images/all-things-siraius-dark.png'

  return (
    <>
      <div className="mr-3">
        {theme === 'dark' || resolvedTheme === 'dark' ? <DarkLogo /> : <LightLogo />}
      </div>
      {typeof siteMetadata.headerTitle === 'string' ? (
        <div className="-my-2 hidden text-2xl font-thin uppercase tracking-widest transition delay-75 ease-in-out md:block">
          <Image priority src={textSrc} height={50} width={300} />
        </div>
      ) : (
        <Image priority src={textSrc} height={50} width={300} />
      )}
    </>
  )
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
