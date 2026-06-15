import { CreateTagUseCase } from '@/domain/stock/application/use-cases/tag/create-tag'
import { GetTagByIdUseCase } from '@/domain/stock/application/use-cases/tag/get-tag-by-id'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { CreateTagController } from './create-tag.controller'
import { GetTagByIdController } from './get-tag-by-id.controller'
import { DeleteTagController } from './delete-tag.controller'
import { DeleteTagUseCase } from '@/domain/stock/application/use-cases/tag/delete-tag'
import { EditTagController } from './edit-tag.controller'
import { EditTagUseCase } from '@/domain/stock/application/use-cases/tag/edit-tag'
import { ListTagsController } from './list-tags.controller'
import { ListTagsUseCase } from '@/domain/stock/application/use-cases/tag/list-tags'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateTagController,
    ListTagsController,
    GetTagByIdController,
    EditTagController,
    DeleteTagController,
  ],
  providers: [
    CreateTagUseCase,
    ListTagsUseCase,
    GetTagByIdUseCase,
    EditTagUseCase,
    DeleteTagUseCase,
  ],
})
export class TagModule {}
