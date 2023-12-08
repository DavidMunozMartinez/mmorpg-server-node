import { model, Schema, type InferSchemaType } from 'mongoose'
import { hashSync, genSaltSync, compareSync } from 'bcrypt-nodejs'

const accountSchema = new Schema({
  email: String,
  password: String
}, {
  methods: {
    hashPassword,
    validatePassword: (password: string) => {
      // TODO: Fix this TS thing
      // return compareSync(password, (this as any).password)
    }
  }
})

function hashPassword (password: string) {
  return hashSync(password, genSaltSync(8))
}

export type AccountType = InferSchemaType<typeof accountSchema>
export const AccountModel = model('accounts', accountSchema)
