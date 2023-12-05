// import { ServerWebSocket } from "bun";

export enum WSEvents {
  PLAYER,
  CREATURE,
  ENVIRONMENT,
}

export type InputWSEvent = {
  eventType: number;
  subEventType: number;
  data: any;
}

// export type PlayerLiveConnection = ServerWebSocket<{ playerId: string }>