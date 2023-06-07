const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // Set the content type for the response
  res.setHeader("Content-Type", "text/html");

  // Check if the request is for the root path
  if (req.url === "/") {
    // Read the index.html file
    fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Internal Server Error");
      } else {
        // Send the index.html content as the response
        res.end(data);
      }
    });
  } else {
    // Return a 404 Not Found error for other paths
    res.statusCode = 404;
    res.end("Not Found");
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
