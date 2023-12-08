import { type RenderPlayerData } from '../player/player.model'
import { createServer, type Server } from 'node:http'
import { WebSocketService } from '../websocket/websocket.service'
import { authenticateAccount, registerAccount } from './authentication.handler'

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
            data = authenticateAccount(JSON.parse(body))
            break
          case '/register':
            data = registerAccount(JSON.parse(body))
        }
        // if (data.error) {}
        response.writeHead(200)
        response.end(JSON.stringify(data))
      })
    })

    this.server.listen(process.env.API_PORT, () => {
      console.log('Server running on port: ', process.env.API_PORT)
    })
  }

  getOnlinePlayers (): RenderPlayerData[] {
    return WebSocketService.getRenderPlayersData()
  }
}

export const ServerService = new ServerServiceClass()
