/**
 * Make some properties optional an type
 *
 * @example
 * ```typescript
 * type User = {
 *  id: number
 *  name: string
 *  age: number
 * }
 *
 * Optional<User, 'age' | 'name'>
 * ```
 **/
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
