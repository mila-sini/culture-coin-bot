# Coin Management Bot for Google Chat

Culture Coin Bot is a Google Chat bot designed to manage coins for users in your workspace. It integrates seamlessly with Google Sheets to store and retrieve user data, allowing for robust point management and easy leaderboard tracking.

## Features

- Leaderboard: View the top users with the highest coins.
- Add Coins: Assign coins to a specific user.
- List Coins: Check the total coins for a specific user.
- Supports both slash commands (e.g., /leaderboard) and plain text commands (e.g., leaderboard).

## Commands

### Slash Commands

- `/leaderboard`
  Description: Displays the top users with the highest points.
  Example: `/leaderboard`
  Response:

```
Leaderboard:
1. user1@example.com: 120 points
2. user2@example.com: 90 points
```

- `/add`
  Description: Adds points to a specific user.
  Usage: `/add <email> <points>`
  Example: `/add user@example.com 50`
  Response:

```
Added 50 points to user@example.com. Total: 150.
```

- `/list`
  Description: Displays the total points for a specific user.
  Usage: `/list <email>`
  Example: `/list user@example.com`
  Response:

```
user@example.com has 150 points.
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
