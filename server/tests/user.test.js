const request = require("supertest");
const app = require("../index");
require("dotenv").config();

describe("POST /signUp, Api to Sign Up", () => {
  test("It should respond with user token and details", async () => {
    let body = {
      name: process.env.TEST_USER_NAME,
      username: process.env.TEST_USER,
      email: process.env.TEST_USER_EMAIL,
      phone: process.env.TEST_USER_PHONE,
      password: process.env.TEST_USER_PASSWORD
    }
    let response = await request(app).post('/signUp').send(body)
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Logged In Successfully')
    expect(response.body.username).toBeDefined();
    expect(response.body.token).toBeDefined();
  });
});

describe("POST /signIn, Api to Sign In", () => {
  test("It should respond with user token and details", async () => {
    let body = {
      username: process.env.TEST_USER,
      password: process.env.TEST_USER_PASSWORD
    }
    let response = await request(app).post('/signIn').send(body)
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Logged In Successfully')
    expect(response.body.username).toBeDefined();
    expect(response.body.token).toBeDefined();
  });
});

describe("GET /profile/:username, Api to fetch User's Profile", () => {
  test("It should respond with user details", async () => {
    let response = await request(app).get(`/profile/${process.env.TEST_USER}`)
    expect(response.statusCode).toBe(200);
    expect(response.body.profileData.username).toBe(process.env.TEST_USER)
    expect(response.body.profileData.id).toBeDefined();
  });
});