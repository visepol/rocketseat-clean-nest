import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  NotificationProps,
  Notification,
} from '@/domain/notification/enterprise/notification'
import { faker } from '@faker-js/faker'

export function makeNotification(
  overide: Partial<NotificationProps> = {},
  id?: UniqueEntityID,
) {
  const notification = Notification.create(
    {
      title: faker.lorem.sentences(4),
      recipientId: new UniqueEntityID('123'),
      content: faker.lorem.sentences(10),
      ...overide,
    },
    id,
  )

  return notification
}
