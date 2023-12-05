import { handlePlayerEvents } from "../player/player-event.handler";
import { InputWSEvent, WSEvents } from "./websocket.model";

/**
 * Recieve websocket events from clients
 */
export function handleWSEvent(event: InputWSEvent) {
  switch (event.eventType) {
    case WSEvents.PLAYER:
      handlePlayerEvents(event);
      break;
    case WSEvents.CREATURE:
      break;
    case WSEvents.ENVIRONMENT:
      break;
  }
}