import { Urgency } from "../../../data/sampleTickets";
import { getTicketByIdServices } from "./ticketServices";

const AGE_MULTIPLIER = 5;

function getTicketAgeDays(createdAt: Date): number {
    const now = new Date();
    const msPerDay = 1000 * 60 * 60 * 24;
    const diff = Math.floor((now.getTime() - createdAt.getTime()) / msPerDay);
    return Math.max(0, diff);
}

function getUrgencyLevel(score: number): string {
    if (score >= 80) return "Critical urgency. Address immediately.";
    if (score >= 50) return "High urgency. Prioritize soon.";
    if (score >= 30) return "Medium urgency. Schedule in near term.";
    return "Low urgency. Address when capacity allows.";
}

export const getTicketUrgencyByIdServices = (
    id: number
): { data?: any; error?: string } => {
    const ticket = getTicketByIdServices(id);
    if (!ticket) return { error: "ticket not found" };

    const ticketAge = getTicketAgeDays(ticket.createdAt);

    // Resolved handling
    if (ticket.status === "resolved") {
        return {
            data: {
                id: ticket.id,
                title: ticket.title,
                priority: ticket.priority,
                status: ticket.status,
                createdAt: ticket.createdAt,
                ticketAge,
                urgencyScore: 0,
                urgencyLevel: "Resolved ticket. No urgency.",
            },
        };
    }

    const baseScore = Urgency.find(u => u.priority === ticket.priority)?.baseScore ?? 0;
    const urgencyScore = baseScore + ticketAge * AGE_MULTIPLIER;
    const urgencyLevel = getUrgencyLevel(urgencyScore);

    return {
        data: {
            id: ticket.id,
            title: ticket.title,
            priority: ticket.priority,
            status: ticket.status,
            createdAt: ticket.createdAt,
            ticketAge,
            urgencyScore,
            urgencyLevel,
        },
    };
};