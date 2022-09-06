const mongoose = require("mongoose")
const createServer = require("../server")
const User = require("../src/models/user")
const db = require('../src/utils/db')

const app = createServer()

test("GET /user", async () => {
    const user = await User.create({
        name: "user 1",
        age: 45,
    })

    await supertest(app)
        .get("/api/user")
        .expect(200)
        .then((response) => {
            // Check the response type and length
            expect(Array.isArray(response.body)).toBeTruthy()
            expect(response.body.length).toEqual(1)

            // Check the response data
            expect(response.body[0]._id).toBe(user.id)
            expect(response.body[0].name).toBe(user.name)
            expect(response.body[0].age).toBe(user.age)
        })
})