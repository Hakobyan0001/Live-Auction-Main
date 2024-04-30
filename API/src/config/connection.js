const production = {
  database: process.env.DB_NAME || "products_prod",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  host: process.env.DB_HOST || "localhost",
  dialect: "mysql",
};

const development = {
  database: "items_dev",
  username: "root",
  password: "",
  host: "localhost",
  dialect: "mysql",
};

const testing = {
  database: "items_test",
  username: "root",
  password: "",
  host: "localhost",
  dialect: "mysql",
};

module.exports = {
  development,
  testing,
  production,
};
