import { AccountModel } from '../schemas/account.schema'

export async function authenticateAccount (body: { email: string, password: string }) {
  try {
    const { email, password } = body
    const account = await AccountModel.findOne({ email })
    if (account == null) throw new Error('Unable to find account')
    if (!account.validatePassword(password)) throw new Error('Wrong password')

    // Set access token

    return { success: true }
  } catch (error) {
    return { error }
  }
}

export async function registerAccount (body: { email: string, password: string }) {
  try {
    const { email, password } = body
    const account = new AccountModel({
      email
    })

    account.password = account.hashPassword(password)
    await account.save()
    return { success: true }
  } catch (error) {
    return { error, message: 'Failed to register account' }
  }
}
