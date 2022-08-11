import fs from 'fs'
import PageTitle from '@/components/PageTitle'
import UnderConstructionLight from '@/data/svg/under-construction-light.svg'
import UnderConstruction from '@/data/svg/under-construction.svg'
import generateRss from '@/lib/generate-rss'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'
import Link from 'next/link'
import { useTheme } from 'next-themes'

const DEFAULT_LAYOUT = 'PostLayout'

const UnderConstructionSVG = () => {
  const { resolvedTheme } = useTheme()

  switch (resolvedTheme) {
    case 'dark':
      return <UnderConstruction />
    case 'light':
      return <UnderConstructionLight />
    default:
      return null
  }
}

export async function getStaticPaths() {
  const posts = getFiles('blog')
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter('blog')
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === params.slug.join('/'))
  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null
  const post = await getFileBySlug('blog', params.slug.join('/'))
  const authorList = post.frontMatter.authors || ['default']
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug('authors', [author])
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)

  // rss
  if (allPosts.length > 0) {
    const rss = generateRss(allPosts)
    fs.writeFileSync('./public/feed.xml', rss)
  }

  return { props: { post, authorDetails, prev, next } }
}

export default function Blog({ post, authorDetails, prev, next }) {
  const { mdxSource, toc, frontMatter } = post

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="align-items mt-20 justify-center text-center">
          <div className="align-items flex justify-center">
            <UnderConstructionSVG />
          </div>

          <p className="mt-10 mb-10 text-2xl font-light tracking-wider">
            The post you're looking for is still being developed. Try again later!
          </p>
          <Link href="/blog">
            <a className="mt-5 text-lg text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
              {' '}
              &larr; Back to the blog{' '}
            </a>
          </Link>
        </div>
      )}
    </>
  )
}
