const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const app = express();

const customers = [];

app.use(cors());

app.use(express.json());

function verifyIfExistsAccountWithTaxpayerId(request, response, next) {
  const taxpayerId = request.header("Taxpayer-Id");

  const customer = customers.find(
    (element) => element.taxpayerId === taxpayerId
  );

  if (!customer) {
    return response
      .status(400)
      .json({ error: { message: "Customer not found" } });
  }

  request.customer = customer;

  return next();
}

function getBalance(statement) {
  return statement.reduce((accumulator, operation) => {
    if (operation.type === "credit") {
      return accumulator + operation.amount;
    } else {
      return accumulator - operation.amount;
    }
  }, 0);
}

app.get("/", (request, response) => {
  return response.json({ message: "FinAPI" });
});

app.post("/account", (request, response) => {
  const { taxpayerId, name } = request.body;

  const customerAlreadyExists = customers.some(
    (element) => element.taxpayerId === taxpayerId
  );

  if (customerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists!" });
  }

  const id = uuidv4();

  customers.push({
    taxpayerId,
    name,
    id,
    statement: [],
  });

  return response.status(201).send();
});

app.get(
  "/statement",
  verifyIfExistsAccountWithTaxpayerId,
  (request, response) => {
    const { customer } = request;

    return response.json(customer.statement);
  }
);

app.post(
  "/deposit",
  verifyIfExistsAccountWithTaxpayerId,
  (request, response) => {
    const { description, amount } = request.body;

    const { customer } = request;

    const statementOperation = {
      description,
      amount,
      createAt: new Date(),
      type: "credit",
    };

    customer.statement.push(statementOperation);

    return response.status(201).send();
  }
);

app.post(
  "/withdraw",
  verifyIfExistsAccountWithTaxpayerId,
  (request, response) => {
    const { amount } = request.body;

    const { customer } = request;

    const balance = getBalance(customer.statement);

    if (balance < amount) {
      return response.status(400).json({
        error: {
          message: "Insufficient funds",
        },
      });
    }

    const statementOperation = {
      description: "Withdraw",
      amount,
      createdAt: new Date(),
      type: "debit",
    };

    customer.statement.push(statementOperation);

    return response.status(201).send();
  }
);

app.get(
  "/statement/date",
  verifyIfExistsAccountWithTaxpayerId,
  (request, response) => {
    const { customer } = request;

    const { date } = request.query;

    const dateFormat = new Date(date + " 00:00");

    const statement = customer.statement.filter(
      (element) => element.createAt === new Date(dateFormat).toDateString()
    );

    return response.json(statement);
  }
);

app.put(
  "/account",
  verifyIfExistsAccountWithTaxpayerId,
  (request, response) => {
    const { customer } = request;

    const { name } = request.body;

    customer.name = name;

    return response.status(201).send();
  }
);

app.get(
  "/account",
  verifyIfExistsAccountWithTaxpayerId,
  (request, response) => {
    const { customer } = request;

    return response.json(customer);
  }
);

app.delete(
  "/account",
  verifyIfExistsAccountWithTaxpayerId,
  (request, response) => {
    const { customer } = request;

    customers.splice(customer, 1);

    return response.status(200).json(customers);
  }
);

app.get(
  "/balance",
  verifyIfExistsAccountWithTaxpayerId,
  (request, response) => {
    const { customer } = request;

    const balance = getBalance(customer.statement);

    return response.json({
      balance,
    });
  }
);

app.listen(process.env.PORT || 3333, () => {
  console.log("Server started on port 3333");
});
