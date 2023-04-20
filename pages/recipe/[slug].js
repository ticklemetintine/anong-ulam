import fs from 'fs'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import Head from 'next/head'

export default function Recipe({ frontmatter, markdown }) {
  return (
    <>
      <Head>
        <title>Demo Recipe | {frontmatter.title}</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl">

          <h1 className='mb-3 text-3xl font-semibold'>{frontmatter.title}</h1>
          <p className='mb-2'>{frontmatter.date}</p>
          <hr className='mb-2' />
          <ReactMarkdown>
            {markdown}
          </ReactMarkdown>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps({ params: { slug } }) {
  const fileContent = matter(fs.readFileSync(`./content/recipes/${slug}.md`, 'utf8'))
  let frontmatter = fileContent.data
  const markdown = fileContent.content

  return {
    props: { frontmatter, markdown }
  }
}

export async function getStaticPaths() {
  const filesInProjects = fs.readdirSync('./content/recipes')

  // Getting the filenames excluding .md extension
  // and returning an array containing slug (the filename) as params for every route
  // It looks like this
  // paths = [
  //   { params: { slug: 'my-first-recipe' }},
  //   { params: { slug: 'how-to-train-a-dragon' }},
  //   { params: { slug: 'how-to-catch-a-pokemon' }},
  // ]
  const paths = filesInProjects.map(file => {
    const filename = file.slice(0, file.indexOf('.'))
    return { params: { slug: filename } }
  })

  return {
    paths,
    fallback: false // This shows a 404 page if the page is not found
  }
}