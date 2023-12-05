// import { Server } from "bun";
// import { WebSocketService } from "../websocket/websocket.service";
import { RenderPlayerData } from "../player/player.model";
import { createServer, Server, IncomingMessage, ServerResponse } from 'node:http';
import { WebSocketService } from "../websocket/websocket.service";

class ServerServiceClass {

  server!: Server;

  constructor() {
  }

  init() {
    this.server = createServer((request, response) => {
      response.setHeader('Content-Type', 'application/json')
      response.setHeader('Access-Control-Allow-Origin', '*')
      let data = null;
      switch (request.url) {
        case '/get-online-players':
          data = this.getOnlinePlayers();
          break;
        case '/authenticate':
          data = this.authenticate(request);
          break;
      }
      response.writeHead(200);
      response.end(JSON.stringify(data || {}));
    });

    this.server.listen(process.env.API_PORT, () => {
      console.log('Server running on port: ', process.env.API_PORT);
    })
  }

  getOnlinePlayers(): RenderPlayerData[] {
    return WebSocketService.getRenderPlayersData();;
  }

  authenticate(request: IncomingMessage) {
    // console.log(request.body);
    // return this.getDataResponse({ playerData: null });
  }

  register(request: Request) {
    // const { player }
    // return this.getDataResponse({});
  }
}

export const ServerService = new ServerServiceClass();