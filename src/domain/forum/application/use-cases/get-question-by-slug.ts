import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface getQuestionBySlugUseCaseRequest {
  slug: string
}

type getQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  { question: Question }
>

@Injectable()
export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: getQuestionBySlugUseCaseRequest): Promise<getQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) return left(new ResourceNotFoundError())

    return right({ question })
  }
}
