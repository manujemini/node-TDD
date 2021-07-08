const todoController = require('../../controllers/todos.js');
const httpMocks = require('node-mocks-http');
const queryTodo = require('../../models/todo.js');

queryTodo.createTodoQuery = jest.fn();
queryTodo.getTodoQuery = jest.fn();
queryTodo.updateTodoQuery = jest.fn();
queryTodo.deleteTodoQuery = jest.fn();


let req, res, next, tempTodo;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
})

describe("Create TODOs", () => {
    beforeEach(() => {
        req.body = { text: "Testing TODO" };
        tempTodo = {};
        tempTodo.rows = [{ id: 1, text: "Testing TODO", time: '12:00:00' }];
        queryTodo.createTodoQuery.mockReturnValue(tempTodo);
    })

    it("Should have a createTodo function", () => {
        expect(typeof todoController.createTodo).toBe("function");
    })

    it("should call createTodoQuery", async () => {
        await todoController.createTodo(req, res, next);
        expect(queryTodo.createTodoQuery).toBeCalled();
    })

    it("should return 201 response code after creating todo", async () => {

        await todoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })

    it("Should not create todo when empty todo passed", async () => {
        req.body = { text: "" };
        await todoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(422)
    })

    it("Should not create todo when no todo passed", async () => {
        req.body = { someOtherKey: "" };
        await todoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(500)
    })

    it("should return json body in response", async () => {
        await todoController.createTodo(req, res, next);
        expect(res._getData().createdTodo).toStrictEqual(tempTodo.rows[0]);
    })

})

describe("Get TODOs", () => {
    beforeEach(() => {
        req.body = { text: "Testing TODO" };
        tempTodo = {};
        tempTodo.rows = [{ id: 1, text: "Testing TODO", time: '12:00:00' }];
        queryTodo.getTodoQuery.mockReturnValue(tempTodo);
    })

    it("Should have a getTodos function", () => {
        expect(typeof todoController.getTodos).toBe("function");
    })

    it("Should give response code 200 after sending list of todos successfully", async () => {
        await todoController.getTodos(req, res, next);
        expect(res.statusCode).toBe(200)
    })

    it("Should give list of todos after adding atleast one", async () => {
        req.body = { text: "Test TODO text" };
        tempTodo.rows[0].text = req.body.text;

        await todoController.createTodo(req, res, next);
        await todoController.getTodos(req, res, next);

        expect(JSON.parse(
            res._getData().replace('[object Object]', '')
        ).todos.length).toBeGreaterThanOrEqual(1)
    })

    it("Should send 400 if no todo found", async () => {
        tempTodo.rows = [];
        await todoController.getTodos(req, res, next);
        expect(res.statusCode).toBe(400)
    })
})

describe("Update TODOs", () => {
    beforeEach(() => {
        req.body = { text: "Testing TODO" };
        tempTodo = {};
        tempTodo.rows = [{ id: 1, text: "Testing TODO", time: '12:00:00' }];
        tempTodo.rowCount = 1;
        queryTodo.updateTodoQuery.mockReturnValue(tempTodo);
    })

    it("Should have a updateTodo function", () => {
        expect(typeof todoController.updateTodo).toBe("function");
    })

    it("Should give updated todo when todo id available", async () => {
        req.params.id = 1;
        req.body = { text: "Updated Testing TODO" };
        tempTodo.rows[0].text = req.body.text;
        await todoController.updateTodo(req, res, next);
        expect(JSON.parse(res._getData()).updatedTodo[0].text)
            .toEqual(req.body.text)
    })

    it("Should give response code 400 if no todo found", async () => {
        req.params.id = 12345;
        req.body = { text: "Updated Testing TODO" };
        tempTodo.rows = [];
        tempTodo.rowCount = 0;
        await todoController.updateTodo(req, res, next);
        expect(res.statusCode)
            .toBe(400)
    })

    it("Should not update todo when no id or todo passed", async () => {
        req.params.someOtherKey = 12345;
        req.body = { someOtherKey: "Some text" };
        await todoController.updateTodo(req, res, next);
        expect(res.statusCode).toBe(422)
    })
})

describe("Delete TODOs", () => {
    beforeEach(() => {
        req.body = { text: "Testing TODO" };
        tempTodo = {};
        tempTodo.rows = [{ id: 1, text: "Testing TODO", time: '12:00:00' }];
        tempTodo.rowCount = 1;
        queryTodo.deleteTodoQuery.mockReturnValue(tempTodo);
    })
    it("Should have a deleteTodo function", () => {
        expect(typeof todoController.deleteTodo).toBe("function");
    })

    it("Should delete todo when todo id is available", async () => {
        req.params.id = 1;
        await todoController.deleteTodo(req, res, next);
        expect(res.statusCode)
            .toEqual(200)

        expect(JSON.parse(res._getData()).message)
            .toEqual("Todo deleted!")
    })

    it("Should give response code 400 if no todo found", async () => {
        req.params.id = 12345;
        tempTodo.rows = [];
        tempTodo.rowCount = 0;
        await todoController.deleteTodo(req, res, next);
        expect(res.statusCode)
            .toBe(400)
    })

    it("Should not delete todo when no id passed", async () => {
        req.params.someOtherKey = 12345;
        await todoController.deleteTodo(req, res, next);
        expect(res.statusCode).toBe(422)
    })
})