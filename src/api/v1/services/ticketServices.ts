import { tickets } from "../../../data/sampleTickets"

export interface sampleTickets {
    id: number,
    title: string,
    description: string,
    priority: string,
    status: string,
    createdAt: Date
}

export interface urgency {
    priority: string,
    baseScore: number
}

export const getAllTicketsServices = (): {} => {

    return { tickets: tickets, count: tickets.length };

};

export const getTicketByIdServices = (id: number): sampleTickets | undefined => {

    let ticket = tickets.find(x => x.id == id)

    return ticket;

};

export const createTicketServices = (item: string): string => {
    // Logic to add a new item to the database
    return "Item added";
};

export const updateTicketByIdServices = (id: number, item: string): string => {
    // Logic to update an item in the database
    return "Item updated";
};

export const deleteTicketByIdServices = (
    id: number
): { deleted?: sampleTickets; error?: string } => {

    // Logic to delete a ticket
    const toDelete = tickets.findIndex(x => x.id === id);
    if (toDelete === -1) return { error: "ticket not found" };

    const [deleted] = tickets.splice(toDelete, 1);
    return { deleted };
};