import { type RenderPlayerData } from '../player/player.model'
import { createServer, type Server } from 'node:http'
import { WebSocketService } from '../websocket/websocket.service'
import { AccountModel } from '../schemas/account.schema'

class ServerServiceClass {
  server!: Server

  init () {
    this.server = createServer((request, response) => {
      response.setHeader('Content-Type', 'application/json')
      response.setHeader('Access-Control-Allow-Origin', '*')
      let data = {}
      let body: string = ''
      request.on('data', (chunk) => {
        body += chunk
      })
      request.on('end', () => {
        switch (request.url) {
          case '/get-online-players':
            data = this.getOnlinePlayers()
            break
          case '/authenticate':
            data = this.authenticate(JSON.parse(body))
            break
          case '/register':
            data = this.register(JSON.parse(body))
        }
        response.writeHead(200)
        response.end(JSON.stringify(data))
      })
    })

    // this.server.on('request', ())

    this.server.listen(process.env.API_PORT, () => {
      console.log('Server running on port: ', process.env.API_PORT)
    })
  }

  getOnlinePlayers (): RenderPlayerData[] {
    return WebSocketService.getRenderPlayersData()
  }

  async authenticate (body: { email: string, password: string }) {
    const account = await AccountModel.findOne({ email: body.email })
    if (account != null) {
      const valid = account.validatePassword(body.password)
      console.log(valid)
    } else {
      return {}
    }

    return {}
    // console.log(request)
    // return this.getDataResponse({ playerData: null });
  }

  async register (body: { email: string, password: string }) {
    const { email, password } = body
    try {
      const account = new AccountModel({
        email
      })

      account.password = account.hashPassword(password)
      await account.save()
    } catch (error) {
      return {}
    }

    return {}
  }
}

export const ServerService = new ServerServiceClass()
