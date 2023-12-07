import { PLAYER_EVENTS } from './player.model'
import { type InputWSEvent } from '../websocket/websocket.model'
import { WebSocketService } from '../websocket/websocket.service'

export function handlePlayerEvents (event: InputWSEvent) {
  switch (event.subEventType) {
    case PLAYER_EVENTS.MOVED:
      applyMoveEvent(event)
      break
    case PLAYER_EVENTS.CONNECTED:
      sendToAllExcept(event.data.applyTo, event)
      break
    case PLAYER_EVENTS.DISCONNECTED:
      sendToAllExcept(event.data.applyTo, event)
      break
  }
}

function applyMoveEvent (event: InputWSEvent) {
  const playerId = event.data.applyTo
  const player = WebSocketService.livePlayers.get(playerId)
  player?.positionUpdate(event)
  sendToAll(event)
}

function sendToAll (event: InputWSEvent) {
  WebSocketService.livePlayers.forEach((player) => {
    player.socket.send(JSON.stringify(event))
  })
}

function sendToAllExcept (ids: string[], event: InputWSEvent) {
  WebSocketService.livePlayers.forEach((player) => {
    if (!ids.includes(player.id)) {
      player.socket.send(JSON.stringify(event))
    }
  })
}
