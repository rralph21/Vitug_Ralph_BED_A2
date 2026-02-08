import { sampleTickets, urgency } from "../api/v1/services/ticketServices"

export type Priority = "critical" | "high" | "medium" | "low";
export type Status = "open" | "resolved";

export const tickets: sampleTickets[] = [
    {
        id: 1,
        title: "Update footer copyright year",
        description: "Footer still shows 2024",
        priority: "low",
        status: "open",
        createdAt: new Date("2026-02-11T10:00:00.000Z")
    },

    {
        id: 2,
        title: "Profile picture upload",
        description: "slow Upload takes 30+ seconds",
        priority: "medium",
        status: "open",
        createdAt: new Date('2026-02-13T10:00:00.000Z') 
    },

    {
        id: 3,
        title: "Dashboard loading slowly",
        description: "Dashboard takes 10+ seconds to load",
        priority: "medium",
        status: "open",
        createdAt: new Date('2026-02-09T10:00:00.000Z') 
    },

     {
        id: 4,
        title: "Password reset email delayed",
        description: "Reset emails taking over 30 minutes",
        priority: "high",
        status: "open",
        createdAt: new Date('2026-02-10T10:00:00.000Z') 
    },

     {
        id: 5,
        title: "Export to PDF not working",
        description: "PDF export fails silently",
        priority: "high",
        status: "open",
        createdAt: new Date('2026-02-06T10:00:00.000Z') 
    },

     {
        id: 6,
        title: "Login page not loading",
        description: "Users report blank screen on login",
        priority: "critical",
        status: "open",
        createdAt: new Date('2026-02-09T10:00:00.000Z') 
    },

     {
        id: 7,
        title: "Dark mode toggle broken",
        description: "Dark mode doesn't persist after reflesh",
        priority: "medium",
        status: "resolved",
        createdAt: new Date('2026-02-05T10:00:00.000Z') 
    },
]

export const Urgency: urgency[] = [
    {
        priority: "critical",
        baseScore: 50
    },

    {
        priority: "high",
        baseScore: 30
    },

    {
        priority: "medium",
        baseScore: 20
    },

    {
        priority: "low",
        baseScore: 10
    }
]


