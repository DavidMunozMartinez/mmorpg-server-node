// import { ServerWebSocket } from "bun";

export enum WSEvents {
  PLAYER,
  CREATURE,
  ENVIRONMENT,
}

export interface InputWSEvent {
  eventType: WSEvents
  subEventType: number
  data: any
}

// export type PlayerLiveConnection = ServerWebSocket<{ playerId: string }>
