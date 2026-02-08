import { tickets, Urgency } from "../../../data/sampleTickets"

export interface sampleTickets {
    id: number,
    title: string,
    description: string,
    priority: string,
    status: string,
    createdAt: Date
}

type Priority = "critical" | "high" | "medium" | "low";
type Status = "open" | "closed";

const validPriorities: Priority[] = ["critical", "high", "medium", "low"];
const validStatuses: Status[] = ["open", "closed"];

function isNonEmptyString(v: unknown): v is string {
    return typeof v === "string" && v.trim().length > 0;
}

function isValidDate(v: unknown): boolean {
    const d = v instanceof Date ? v : new Date(v as any);
    return !Number.isNaN(d.getTime());
}


export const getAllTicketsServices = (): {} => {

    return { tickets: tickets, count: tickets.length };

};

export const getTicketByIdServices = (id: number): sampleTickets | undefined => {

    let ticket = tickets.find(x => x.id == id)

    return ticket;

};

export const createTicketServices = (
    newTicket: sampleTickets
): { created?: sampleTickets; error?: string } => {

    if (typeof newTicket.id !== "number" || newTicket.id <= 0) {
        return { error: "id must be a positive number" };
    }

    if (tickets.some(t => t.id === newTicket.id)) {
        return { error: "ticket id already exists" };
    }

    if (!isNonEmptyString(newTicket.title)) return { error: "title is required" };
    if (!isNonEmptyString(newTicket.description)) return { error: "description is required" };

    if (!validPriorities.includes(newTicket.priority as any)) {
        return { error: "priority must be: critical, high, medium, low" };
    }

    if (!validStatuses.includes(newTicket.status as any)) {
        return { error: "status must be: open, closed" };
    }

    if (!isValidDate(newTicket.createdAt)) {
        return { error: "createdAt must be a valid date" };
    }

    // Normalize createdAt to Date in case client sent a string
    newTicket.createdAt = new Date(newTicket.createdAt);

    tickets.push(newTicket);
    return { created: newTicket };
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