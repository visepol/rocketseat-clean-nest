import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from '@/domain/forum/enterprise/entities/question-attachment'

export function makeQuestionAttachment(
  overide: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const questionAttachments = QuestionAttachment.create(
    {
      questionId: new UniqueEntityID('123'),
      attachmentId: new UniqueEntityID('123'),
      ...overide,
    },
    id,
  )

  return questionAttachments
}
