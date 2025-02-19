import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { hash, compare } from 'bcryptjs'

export class BcryptHasher implements HashGenerator, HashComparer {
  hash(plain: string): Promise<string> {
    return hash(plain, 8)
  }

  compare(plain: string, hashed: string): Promise<boolean> {
    return compare(plain, hashed)
  }
}
