import { Controller, Post, UseGuards } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle() {}
}
