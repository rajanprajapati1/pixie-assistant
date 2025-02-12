# Pixie - Chat Assistant

Welcome to **Pixie**, a simple command-line chat assistant that provides detailed product information from Pixiemart using LangChain, Groq, and MongoDB. Pixie is designed to help you quickly find product details such as pricing, stock, description, and available colors, all from a local or remote database.

## Features

- **Product Search**: Type queries about products, and Pixie will return relevant product details from the database.
- **Real-time Responses**: Pixie uses LangChain and Groq to process user queries and fetch data from MongoDB in real-time.
- **Chat History**: All user queries and assistant responses are logged in a text file for future reference.
- **Simple CLI**: Built with Node.js libraries like `readline` and `chalk`, Pixie offers an intuitive command-line interface.

## Setup and Installation

Follow these steps to set up Pixie:

### 1. Clone the repository

```bash
git clone <repository_url>
cd pixie-chat-assistant
```

### 2. Install dependencies

Ensure that Node.js is installed on your machine, then install the required dependencies:

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following:

```env
GROQ_API_KEY=<your_groq_api_key>
MONGO_URI=<your_mongo_database_uri>
```

### 4. Connect to the database

Make sure MongoDB is running (either locally or remotely), and ensure your `Product` model is set up with relevant fields (e.g., name, description, brand, price, stock, color).

### 5. Run the application

Start Pixie by running the following command:

```bash
node index.js
```

You can now interact with Pixie in the command line, asking queries about products.

### 6. End chat

To exit the assistant, simply type:

```bash
exit
```

## How It Works

1. **Product Search**: When a user submits a query, Pixie searches the MongoDB database for products that match the query (by name, description, or brand).
2. **Groq Integration**: LangChain's `ChatGroq` sends the query to Groq, which processes the data and retrieves the relevant product information.
3. **Template Response**: Pixie formats the retrieved product information into a user-friendly response with details such as name, description, price, stock, and available colors.
4. **Chat History**: Each query and response are logged to `chat_history.txt` for easy access.

## Example Queries

- **"What is the price of the iPhone 12?"**
- **"Tell me more about the Redmi Note 11 and its stock."**
- **"Is the Samsung Galaxy S21 available in blue?"**

Pixie will return product information, including:

- Product name
- Description
- Price
- Final price
- Stock availability
- Available colors
- Product image

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for more details.
