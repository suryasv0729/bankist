"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
/*
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};
const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
*/
// DIFFERENT DATA! Contains movement dates, currency and locale
window.alert("USER1: sa  PIN: 1111  USER2: sk PIN: 2222");

const account1 = {
  owner: "Swetha Arulnidhi",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2023-06-18T17:01:17.194Z",
    "2023-06-15T18:49:59.371Z",
    "2023-06-17T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "santhosh kumar",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2023-06-15T18:49:59.371Z",
    "2023-06-17T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
let currentAccount, timer;
const setlogouttimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    time--;
  };
  let time = 120;
  tick();
  timer = setInterval(tick, 1000);
  return timer;
};
const formatDate = function (date) {
  const calcdays = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  //console.log(calcdays(new Date(2023, 7, 29), new Date(2023, 7, 2)));
  const dayspassed = calcdays(new Date(), date);
  //console.log(dayspassed);
  if (dayspassed === 0) return "today";
  if (dayspassed === 1) return "yesterday";
  if (dayspassed <= 7) return `${dayspassed} days ago`;
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth()}`.padStart(2, 0);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    const date = new Date(currentAccount.movementsDates[i]);
    //console.log(date);
    const displayDates = formatDate(date);
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDates}</div>
    <div class="movements__value">${mov.toFixed(2)} €</div>
  </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
//displayMovements(account1.movements);
const name = "Steven Thomas Williams";
const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((names) => names[0])
      .join("");
  });
};
createUserName(accounts);
//console.log(accounts);
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const calcDisplaySummary = function (acc) {
  const deposits = acc.movements.filter((mov) => mov > 0);
  //console.log(deposits);
  const withdrawal = acc.movements.filter((mov) => mov < 0);
  //console.log(withdrawal);
  const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  acc.balance = balance;
  labelBalance.textContent = `${balance.toFixed(2)}€`;
  const income = deposits.reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income.toFixed(2)}€`;
  const out = withdrawal.reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;
  const intrest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((intr) => intr >= 1)
    .reduce((acc, intr) => acc + intr, 0);
  labelSumInterest.textContent = `${intrest.toFixed(2)}€`;
};
//calcDisplaySummary(account1.movements);

const eurToUSD = 1.1;
const totalDepositsUSD = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUSD)
  .reduce((acc, mov) => acc + mov, 0);
//console.log(totalDepositsUSD);
const firstWithdrawal = movements.find((mov) => mov < 0);
//console.log(firstWithdrawal);
for (const acc of accounts) {
  acc.owner === "Jessica Davis" ? console.log(acc) : "";
}
const updateUI = function (acc) {
  calcDisplaySummary(acc);
  //display movements
  displayMovements(acc.movements);
};
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (mov) => mov.userName === inputLoginUsername.value
  );
  if (currentAccount?.pin === +inputLoginPin.value) {
    //displaying welcome message & UI

    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }😊`;
    containerApp.style.opacity = 100;
    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur();
    //calculate  & display balance
    if (timer) clearInterval(timer);
    timer = setlogouttimer();
    updateUI(currentAccount);
    const now = new Date();
    const date = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth()}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = now.getHours();
    const min = now.getMinutes();
    labelDate.textContent = `${date}/${month}/${year}, ${hour}:${min}`;
    //calculate & display summary
  }
});
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  //console.log(amount);
  const receiverAcc = accounts.find(
    (mov) => mov.userName === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferAmount.blur();
  //console.log(receiverAcc);
  if (
    amount > 0 &&
    receiverAcc &&
    amount <= currentAccount.balance &&
    receiverAcc.userName !== currentAccount.userName
  ) {
    //console.log("pipe");
    currentAccount.movements.push(-amount);
    receiverAcc?.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    //update UI
    clearInterval(timer);
    timer = setlogouttimer();
    updateUI(currentAccount);
  }
});
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  const index = accounts.findIndex(
    (mov) => mov.userName === inputCloseUsername.value
  );
  // console.log(index);
  if (currentAccount?.pin === +inputClosePin.value) {
    inputClosePin.value = inputCloseUsername.value = "";
    // console.log("enteredddd");
    inputClosePin.blur();
    accounts.splice(index, 1);
    // console.log(accounts);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `No Longer a user  😕 `;
  }
});
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  //console.log(amount);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount / 10)
  ) {
    setTimeout(function () {
      //console.log("entered");
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      clearInterval(timer);
      timer = setlogouttimer();
      updateUI(currentAccount);
      inputLoanAmount.blur();
      inputLoanAmount.value = "";
    }, 2500);
  }
});
let sortcheck = false;
btnSort.addEventListener("click", function () {
  const check = !sortcheck
    ? currentAccount.movements.slice().sort((a, b) => a - b)
    : currentAccount.movements;
  console.log(check);
  displayMovements(check);
  sortcheck = !sortcheck;
});
/*parsing
console.log(Number.parseInt("30px"));
console.log(Number.parseFloat("2.5px"));
console.log(12345678999999992378788727474727n);
console.log(12345678999999992378788727474727);
const now = new Date();
console.log(now);
console.log(new Date(account1.movementsDates[0]));

//console.log(balance);
//const deposits=movements.
//console.log(containerMovements.innerHTML);
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets
HINT: Use tools from all lectures in this section so far 😉
TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
GOOD LUCK 😀

const juliaData = [3, 5, 2, 12, 7];
const juliaDataCopy = juliaData.slice(1, 3);
//console.log(juliaDataCopy);
const kateData = [4, 1, 15, 8, 3];
const checkDogs = function (dogsData) {
  dogsData.forEach(function (age, dogNo) {
    //console.log(dogNo);
    age < 3
      ? console.log(`Dog number ${dogNo + 1} is still a puppy 🐶`)
      : console.log(
          `Dog number ${dogNo + 1} is an adult, and is ${age} years old`
        );
  });
};
checkDogs(kateData);
checkDogs(juliaDataCopy);
*/
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);
*/
/*
calculate the dogs age in human years using the following formulas :if the dogs is <=2 years old , human age =2*dogsage.if the dogs is >2 years old,human age =16+dogsage+4.
2.exclude all ages that are less than 18 human years old 
3.calculate the average human age of all adult dogs 
4.run the fynction for both datasets [5,2,4,1,15,8,3]
const td = [5, 2, 4, 1, 15, 8, 3];
const dogsless = td.filter((age, i) => td[i] <= 2);
const puppyhum = dogsless.map((age) => 2 * age);

const dogshigh = td.filter((age, i) => td[i] > 2);
const adulthum = dogshigh.map((age) => 16 + age * 4);
console.log(puppyhum);
const doghumage =
  [...puppyhum, ...adulthum]
    .filter((age) => age > 18)
    .reduce(function (acc, ages, i, arr) {
      return acc + ages;
    }) / 5;
console.log(doghumage);

////////////////////////////////////////////////
*/
