import { hash, compare } from 'bcryptjs'

export const hashPassword = async (password: string) => {
  return hash(password, 12)
}

export const validatePassword = async (
  password: string,
  hashedPassword: string,
) => {
  return compare(password, hashedPassword)
}
