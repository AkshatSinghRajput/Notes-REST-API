const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const globalEmitter = require("./emitter/globalEmitter");

const connectToMongo = require("./middlewares/dbConnect");
const auth = require("./middlewares/auth.middleware");
const loginAccountLimiter = require("./middlewares/rateLimiter.middleware");
const logger = require("./middlewares/Logger.middleware");
require("dotenv").config();

//Swagger API Options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Note API",
      version: "1.0.0",
      description: "A simple Express Note API",
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: {
      bearerAuth: [],
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

//Instantiation
const specs = swaggerJsDoc(options);
const app = express();

//Middlewares
app.use(express.json());

//Custom Logger middleware
app.use(logger);

// Rate Limiter
app.use(loginAccountLimiter);

// Route-s
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/notes", auth, require("./routes/note.routes"));
app.use("/", require("./routes/user.routes"));

//Events
//User Events
globalEmitter.on("login", (userId) => {
  console.log(`User LoggedIn! id: ${userId}`);
});
globalEmitter.on("Signup", (userId) => {
  console.log(`New user SignedUp! id: ${userId}`);
});

//Notes Events
globalEmitter.on("createNote", (noteId) => {
  console.log(`Note Created having id: ${noteId}`);
});
globalEmitter.on("updateNote", (noteId) => {
  console.log(`Note Updated having id: ${noteId}`);
});
globalEmitter.on("deleteNote", (noteId) => {
  console.log(`Note Deleted having id: ${noteId}`);
});

app.listen(process.env["PORT"], () => {
  connectToMongo().then(() => {
    console.log("Port is Running");
  });
});
