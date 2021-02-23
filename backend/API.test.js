const request = require("superTest");
const todoExample = {
  "my-todo": [
    {
      text: "An example to-do",
      priority: "1",
      date: 1611662776177,
      id: 0,
    },
  ],
};

const app = require("./localAPI.js");
describe("GET by id route", () => {
  it("can get bin by id", async () => {
    const response = await request(app).get("/b/example");

    expect(response.status).toBe(200);
    expect(JSON.parse(response.body)).toEqual(todoExample);
  });

  it(" If a bin is not found an appropriate response is sent", async () => {
    const response = await request(app).get("/b/654");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      msg: `There is not task with that id`,
    });
  });
});

describe("POST route", () => {
  it("POST success", async () => {
    const response = await request(app).post("/b").send(todoExample);

    expect(response.status).toBe(201);
  });
});

describe("PUT route", () => {
  it("Can update a bin by id", async () => {
    const response = await request(app).put("/b/forTest").send(todoExample);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(todoExample);
  });
});
