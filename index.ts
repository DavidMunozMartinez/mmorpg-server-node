import { ServerService } from "./src/api/server.service";
// import { initDBConnections as initDBConnection } from "./src/db.handler";
import { WebSocketService } from "./src/websocket/websocket.service";
require('dotenv').config();

function init() {
  WebSocketService.init();
  ServerService.init();

  // initDBConnection();
}

init();
