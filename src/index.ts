const SHEET_ID = "1E4LMHU9SywpuvWESsMlRQd6HvflC_ETp_NK-uVjTnaM";
const SHEET_NAME = "Sheet1";
const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

// Handle incoming POST requests
function doPost(e: GoogleAppsScript.Events.DoPost): GoogleAppsScript.Content.TextOutput {
    Logger.log(JSON.stringify(e));
    
    try {
      const data = JSON.parse(e?.postData?.contents); 
      const message = data.message?.text || ""; 
      const slashCommand = data.message?.slashCommand?.commandId || ""; 
  
      Logger.log("Received message: " + message);
      Logger.log("Received slash command: " + slashCommand);
  
      let response;
  
      // Check if it's a slash command
      if (slashCommand) {
        switch (slashCommand) {
          case "/leaderboard":
            response = handleLeaderboard();
            break;
          case "/add":
            response = handleAddCommand(message);
            break;
          case "/list":
            response = handleListCommand(message);
            break;
          default:
            response = { text: "Unknown slash command. Try `/leaderboard`, `/add <email> <coins>`, or `/list <email>`." };
        }
      } else {
        // Handle plain text commands
        const command = message.trim().toLowerCase().split(" ")[0]; 
        switch (command) {
          case "leaderboard":
            response = handleLeaderboard();
            break;
          case "add":
            response = handleAddCommand(message);
            break;
          case "list":
            response = handleListCommand(message);
            break;
          default:
            response = { text: "Unknown command. Try `leaderboard`, `add <email> <coins>`, or `list <email>`." };
        }
      }
  
      Logger.log("Response: " + JSON.stringify(response)); 
  
      return ContentService.createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
      Logger.log("Error in doPost: " + error); 
      return ContentService.createTextOutput(JSON.stringify({ text: "Error processing request." }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }  

function doGet(e: GoogleAppsScript.Events.DoGet): GoogleAppsScript.Content.TextOutput {
  Logger.log("Received GET request");
  return ContentService.createTextOutput("CultureCoinBot is running! 🚀 ");
}

function handleAddCommand(message: string): { text: string } {
    const args = message.split(" ");
    if (args.length < 3) {
      return { text: "Usage: add <email> <coins>" };
    }
  
    const email = args[1];
    const coins = parseInt(args[2], 10);
  
    if (isNaN(coins)) {
      return { text: "The coins value must be a valid number." };
    }
  
    return addCoins(email, coins);
  }

// Add coins to a user
function addCoins(email: string, coins: number): { text: string } {
    const data = sheet!.getDataRange().getValues();
  
    for (let i = 1; i < data.length; i++) {
    // User found; add the requested coins
      if (data[i][0] === email) {
        const newCoins = (data[i][1] as number) + coins;
        sheet!.getRange(i + 1, 2).setValue(newCoins);
        return { text: `Added ${coins} coins to ${email}. Total: ${newCoins}.` };
      }
    }
  
    // User not found; assign 0 coins and add the requested coins
    sheet!.appendRow([email, coins]);
    return { text: `Added ${coins} coins to ${email}. Total: ${coins}.` };
  }

  function handleListCommand(message: string): { text: string } {
    const args = message.split(" ");
    if (args.length < 2) {
      return { text: "Usage: list <email>" };
    }
  
    const email = args[1];
    return listCoins(email);
  }

// List coins for a specific user
function listCoins(email: string): { text: string } {
  const data = sheet!.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === email) {
      return { text: `${email} has ${data[i][1]} coins.` };
    }
  }
  return { text: `${email} has no coins assigned.` };
}

// List the top users
function handleLeaderboard(): { text: string } {
  const data = sheet!.getDataRange().getValues();
  // Remove header row
  data.shift(); 

  if (data.length === 0) {
    return { text: "Leaderboard is empty!" };
  }

  // Sort top 10 users by coins DESC
  data.sort((a, b) => (b[1] as number) - (a[1] as number)); 
  let leaderboard = "Leaderboard:\n";
  for (let i = 0; i < Math.min(data.length, 10); i++) {
    leaderboard += `${i + 1}. ${data[i][0]}: ${data[i][1]} coins\n`;
  }
  return { text: leaderboard.trim() };
}
