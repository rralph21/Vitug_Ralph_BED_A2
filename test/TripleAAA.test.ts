import { tickets } from "../src/data/sampleTickets";
import {
  getTicketByIdServices,
  updateTicketByIdServices,
} from "../src/api/v1/services/ticketServices";

describe("Ticket Services AAA", () => {
  test("getTicketByIdServices returns a ticket when id exists", () => {
    // Arrange
    const id = tickets[0].id;

    // Act
    const result = getTicketByIdServices(id);

    // Assert
    expect(result).toBeDefined();
    expect(result?.id).toBe(id);
  });

  test("updateTicketByIdServices rejects invalid status", () => {
    // Arrange
    const id = tickets[0].id;

    // Act
    const result = updateTicketByIdServices(id, { status: "closed" as any });

    // Assert
    expect(result).toHaveProperty("error");
    expect(result.error).toMatch(/status/i);
  });
});
