import { type RenderPlayerData } from '../player/player.model'
import { createServer, type Server, type IncomingMessage } from 'node:http'
import { WebSocketService } from '../websocket/websocket.service'

class ServerServiceClass {
  server!: Server

  init () {
    this.server = createServer((request, response) => {
      response.setHeader('Content-Type', 'application/json')
      response.setHeader('Access-Control-Allow-Origin', '*')
      let data = {}
      switch (request.url) {
        case '/get-online-players':
          data = this.getOnlinePlayers()
          break
        case '/authenticate':
          data = this.authenticate(request)
          break
      }
      response.writeHead(200)
      response.end(JSON.stringify(data))
    })

    this.server.listen(process.env.API_PORT, () => {
      console.log('Server running on port: ', process.env.API_PORT)
    })
  }

  getOnlinePlayers (): RenderPlayerData[] {
    return WebSocketService.getRenderPlayersData()
  }

  authenticate (request: IncomingMessage) {
    return {}
    // console.log(request)
    // return this.getDataResponse({ playerData: null });
  }

  register (request: Request) {
    // const { player }
    // return this.getDataResponse({});
  }
}

export const ServerService = new ServerServiceClass()
