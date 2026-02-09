import { tickets, Urgency } from "../src/data/sampleTickets";
import { getTicketByIdServices } from "../src/api/v1/services/ticketServices";
import { getTicketUrgencyByIdServices } from "../src/api/v1/services/ticketUrgencyServices";

describe("Ticket Urgency Service (AAA) - No Mocks", () => {
  beforeAll(() => {
    // Arrange
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-01-15T10:00:00.000Z"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("calculates age + score correctly for an OPEN LOW ticket", () => {
    // Arrange
    const id = 1;
    const ticket = getTicketByIdServices(id);
    expect(ticket).toBeDefined();

    // baseScore for low = 10 
    const baseScore = Urgency.find(u => u.priority === "low")?.baseScore;
    expect(baseScore).toBe(10);

    // compute expected age 
    const now = new Date("2025-01-15T10:00:00.000Z");
    const createdAt = new Date(ticket!.createdAt);
    const msPerDay = 1000 * 60 * 60 * 24;
    const expectedAge = Math.max(0, Math.floor((now.getTime() - createdAt.getTime()) / msPerDay));

    const expectedScore = 10 + expectedAge * 5;

    // Act
    const result = getTicketUrgencyByIdServices(id);

    // Assert
    expect(result).toHaveProperty("data");
    expect(result.data).toHaveProperty("ticketAge", expectedAge);
    expect(result.data).toHaveProperty("urgencyScore", expectedScore);
    expect(String(result.data.urgencyLevel).toLowerCase()).toContain("low");
  });

  test("resolved tickets return score 0 and a resolved message", () => {
    // Arrange
    const resolved = tickets.find(t => t.status === "resolved");
    expect(resolved).toBeDefined();

    const id = resolved!.id;

    // Act
    const result = getTicketUrgencyByIdServices(id);

    // Assert
    expect(result).toHaveProperty("data");
    expect(result.data).toHaveProperty("status", "resolved");
    expect(result.data).toHaveProperty("urgencyScore", 0);
    expect(String(result.data.urgencyLevel).toLowerCase()).toContain("resolved");
  });
});
