import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { AnswerCommentCreatedEvent } from '@/domain/forum/enterprise/events/answer-comment-created-event'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { SendNotificationUseCase } from '../use-case/send-notification'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'

export class OnAnswerCommentCreated implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCommentCreatedEvent.name,
    )
  }

  private async sendNewAnswerNotification({
    answerComment,
  }: AnswerCommentCreatedEvent) {
    const answer = await this.answersRepository.findById(
      answerComment.answerId.toString(),
    )

    if (!answer) return

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (answer && question) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `New comment ${question.title}`,
        content: answerComment.content.substring(0, 120).concat('...'),
      })

      console.log(`New answer created: ${answerComment.id}`)
    }
  }
}
