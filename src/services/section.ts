import { prismaClient } from "../prisma";
import bcrypt from "bcrypt";
import { jwt } from "../configs/auth";
import { sign } from "jsonwebtoken";
import { appError } from "../utils/appError";

type loogerUserProps = {
  id: string
  name: string,
  email: string,
  isAdmin: boolean,
  createdAt: Date,
  updatedAt: Date,
}

export class SectionService {
  async signIn(data: { email: string, password: string }) {
    try {
      if(!data.email || !data.password) {
        throw new appError("Email and password are requested", 400);
      }
      const user = await prismaClient.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (user) {
        const passwordMatch = await bcrypt.compare(data.password, user.password);

        if (!passwordMatch) {
          throw new appError("Email or password incorrect", 401);
        }

        const {secret,expiresIn } = jwt;
        const token = sign({}, secret, {
          subject: user.id,
          expiresIn,
        })

        const loggerUser: loogerUserProps = {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }

        return {
          user: loggerUser,
          token
        };

      } else {
        throw new appError("Email or password incorrect", 401);
      }
    } catch (error) {
      console.log(error);
      throw new appError("Error signing in", 500);
    }
  }
}
