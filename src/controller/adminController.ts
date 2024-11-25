import { FastifyRequest, FastifyReply } from "fastify";
import { AdminService } from "../services/admin";
import { appError } from "../utils/appError";

type AdminRequestDataProps = {
  id: string;
}

export class AdminController {
  async adminRequest(request: FastifyRequest, reply: FastifyReply) {
    try {
      const adminService = new AdminService();
      const { id } = request.params as AdminRequestDataProps;
      await adminService.adminRequest(id);
    } catch (error) {
      console.log(error);
      throw new appError("Error requesting admin", 500);
    }
  }
}