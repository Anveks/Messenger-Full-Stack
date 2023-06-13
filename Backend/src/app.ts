import express from 'express';
import routeNotFound from './3-middleware/route-not-found';
import catchAll from './3-middleware/catch-all';
import appConfig from './4-utils/app-config';
import socketIoService from './5-services/socket.io-service';
import dataRoutes from './6-routes/data-routes';
import authRoutes from './6-routes/auth-routes';
import dotenv from 'dotenv'

// first server (with express)
const expressServer = express();
expressServer.use("/api", dataRoutes);
expressServer.use("/api", authRoutes);
expressServer.use(routeNotFound);
expressServer.use(catchAll);

dotenv.config({ path: './config.env' });
console.log(process.env.PORT);

const httpServer = expressServer.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));

// init socket.io logic:
socketIoService.init(httpServer);

