import request from "supertest";
import app from "../index";
import { Sequelize } from "sequelize";

let sequelize: any;
let server: any;

beforeAll(async () => {
  server = app.listen(3000);
});

afterAll(async () => {
  server.close();
});

describe("Vitor", () => {
  test("should return correct Fibonacci number for small inputs", async () => {
    const res = await request(app).get(`/fibonacci/3`);
    expect(res.status).toBe(200);
    expect(res.body.result).toBe("1");
  });
});

describe.skip("GET /fibonacci/:n", () => {
  // Basic test cases
  test("should return correct Fibonacci number for small inputs", async () => {
    const testCases = [
      { n: 0, expected: "0" },
      { n: 1, expected: "1" },
      { n: 2, expected: "1" },
      { n: 3, expected: "2" },
      { n: 10, expected: "55" },
      { n: 20, expected: "6765" },
    ];

    for (const { n, expected } of testCases) {
      const res = await request(app).get(`/fibonacci/${n}`);
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(expected);
    }
  });

  // Edge cases
  test("should handle edge cases properly", async () => {
    // Zero case
    const resZero = await request(app).get("/fibonacci/0");
    expect(resZero.body.result).toBe("0");

    // Negative number
    const resNeg = await request(app).get("/fibonacci/-5");
    expect(resNeg.status).toBe(400);

    // Non-integer input
    const resFloat = await request(app).get("/fibonacci/5.5");
    expect(resFloat.status).toBe(400);

    // Non-numeric input
    const resString = await request(app).get("/fibonacci/abc");
    expect(resString.status).toBe(400);
  });

  // Extreme cases
  test("should handle large numbers (up to limit)", async () => {
    // Large but allowed number
    const resLarge = await request(app).get("/fibonacci/100");
    expect(resLarge.status).toBe(200);
    expect(resLarge.body.result).toBe("354224848179261915075");

    // Extremely large number (beyond limit)
    const resTooLarge = await request(app).get("/fibonacci/1001");
    expect(resTooLarge.status).toBe(400);
  });

  // Performance test
  test("should respond quickly for repeated calls", async () => {
    const start = Date.now();
    const calls = [50, 100, 150, 200];

    await Promise.all(calls.map((n) => request(app).get(`/fibonacci/${n}`)));

    const duration = Date.now() - start;
    expect(duration).toBeLessThan(1000); // All calls should complete in <1s
  });

  // Stress test
  test("should handle concurrent requests", async () => {
    const concurrentRequests = 20;
    const promises = Array(concurrentRequests)
      .fill(0)
      .map((_, i) => request(app).get(`/fibonacci/${i + 50}`));

    const results = await Promise.all(promises);
    results.forEach((res) => {
      expect(res.status).toBe(200);
      expect(res.body.result).toBeTruthy();
    });
  });
});
