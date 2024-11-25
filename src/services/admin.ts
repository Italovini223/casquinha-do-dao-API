import { prismaClient } from "../prisma";
import { appError } from "../utils/appError";


export class AdminService {

  async adminRequest(userId: string){
    try {
      await prismaClient.adminRequests.create({
        data: {
          userId: userId
        }
      })
    } catch (error) {
      console.log(error);
      throw new appError("Error requesting admin", 500);
    }
  }
}