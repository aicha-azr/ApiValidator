
const UserController = require('../Controllers/UserControllers');

describe('User Controller', () => {
  it('should get all users', async () => {
    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await UserController.getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0].length).toBeGreaterThan(0);
  });

  it('should create a new user', async () => {
    const req = { body: { name: 'John Doe', email: 'john@example.com' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await UserController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0].name).toBe('John Doe');
  });
});

describe('Expense Controller', () => {
  it('should get all expenses', async () => {
    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await ExpenseController.getAllExpenses(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0].length).toBeGreaterThan(0);
  });

  it('should create a new expense', async () => {
    const req = { body: { amount: 100, category: 'Food', date: '2024-04-01' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await ExpenseController.createExpense(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0].amount).toBe(100);
  });
});
