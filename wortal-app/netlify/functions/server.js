const express = require("express");
const app = express();
const db = require("./db.json");

// Endpoint 1: Homepage - Discussion Posts
app.get("/homepage/discussion-posts", (req, res) => {
  // Read data from JSON file and send it as response
  res.json(db.homepage["discussion-posts"]);
});

// Endpoint 2: Homepage - Premiere Albums
app.get("/homepage/premiere-albums", (req, res) => {
  res.json(db.homepage["premiere-albums"]);
});

// Endpoint 3: Homepage - Events
app.get("/homepage/events", (req, res) => {
  res.json(db.homepage.events);
});

// Endpoint 4: Homepage - Side Recommendations
app.get("/homepage/side-recommendations", (req, res) => {
  res.json(db.homepage["side-recommendations"]);
});

// Export the handler function
exports.handler = (event, context, callback) => {
  // Set headers to enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Check if it's a preflight request
  if (event.httpMethod === "OPTIONS") {
    // Respond to preflight requests
    callback(null, {
      statusCode: 204, // No content
      headers,
      body: "",
    });
    return;
  }

  // Process the request
  app(event, context, (error, response) => {
    // Handle errors
    if (error) {
      callback(null, {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Internal Server Error" }),
      });
      return;
    }

    // Respond with the Express response
    callback(null, {
      statusCode: response.statusCode || 200,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: response.body,
    });
  });
};
