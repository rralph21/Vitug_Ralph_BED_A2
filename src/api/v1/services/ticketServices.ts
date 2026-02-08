import { tickets } from "../../../data/sampleTickets"

export interface sampleTickets{
    id: number,
    title: string,
    description: string,
    priority: string,
    status: string,
    createdAt: Date
}

export interface urgency{
    priority: string,
    baseScore: number
}

export const getAllTicketsServices = (): {} => {
    
    return {tickets: tickets, count: tickets.length};

};

export const getTicketByIdServices = (): {} => {
    
    return {tickets: tickets, count: tickets.length};

};

export const createTicketServices = (item: string): string => {
    // Logic to add a new item to the database
    return "Item added";
};

export const updateTicketByIdServices = (id: number, item: string): string => {
    // Logic to update an item in the database
    return "Item updated";
};

export const deleteTicketByIdServices = (id: number): string => {
    // Logic to delete an item from the database
    return "Item deleted";
};