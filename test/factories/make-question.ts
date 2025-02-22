import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionProps,
  Question,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/values-objects/slug'
import { PrismaQuestionMapper } from '@/infra/database/prisma/mappers/prisma-question-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

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

@Injectable()
export class QuestionFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestion(
    data: Partial<QuestionProps> = {},
  ): Promise<Question> {
    const question = makeQuestion(data)

    await this.prisma.question.create({
      data: PrismaQuestionMapper.toPersistence(question),
    })

    return question
  }
}
