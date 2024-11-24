import Fastfy from 'fastify';
import  cors  from '@fastify/cors';
import { routes } from './routes';

const app = Fastfy({ logger: true });

const start = async () => {
    await app.register(cors);
    await app.register(routes);

    try{
        await app.listen({ port: 3333, host: '0.0.0.0' });

    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

start();