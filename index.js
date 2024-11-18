const express = require("express");
const { errorHandler } = require("./middlewares/errorHandler");
const app = express();
const PORT = process.env.PORT || 6500;
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerSpec = YAML.load("./lib/swagger.yaml");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/api/v1/users", require("./routes/users.route"));

app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
