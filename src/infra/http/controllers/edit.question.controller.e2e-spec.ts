import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UsePipes,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'

const editQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string().email(),
})

type EditQuestionBodySchema = z.infer<typeof editQuestionBodySchema>

@Controller('/questions/:id')
export class EditQuestionController {
  constructor(private editQuestion: EditQuestionUseCase) {}

  @Put()
  @HttpCode(204)
  @UsePipes(new ZodValidationPipe(editQuestionBodySchema))
  async handle(
    @Body() body: EditQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') questionId: string,
  ) {
    const { title, content } = body
    const userId = user.sub

    const result = await this.editQuestion.execute({
      title,
      content,
      authorId: userId,
      questionId,
      attachmentsIds: [],
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
