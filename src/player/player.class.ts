import { type InputWSEvent } from '../websocket/websocket.model'
import { DIRECTIONS } from './player.model'

export class PlayerClass {
  id: string
  position: [number, number] = [-1, -1]
  socket: WebSocket
  name: string = 'Hi'
  health: number = 100

  constructor (socket: WebSocket, id: string) {
    this.id = id
    this.socket = socket
    this.position = [0, 0]
  }

  positionUpdate (event: InputWSEvent) {
    let [x, y] = this.position
    switch (event.data.direction) {
      case DIRECTIONS.UP:
        y--
        break
      case DIRECTIONS.DOWN:
        y++
        break
      case DIRECTIONS.LEFT:
        x--
        break
      case DIRECTIONS.RIGHT:
        x++
        break
    }
    this.position = [x, y]
  }
}
