import { tickets, Urgency, Priority, Status } from "../../../data/sampleTickets"

export interface sampleTickets {
    id: number,
    title: string,
    description: string,
    priority: Priority,
    status: Status,
    createdAt: Date
}

export interface urgency {
    priority: Priority;
    baseScore: number;
}

const validPriorities: Priority[] = ["critical", "high", "medium", "low"];
const validStatuses: Status[] = ["open", "resolved"];

function isNonEmptyString(v: unknown): v is string {
    return typeof v === "string" && v.trim().length > 0;
}

function isValidDate(v: unknown): boolean {
    const d = v instanceof Date ? v : new Date(v as any);
    return !Number.isNaN(d.getTime());
}


export const getAllTicketsServices = (): { tickets: sampleTickets[]; count: number } => {

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
        return { error: "status must be: open, resolved" };
    }

    if (!isValidDate(newTicket.createdAt)) {
        return { error: "createdAt must be a valid date" };
    }

    // Normalize createdAt to Date in case client sent a string
    newTicket.createdAt = new Date(newTicket.createdAt);

    tickets.push(newTicket);
    return { created: newTicket };
};


export const updateTicketByIdServices = (
    id: number,
    updates: Partial<Omit<sampleTickets, "id">>
): { updated?: sampleTickets; error?: string } => {

    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return { error: "ticket not found" };

    // Validate only what exists
    if (updates.title !== undefined && !isNonEmptyString(updates.title)) {
        return { error: "title must be a non-empty string" };
    }

    if (updates.description !== undefined && !isNonEmptyString(updates.description)) {
        return { error: "description must be a non-empty string" };
    }

    if (updates.priority !== undefined && !validPriorities.includes(updates.priority as any)) {
        return { error: "priority must be: critical, high, medium, low" };
    }

    if (updates.status !== undefined && !validStatuses.includes(updates.status as any)) {
        return { error: "status must be: open, resolved" };
    }

    if (updates.createdAt !== undefined && !isValidDate(updates.createdAt)) {
        return { error: "createdAt must be a valid date" };
    }

    // Apply updates
    Object.assign(ticket, updates);

    // Normalize createdAt if provided
    if (updates.createdAt !== undefined) {
        ticket.createdAt = new Date(updates.createdAt);
    }

    return { updated: ticket };
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