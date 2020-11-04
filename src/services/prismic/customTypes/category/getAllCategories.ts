import Prismic from 'prismic-javascript'
import { Category } from 'types/category'
import client from '../../client'
import categoryParser from './categoryParser'

export default async function getAllCategories(): Promise<Category[]> {
  const response = await client.query(
    Prismic.Predicates.at('document.type', 'category'),
  )

  const categories: Category[] = response.results.map((category) =>
    categoryParser({ category }),
  )

  return categories
}
