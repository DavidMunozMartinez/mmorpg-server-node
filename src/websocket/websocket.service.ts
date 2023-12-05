import { PlayerClass } from "../player/player.class";
import { PLAYER_EVENTS, RenderPlayerData } from "../player/player.model";
import { handleWSEvent } from "./websocket.handler";
import { InputWSEvent, WSEvents } from "./websocket.model";
import { WebSocketServer } from 'ws'
import { IncomingMessage } from "http";

class WebSocketServiceClass {

  livePlayers: Map<string, PlayerClass> = new Map<string, PlayerClass>();
  webSocketServer: WebSocketServer;

  constructor() {}

  init() {
    this.webSocketServer = new WebSocketServer({
      port: parseInt(process.env.WS_PORT),
      host: 'localhost'
    });
    this.webSocketServer.on('connection', (socket: WebSocket, data: IncomingMessage) => {
      const url = new URL('http://ca.ca' + data.url);
      const playerId = url.searchParams.get('userId');
      const player = new PlayerClass(socket, playerId);
      this.add(player);

      socket.onmessage = (data: MessageEvent) => {
        this.onMessage(socket, data);
      };
      socket.onclose = (data: CloseEvent) => {
        this.onClose(socket, playerId);
      };
    });

    this.webSocketServer.on('listening', () => {
      console.log('WS Server started in port: ', process.env.WS_PORT)
    })
  }

  add(player: PlayerClass) {
    this.livePlayers.set(player.id, player);
    console.log('New player, total: ', this.livePlayers.values.length);
  }

  remove(playerId: string) {
    this.livePlayers.delete(playerId);
    console.log('Removed player, total: ', this.livePlayers.values.length);
  }

  notifyAll(event: InputWSEvent) {
    this.livePlayers.forEach((player) => {
      player.socket.send(JSON.stringify(event));
    });
  }

  // /**
  //  * Specifically returns just the necessary data so the UI can render the player
  //  */
  getRenderPlayersData(): RenderPlayerData[] {
    const players: RenderPlayerData[] = [];
    this.livePlayers.forEach((player: PlayerClass) => {
      players.push({
        id: player.id,
        position: player.position,
        name: player.name,
        health: player.health,
      })
    });
    return players;
  }

  private onMessage(webSocket: WebSocket, message: MessageEvent) {
    if (message && message.data) {
      const webSocketEvent: InputWSEvent = JSON.parse(message.data);
      handleWSEvent(webSocketEvent);
    }
  }

  private onClose(webSocket: WebSocket, id: string) {
    const event: InputWSEvent = {
      eventType: WSEvents.PLAYER,
      subEventType: PLAYER_EVENTS.DISCONNECTED,
      data: { applyTo: id }
    } 
    this.remove(id);
    this.notifyAll(event);
  }
}

export const WebSocketService = new WebSocketServiceClass();