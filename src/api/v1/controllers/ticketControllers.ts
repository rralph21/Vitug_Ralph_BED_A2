import { Request, Response } from "express";
import { 
    getAllTicketsServices, 
    getTicketByIdServices, 
    createTicketServices, 
    updateTicketByIdServices, 
    deleteTicketByIdServices 
} from "../services/ticketServices";

export const getAllTickets = (req: Request, res: Response) => {
    // Logic to get all items
    let result = getAllTicketsServices()
    res.status(200).json(result);
};

export const getTicketByID = (req: Request, res: Response) => {
    // Logic to get all items
    let id = Number(req.params.id)

    if(Number.isNaN(id)){
        res.status(400).json({ error: "id must be numeric"});
        return;
    }

    let result = getTicketByIdServices(id)
    res.status(200).json(result);
};

export const createTicketById = (req: Request, res: Response) => {

    let result = createTicketServices("low")
    res.status(200).json(result);
};

export const updateTicketById = (req: Request, res: Response) => {

    let result = updateTicketByIdServices(1, "low")
    res.status(200).json(result);
};

export const deleteTicketById = (req: Request, res: Response) => {
    // Logic to delete an item
    let result = deleteTicketByIdServices(1)
    res.status(200).json(result);
};