import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionProps,
  Question,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/values-objects/slug'
import { faker } from '@faker-js/faker'

export function makeQuestion(
  overide: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  const question = Question.create(
    {
      title: faker.lorem.sentences(),
      authorId: new UniqueEntityID('123'),
      content: faker.lorem.text(),
      slug: Slug.create('nova-pergunta'),
      ...overide,
    },
    id,
  )

  return question
}
