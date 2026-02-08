import { Router } from "express";
import {
    getAllTickets,
    getTicketByID,
    createTicketById,
    updateTicketById,
    deleteTicketById,
    getTicketUrgencyById
} from "../controllers/ticketControllers";


const router = Router();

router.get("/tickets", getAllTickets);
router.get("/tickets/:id", getTicketByID); // get all tickets
router.post("/tickets", createTicketById);
router.put("/tickets/:id", updateTicketById);
router.delete("/tickets/:id", deleteTicketById);
router.get("/tickets/:id/urgency", getTicketUrgencyById);

export default router;