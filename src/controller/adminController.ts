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

  async adminAccept(request: FastifyRequest, reply: FastifyReply) {
    try {
      const adminService = new AdminService();
      const { id } = request.params as AdminRequestDataProps;
      await adminService.acceptAdminRequest(id);
    } catch (error) {
      console.log(error);
      throw new appError("Error accepting admin request", 500);
    }
  }

  async adminReject(request: FastifyRequest, reply: FastifyReply) {
    try {
      const adminService = new AdminService();
      const { id } = request.params as AdminRequestDataProps;
      await adminService.rejectAdminRequest(id);
    } catch (error) {
      console.log(error);
      throw new appError("Error rejecting admin request", 500);
    }
  }

  async getAllAdminRequests(request: FastifyRequest, reply: FastifyReply) {
    try {
      const adminService = new AdminService();
      return await adminService.getAllAdminRequests();
    } catch (error) {
      console.log(error);
      throw new appError("Error getting all admin requests", 500);
    }
  }
}