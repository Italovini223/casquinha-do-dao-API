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

  async acceptAdminRequest(userId: string){
    try {
      const user = await prismaClient.user.update({
        where: {
          id: userId
        },
        data: {
          isAdmin: true
        }
      });

      await prismaClient.adminRequests.deleteMany({
        where: {
          userId: userId
        }
      });

      return user;
    } catch (error) {
      throw new appError("Error accepting admin request", 500);
    }
  }

  async getAllAdminRequests(){
    try {
      const requests = await prismaClient.adminRequests.findMany();
      return requests;
    } catch (error) {
      throw new appError("Error getting all admin requests", 500);
    }
  }
}