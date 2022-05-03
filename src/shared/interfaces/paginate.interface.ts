export interface Paginate <T> {
  data: T[]
  total: number
  limit: number
  page: number
  pages: number
}
