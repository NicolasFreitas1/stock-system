import { Tag } from '@/domain/stock/enterprise/entities/tag'

export class TagPresenter {
  static toHTTP(tag: Tag) {
    return {
      id: tag.id.toString(),
      name: tag.name,
    }
  }
}
