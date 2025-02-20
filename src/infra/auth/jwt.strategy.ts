import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { z } from 'zod'
import { EnvService } from '../env/env.service'

const userPayloadSchema = z.object({
  sub: z.string(),
})

export type UserPayload = z.infer<typeof userPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  async validate(payload: UserPayload) {
    return userPayloadSchema.parse(payload)
  }

  constructor(config: EnvService) {
    const publicKey = config.get('JWT_PUBLIC_KEY')

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    })
  }
}
