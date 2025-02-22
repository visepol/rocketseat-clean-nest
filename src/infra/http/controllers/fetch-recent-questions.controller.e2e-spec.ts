import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@faker-js/faker/.'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

describe('Fetch recent question (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /questions', async () => {
    const user = await studentFactory.makePrismaStudent()

    const acessToken = jwt.sign({ sub: user.id })

    await Promise.all([
      questionFactory.makePrismaQuestion({
        authorId: user.id,
        title: 'Sample title 1',
      }),
      questionFactory.makePrismaQuestion({
        authorId: user.id,
        title: 'Sample title 2',
      }),
    ])

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${acessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.questions).toEqual({
      questions: [
        expect.objectContaining({
          title: 'Sample title 1',
        }),
        expect.objectContaining({
          title: 'Sample title 2',
        }),
      ],
    })
  })
})
