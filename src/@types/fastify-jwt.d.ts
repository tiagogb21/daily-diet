import 'fastify';
import 'fastify-jwt';

declare module 'fastify' {
    interface FastifyReply {
        jwtSign(payload: object, options?: object): Promise<string>;
    }
}