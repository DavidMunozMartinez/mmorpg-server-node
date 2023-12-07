export enum PLAYER_EVENTS {
  CONNECTED,
  DISCONNECTED,
  MOVED,
  UNALIVED,
}

export enum DIRECTIONS {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export interface PlayerEventData {
  type: PLAYER_EVENTS
  data: any
}

/**
 * Represents the player data necessary to render the player
 */
export interface RenderPlayerData {
  id: string
  position: [number, number]
  name: string
  health: number
}
