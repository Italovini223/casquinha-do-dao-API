import { verify } from "jsonwebtoken";
import { jwt } from "../configs/auth";
import { FastifyRequest, FastifyReply} from "fastify"
import { appError } from "../utils/appError";



export function ensureAuthenticate(request: FastifyRequest, reply: FastifyReply, next: () => void) {
  const authHeaders = request.headers.authorization;

  if (!authHeaders) {
    throw new appError("Token is missing", 401);
  }

  const [, token] = authHeaders.split(" ");

  try {
    const { sub: user_id } = verify(token, jwt.secret) as { sub: string };
    request.user = {
      id: Number(user_id)
    }
    return next();
  } catch (error) {
    throw new appError("Invalid token", 401);
  }
}