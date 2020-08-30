import http from 'http'
import {ApolloServer, PubSub} from "apollo-server-koa"
import {generateSchema} from "graphql-adapter"
import * as Models from "./database/entity"
import Application = require("koa");
import {getApi} from "./connect";



export default async function (app: Application, wsPort: number) {
    const api = await getApi();
    const server = new ApolloServer({
        schema: generateSchema(Models, {
            pubSub: new PubSub(),
        }),
        tracing: true,
    });
    server.applyMiddleware({app, path: "/graphql"});
    // @ts-ignore
    const httpServer = http.createServer(app.callback());

    server.installSubscriptionHandlers(httpServer);
    httpServer.listen(wsPort, () => {
        console.log(`🚀 Server ready at http://localhost:${wsPort}${server.graphqlPath}`);
        console.log(`🚀 Subscriptions ready at ws://localhost:${wsPort}${server.subscriptionsPath}`);
    });
};
