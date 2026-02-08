import { Request, Response } from "express";
import {
    getAllTicketsServices,
    getTicketByIdServices,
    createTicketServices,
    updateTicketByIdServices,
    deleteTicketByIdServices
} from "../services/ticketServices";


export const getAllTickets = (req: Request, res: Response): void => {
    // Logic to get all items
    let result = getAllTicketsServices()
    res.status(200).json(result);
};

export const getTicketByID = (req: Request, res: Response): void => {
    // Logic to get all items
    let id = Number(req.params.id)

    if (Number.isNaN(id)) {
        res.status(400).json({ error: "id must be numeric" });
        return;
    }

    let result = getTicketByIdServices(id)

    if (result === undefined) {
        res.status(404).json({ error: `Ticket with ${id} does not exist` })
    }
    res.status(200).json(result);
};

export const createTicketById = (req: Request, res: Response): void => {
    const result = createTicketServices(req.body);

    if (result.error) {
        res.status(400).json({ error: result.error });
        return;
    }

    res.status(201).json({
        message: "Ticket created",
        data: result.created,
    });
};

export const updateTicketById = (req: Request, res: Response):void => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        res.status(400).json({ error: "id must be numeric" });
        return;
    }

    const updated = updateTicketByIdServices(id, req.body);

    if (!updated) {
        res.status(404).json({ error: `Ticket with ${id} does not exist` });
        return;
    }

    res.status(200).json({
        message: "Ticket updated",
        data: updated,
    });
};

export const deleteTicketById = (req: Request, res: Response):void => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        res.status(400).json({ error: "id must be numeric" });
        return;
    }

    const deleted = deleteTicketByIdServices(id);

    if (!deleted) {
        res.status(404).json({ error: `Ticket with id ${id} does not exist` });
        return;
    }

    res.status(200).json({
        message: "Ticket deleted",
        data: deleted,
    });
};