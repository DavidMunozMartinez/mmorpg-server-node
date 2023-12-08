import { model, Schema, type InferSchemaType } from 'mongoose'
import { hashSync, genSaltSync, compareSync } from 'bcrypt-nodejs'

const accountSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
}, {
  methods: {
    hashPassword (password: string) {
      return hashSync(password, genSaltSync(8))
    },
    validatePassword (password: string) {
      return compareSync(password, this.password)
    }
  }
})

export type AccountType = InferSchemaType<typeof accountSchema>
export const AccountModel = model('accounts', accountSchema)
