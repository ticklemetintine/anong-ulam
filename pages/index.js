import Image from 'next/image'
import { Inter } from 'next/font/google'
import matter from 'gray-matter'
import Link from 'next/link'
import Head from 'next/head'
import fs from 'fs'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ recipes }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl">
        <h1 className={`${inter.className} mb-3 text-3xl font-semibold`}>Welcome to my blog</h1>
        <p className={`${inter.className} mb-3 max-w-[30ch] text-sm opacity-50`}>This is a subtitle idk what to type here</p>
        <ul>
          {recipes.map(blog => (
            <li key={blog.slug}>
              <Link href={`/recipe/${blog.slug}`}>
                {blog.date}:{blog.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export async function getStaticProps() {
  // List of files in blgos folder
  const filesInRecipes = fs.readdirSync('./content/recipes')

  // Get the front matter and slug (the filename without .md) of all files
  const recipes = filesInRecipes.map(filename => {
    const file = fs.readFileSync(`./content/recipes/${filename}`, 'utf8')
    const matterData = matter(file)

    return {
      ...matterData.data, // matterData.data contains front matter
      slug: filename.slice(0, filename.indexOf('.'))
    }
  })

  return {
    props: {
      recipes
    }
  }

}