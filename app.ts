import inquirer from "inquirer";
import chalk from "chalk";

// Define a sample customer database
const customers = [
  {
    accountNumber: '1234567890',
    firstname: 'John',
    lastname: 'Doe',
    account: {
      balance: 1000
    }
  }
];

// Function to interact with the bank account
async function service() {
  do {
    const accountNumberInput = await inquirer.prompt([
      {
        name: "accountNumber",
        type: "input",
        message: "Enter your account number:"
      }
    ]);

    const customer = customers.find(customer => customer.accountNumber === accountNumberInput.accountNumber);

    if (customer) {
      console.log(`Welcome ${customer.firstname} ${customer.lastname}`);

      const ans = await inquirer.prompt([
        {
          name: "service",
          type: "list",
          message: "Select a service:",
          choices: ["Check balance", "Deposit", "Withdraw", "Exit"]
        }
      ]);

      switch (ans.service) {
        case "Check balance":
          console.log(`Your balance is: ${customer.account.balance}`);
          break;
        case "Deposit":
          const amounts = await inquirer.prompt([
            {
              name: "amount",
              type: "input",
              message: "Enter the amount to deposit:"
            }
          ]);
          customer.account.balance += parseInt(amounts.amount);
          console.log(`Deposited ${amounts.amount}. New balance is: ${customer.account.balance}`);
          break;
        case "Withdraw":
          const amount = await inquirer.prompt([
            {
              name: "amount",
              type: "input",
              message: "Enter the amount to withdraw:"
            }
          ]);
          if (customer.account.balance >= parseInt(amount.amount)) {
            customer.account.balance -= parseInt(amount.amount);
            console.log(`Withdrew ${amount.amount}. New balance is: ${customer.account.balance}`);
          } else {
            console.log("Insufficient funds");
          }
          break;
        case "Exit":
          console.log(`Thank you ${customer.firstname} ${customer.lastname}`);
          console.log("Thank you for using our service");
          console.log(chalk.bold.green('\n>>>>>>--------ALWAYS CHOOSE MY BANK--------<<<<<<<\n'));
          console.log(chalk.bold.red('\n>>>>>>--------THANK YOU--------<<<<<<<\n'));
          process.exit(0);
      }
    } else {
      console.log("Invalid account number");
    }
  } while (true);
}

service()