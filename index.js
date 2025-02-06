import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";
import connectDB from "./db.js";
import Product from "./models/Product.js";
import readline from "readline";
import chalk from "chalk";
import fs from "fs";

dotenv.config();
await connectDB();

const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const getProductInfo = async (query) => {
    const product = await Product.findOne({
      $or: [
        { name: new RegExp(query, "i") },
        { description: new RegExp(query, "i") },
        { brand: new RegExp(query, "i") },
      ],
    });
  
    if (!product) return "❌ No matching products found in Pixiemart.";
  
    let colorStock = product.color
      .map((c) => `${c.color}: ${c.stock} in stock`)
      .join(", ");
  
    return `📦 ${product.name}
  📝 Description: ${product.description}
  🏷 Brand: ${product.brand}
  💰 Price: ₹${product.price}
  🔖 Final Price: ₹${product.finalPrice}
  🔥 In Offer: ${product.isInOffer ? "Yes" : "No"}
  📦 Stock: ${product.stock}
  🎨 Available Colors: ${colorStock}
  🖼 Image: ${product.image}`;
  };
  

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant providing product details from Pixiemart."],
  ["human", "{input}"],
  ["assistant", "{productInfo}"],
]);

const askAssistant = async (userInput) => {
  const productInfo = await getProductInfo(userInput);

  const chain = prompt.pipe(model);
  
  const response = await chain.invoke({
    input: userInput,
    productInfo,
  });

  return response.content;
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: chalk.blue.bold("\n💬 You: "),
});

console.log(chalk.magenta.bold("🛍 Welcome to Pixiemart Assistant Chat!"));
console.log(chalk.green("💡 Type your queries about products. Type 'exit' to quit."));

const logChat = (userQuery, response) => {
  const logEntry = `\nUser: ${userQuery}\nAssistant: ${response}\n`;
  fs.appendFileSync("chat_history.txt", logEntry);
};

rl.prompt();
rl.on("line", async (userInput) => {
  if (userInput.toLowerCase() === "exit") {
    console.log(chalk.red("\n👋 Goodbye! Have a great day!\n"));
    rl.close();
    return;
  }

  console.log(chalk.cyan("⌛ Fetching product details..."));
  const response = await askAssistant(userInput);
  
  console.log(chalk.yellow.bold("\n🤖 Assistant: ") + response);
  
  logChat(userInput, response);
  rl.prompt();
});
