const request = require("supertest");
const app = require("../../app");

let tempTodoId = 0;

beforeAll(done => {
    done()
});

afterAll(done => {
    done()
});

describe("Create TODOS - POST /todos", () => {
    it("Should save todo to the database", async () => {
        const response = await request(app)
            .post('/todos/')
            .send({ text: "Test TODO" });
        expect(response.statusCode).toBe(201);
        expect(response.body.createdTodo.text).toBe("Test TODO");
        tempTodoId = response.body.createdTodo.id;
    });

    it("Should return 422 if text is empty", async () => {
        const response = await request(app)
            .post('/todos/')
            .send({ text: "" });
        expect(response.statusCode).toBe(422);
    });

    it("Should return 500 if request is not valid", async () => {
        const response = await request(app)
            .post('/todos/')
            .send({ someOtherKey: "" });
        expect(response.statusCode).toBe(500);
    });
});

describe("Get All TODOS - GET /todos", () => {
    it("Should get all todo from the database", async () => {
        const response = await request(app)
            .get('/todos/');
        expect(response.statusCode).toBe(200);
        expect(response.body.todos.length).toBeGreaterThan(0);
        expect(response.body.todos[0].text).toBeDefined();
        expect(Array.isArray(response.body.todos)).toBeTruthy();
    });
});

describe("Update TODOS - PATCH /todos", () => {
    it("Should get updated todo with 200", async () => {
        const response = await request(app)
            .patch('/todos/'+tempTodoId)
            .send({ text: "New Updated Test TODO" });;
        expect(response.statusCode).toBe(200);
        expect(response.body.updatedTodo.length).toBeGreaterThan(0);
        expect(response.body.updatedTodo[0].text).toBe("New Updated Test TODO");
    });

    it("Should get 400 when no id is found", async () => {
        const response = await request(app)
            .patch('/todos/'+'12345')
            .send({ text: "New Updated Test TODO" });;
        expect(response.statusCode).toBe(400);
    });

    it("Should get 422 when params or body is invalid", async () => {
        const response = await request(app)
            .patch('/todos/'+'12345')
            .send({ someOtherKey: "New Updated Test TODO" });;
        expect(response.statusCode).toBe(422);
    });
});

describe("Delete TODOS - DELETE /todos", () => {

    it("Should get 200 when TODO gets delete", async () => {
        const response = await request(app)
            .delete('/todos/'+tempTodoId)
        expect(response.statusCode).toBe(200);
    });

    it("Should get 400 when no id is found", async () => {
        const response = await request(app)
            .delete('/todos/'+'12345')
        expect(response.statusCode).toBe(400);
    });
});