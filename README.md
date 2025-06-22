# 💸 SplitEase - Simplifying Group Payments

### 🏆 Amazon Hackathon 2025 Submission

---

## 👥 Team Name
**Hacker_code**

---

## 🎯 Theme
**Smart Payment Optimization**

---

## 📘 Project Overview

**SplitEase** is a web-based tool that streamlines how people split and settle shared expenses. Whether you're dining with friends, planning a vacation, or managing shared bills as roommates — SplitEase ensures every participant contributes fairly and transparently.

We combine **Firebase Authentication** for secure login, a **Node.js + Express.js backend** to manage all data and logic, and **MongoDB** for persistent storage.

---

## 🚀 Key Features

### 🔐 Authentication
- Secure login via **Firebase Auth** (Email/Password or OAuth)
- Each user has a personalized profile

---

### 👥 Friend Management
- **Add/Search Friends**: Search users by email and send friend requests
- **Friend List**: View your connections and select them for expenses
- **Participant Selector**: Choose friends when creating a shared bill

---

### 💸 Group Expense Splitting

Split expenses across participants quickly using one of two modes:

#### ➗ Equal Split
- The total bill is evenly divided among all participants
- Example: ₹1,200 split between 4 users → ₹300 per person

#### 🎯 Custom Split
- Assign specific amounts to each participant manually
- Useful when contributions are unequal (e.g., someone orders more)

The system automatically calculates:
- **Who owes whom**
- **How much is owed**
- **Who has paid**

Balances are saved under each expense group.

---

### 🧾 Group Creation & Transaction Records
- Create a new **group** when splitting an expense
- Each group stores:
  - Title of expense
  - Participants
  - Split type (equal/custom)
  - Who paid and how much
- **Historical View**: Track past groups and contributions

---

## 🛠️ Tech Stack

| Layer         | Technology            |
|---------------|-----------------------|
| Frontend      | React.js, HTML/CSS    |
| Backend       | Node.js, Express.js   |
| Database      | MongoDB               |
| Auth          | Firebase Authentication |
| Styling       | Custom CSS (Black & White Theme) |

---

## 📸 Screenshots

> *(Insert screenshots or a video demo here: login page, friend list, expense split screen, group history view, etc.)*

---

## 📈 Future Improvements

- 🔁 **Debt Simplification** using Graph Algorithms
- 📲 **Mobile App** (React Native / Flutter)
- 📤 **PDF Export** for group expense reports
- 📊 **Spending Analytics**
- 💬 **In-App Group Chat**

---

## 🧑‍💻 Authors

- [Nishu Verma](#)
- [Reshma Maurya](#)

> _(Include GitHub or LinkedIn profile links if available)_

---

## 📄 License

This project is licensed under the **MIT License**.  
See the `LICENSE` file for more information.

---
