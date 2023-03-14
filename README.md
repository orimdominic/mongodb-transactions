# mongodb-transactions

An Express project to demonstrate the use of transactions in MongoDB (when running locally). See the article [How to Handle MongoDB Transactions on your Local Server](https://orimdominic.vercel.com/posts/how-to-handle-mongodb-transactions-on-your-local-server/) for the MongoDB database setup.

## How to run the project

1. Clone the project
2. Install the dependencies using your preferred JavaScript package manager (pnpm recommended)
3. Make sure that you have your `run-rs` server running already
4. Set the `DB_URI` and `MIGRATE_dbConnectionUri` to the value of the mongo URI on your run-rs server: `mongodb://localhost:[27000],localhost:27001,localhost:27002/[database-name]?replicaSet=rs`, replacing [database-name] with your chosen database name
4. Run `pnpm run start`

## API endpoints

Base URL: `http://localhost:3000`

### Get all users
```
method: GET
path: /users

sample response (200): {
  "docs": [
    {
      "id": "6410c646eb1ed71dae40dac9",
      "email": "nels_kuvalis92@hotmail.com",
      "balance": 35
    },
    {
      "id": "6410c646eb1ed71dae40dac6",
      "email": "krystal_koss85@gmail.com",
      "balance": 53
    }
  ]
}
```

### Transfer funds
```
method: POST
path: /transfers

sample body: {
  senderId: "6410c646eb1ed71dae40dac9",
  recipientId: "6410c646eb1ed71dae40dac6",
  amount: 10
}

sample success response (201): {
  "status": "success",
  "message": "Transaction completed successfully"
}

sample error response (500): {
  "error": "Insufficient balance 😬",
  "status": "error"
}
```

### Get all transfers
```
method: GET
path: /transfers

sample response (200): {
  "docs": [
    {
      "id": "6410d91cce2520d19496fff5",
      "senderId": "6410c646eb1ed71dae40dac7",
      "recipientId": "6410c646eb1ed71dae40daca",
      "amount": 10
    }
  ]
}