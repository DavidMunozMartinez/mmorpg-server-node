import { ServerService } from './api/server.service'
// import { initDBConnections as initDBConnection } from "./src/db.handler";
import { WebSocketService } from './websocket/websocket.service'
import { connect } from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

async function init () {
  await connect('mongodb://127.0.0.1:27017/mmo')
  WebSocketService.init()
  ServerService.init()
}

init().catch(() => {
  console.log('Could not initalize server')
})
