import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment'

export function makeAnswerAttachment(
  overide: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const answerAttachments = AnswerAttachment.create(
    {
      answerId: new UniqueEntityID('123'),
      attachmentId: new UniqueEntityID('123'),
      ...overide,
    },
    id,
  )

  return answerAttachments
}
