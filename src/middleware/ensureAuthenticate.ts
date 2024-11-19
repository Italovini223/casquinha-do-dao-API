import { verify } from "jsonwebtoken";
import { jwt } from "../configs/auth";
import { FastifyRequest, FastifyReply} from "fastify"



export function ensureAuthenticate(request: FastifyRequest, reply: FastifyReply, next: () => void) {
  const authHeaders = request.headers.authorization;

  if (!authHeaders) {
    throw new Error("Token is missing");
  }

  const [, token] = authHeaders.split(" ");

  try {
    const { sub: user_id } = verify(token, jwt.secret) as { sub: string };
    request.user = {
      id: Number(user_id)
    }
    return next();
  } catch (error) {
    throw new Error("Invalid token");
  }
}