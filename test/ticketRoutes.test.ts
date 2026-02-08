import request  from "supertest";
import * as ticketControllers from "../src/api/v1/controllers/ticketControllers";

jest.mock("../src/api/v1/controllers/ticketControllers", () => ({
    getAllTickets: jest.fn((req, res) => res.status(200).send()),
    getTicketById: jest.fn((req, res) => res.status(200).send()),
    createTicketById: jest.fn((req, res) => res.status(201).send()),
    updateTicketById: jest.fn((req, res) => res.status(200).send()),
    deleteTicketById: jest.fn((req, res) => res.status(200).send()),
    getTicketUrgencyById: jest.fn((req, res) => res.status(200).send()),
}))

const app = require("../src/app").default;

describe("Ticket Routes", () => {
  afterEach(() => jest.clearAllMocks());

  test("GET /api/v1/tickets → getAllTickets", async () => {
    const res = await request(app).get("/api/v1/tickets");

    expect(res.status).toBe(200);
    expect(ticketControllers.getAllTickets).toHaveBeenCalledTimes(1);
  });

  test("GET /api/v1/tickets/:id → getTicketByID", async () => {
    const res = await request(app).get("/api/v1/tickets/1");

    expect(res.status).toBe(200);
    expect(ticketControllers.getTicketById).toHaveBeenCalledTimes(1);
  });

  test("POST /api/v1/tickets → createTicketById", async () => {
    const res = await request(app)
      .post("/api/v1/tickets")
      .send({
        id: 99,
        title: "Test ticket",
        description: "test",
        priority: "low",
        status: "open",
        createdAt: new Date().toISOString(),
      });

    expect(res.status).toBe(201);
    expect(ticketControllers.createTicketById).toHaveBeenCalledTimes(1);
  });

  test("PUT /api/v1/tickets/:id → updateTicketById", async () => {
    const res = await request(app)
      .put("/api/v1/tickets/1")
      .send({ status: "resolved" });

    expect(res.status).toBe(200);
    expect(ticketControllers.updateTicketById).toHaveBeenCalledTimes(1);
  });

  test("DELETE /api/v1/tickets/:id → deleteTicketById", async () => {
    const res = await request(app).delete("/api/v1/tickets/1");

    expect(res.status).toBe(200);
    expect(ticketControllers.deleteTicketById).toHaveBeenCalledTimes(1);
  });

});
