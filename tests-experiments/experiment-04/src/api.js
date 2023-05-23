const http = require("http");
const PORT = 3000;
const DEFAULT_USER = { username: "ederson", password: "password" };

const routes = {
  "/contact:get": (req, res) => {
    res.write("contact us page");
    return res.end();
  },
  "/login:post": async (req, res) => {
    for await (const data of req) {
      const user = JSON.parse(data);
      if (
        user.username !== DEFAULT_USER.username ||
        user.password !== DEFAULT_USER.password
      ) {
        res.writeHead(401);
        res.write("Logging Failed!");
        return res.end();
      }
    }
    res.write("Logging has succeeded!");
    return res.end();
  },
  default: (req, res) => {
    res.write("Hello!");
    return res.end();
  },
};

const handler = function (req, res) {
  const { url, method } = req;
  const routeKey = `${url}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;
  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  return chosen(req, res);
};

const app = http
  .createServer(handler)
  .listen(PORT, () => console.log(`app running on port ${PORT}`));

module.exports = app;
