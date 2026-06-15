export interface PaginationParams {
  page: number
}

export const DEFAULT_PAGE_SIZE = 20

export function toSkipTake(page: number, pageSize: number = DEFAULT_PAGE_SIZE) {
  return {
    skip: (page - 1) * pageSize,
    take: pageSize,
  }
}
