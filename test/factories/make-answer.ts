import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerProps, Answer } from '@/domain/forum/enterprise/entities/answer'
import { faker } from '@faker-js/faker'

export function makeAnswer(
  overide: Partial<AnswerProps> = {},
  id?: UniqueEntityID,
) {
  const answer = Answer.create(
    {
      questionId: new UniqueEntityID(),
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...overide,
    },
    id,
  )

  return answer
}
