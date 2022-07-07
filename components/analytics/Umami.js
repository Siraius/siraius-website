import Script from 'next/script'

import siteMetadata from '@/data/siteMetadata'

const UmamiScript = () => {
  return (
    <>
      <Script
        async
        defer
        data-website-id="6085003f-1f39-4ff2-a86a-bb901a185c4c"
        src="https://siraius.up.railway.app/umami.js" // Replace with your umami instance
      />
    </>
  )
}

export default UmamiScript
