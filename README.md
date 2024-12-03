# Coin Management Bot for Google Chat

Culture Coin Bot is a Google Chat bot designed to manage coins for users in your workspace. It integrates seamlessly with Google Sheets to store and retrieve user data, allowing for robust coin management and easy leaderboard tracking.

## Features

- Leaderboard: View the top users with the highest coins.
- Add Coins: Assign coins to a specific user.
- List Coins: Check the total coins for a specific user.
- Supports both slash commands (e.g., /leaderboard) and plain text commands (e.g., leaderboard).

## Commands

### Slash Commands

- `/leaderboard`
  Description: Displays the top users with the highest coins.
  Example: `/leaderboard`
  Response:

```
Leaderboard:
1. user1@example.com: 120 coins
2. user2@example.com: 90 coins
```

- `/add`
  Description: Adds coins to a specific user.
  Usage: `/add <email> <coins>`
  Example: `/add user@example.com 50`
  Response:

```
Added 50 coins to user@example.com. Total: 150.
```

- `/list`
  Description: Displays the total coins for a specific user.
  Usage: `/list <email>`
  Example: `/list user@example.com`
  Response:

```
user@example.com has 150 coins.
```

### Plain Text Commands

- `leaderboard`
  Functions the same as /leaderboard.

- `add`
  Functions the same as /add.

- `list`
  Functions the same as /list.

## Project number

649597805824

## Project ID

culturecoinbot

## Developer Guide

1. Prerequisites

- Google Account: Ensure you have access to Google Workspace with permission to use Apps Script and Google Chat APIs.
- Clasp Installed: For local development, install Clasp (Command Line Apps Script):

```
npm install -g @google/clasp
```

2. Setting Up the Project

2.1. Clone the repository:

```
git clone git@github.com:mila-sini/culture-coin-bot.git
cd culture-coin-bot
```

2.2. Install dependencies:

```
npm install
```

2.3. Login to clasp

```
clasp login
```

3. Contributing

3.1. Build the project:

```
npm run build
```

3.2. Push the change:

```
npm run push
```

3.3. Open clasp:

```
npm run open
```

4. Collaborating with Other Developers

Use Clasp to synchronize changes between developers:

```
clasp pull
```
