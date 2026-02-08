import { Router } from "express";
import {
    getAllTickets,
    getTicketByID,
    createTicketById,
    updateTicketById,
    deleteTicketById,
} from "../controllers/ticketControllers";


const router = Router();

router.get("/tickets", getAllTickets);
router.get("/tickets/:id", getTicketByID); // get all tickets
router.post("/tickets", createTicketById);
router.put("/tickets/:id", updateTicketById);
router.delete("/tickets/:id", deleteTicketById);

export default router;