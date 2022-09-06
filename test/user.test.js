require('dotenv').config()
const request = require('supertest')
const assert = require('assert')
const express = require('express')
const HOST = 'http://localhost'
const PORT = process.env.PORT || '3000'


const User1 = {
    "name": "Waseem",
    "age": 16
}


describe("/user GET ", () => {
    it("It should retrieve Users list", (done) => {
        request(`${HOST}:${PORT}`)
            .get('/user')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)
                console.log(res.body)
                return done()
            })
    })
})

let userId
describe("/user POST ", () => {
    it("It should create User", (done) => {
        request(`${HOST}:${PORT}`)
            .post('/user')
            .send(User1)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)
                expect(res.body.data.name).toBe(User1.name)
                expect(res.body.data.age).toBe(User1.age)
                userId = res.body._id
                return done()
            })
    })
})
console.log(userId)
describe("/user/:id GET ", () => {
    it("It should retrieve User by id", (done) => {
        request(`${HOST}:${PORT}`)
            .get(`/user/${userId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)
                expect(res.body.data.name).toBe(User1.name)
                expect(res.body.data.age).toBe(User1.age)
                return done()
            })
    })
})

describe("/user/:id PUT ", () => {
    it("It should update User name", (done) => {
        request(`${HOST}:${PORT}`)
            .put(`/user/${userId}`)
            .send({ 'name': 'Kaleem' })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)
                expect(res.body.data.name).toBe("Kaleem")
                return done()
            })
    })
    it("It should update User age", (done) => {
        request(`${HOST}:${PORT}`)
            .put(`/user/${userId}`)
            .send({ "age": 70 })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)
                expect(res.body.data.age).toBe(70)
                return done()
            })
    })
})


describe("/user/:id DELETE ", () => {
    it("It should delete User by id", (done) => {
        request(`${HOST}:${PORT}`)
            .delete(`/user/${userId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)
                expect(res.body.message).toBe('Deleted Successfully')
                return done()
            })
    })
})