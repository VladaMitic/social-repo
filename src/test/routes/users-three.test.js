const request = require("supertest");
const buildApp = require("../../app");
const UserRepo = require("../../repos/user-repo");
const pool = require("../../pool");
const Context = require("../context");

let context;
beforeAll(async () => {
  context = await Context.build();
});

beforeEach(async () => {
  return context.reset();
});

afterAll(() => {
  return context.close();
});

it("create a user", async () => {
  const startingCount = await UserRepo.count();
  //expect(startingCount).toEqual(0);

  await request(buildApp())
    .post("/users")
    .send({ username: "Test user", bio: "Test bio" })
    .expect(200);

  const finishingCount = await UserRepo.count();
  expect(finishingCount - startingCount).toEqual(1);
});
