const { createProxyMiddleware } = require("http-proxy-middleware");

class Gateway {
  constructor() {
    this._HOSTNAME_LOCALHOST = "http://localhost:6000";
    this._HOSTNAME_PRODUCTION = "http://production.host";

    this._isLocalhost = Boolean(
      typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          // [::1] is the IPv6 localhost address.
          window.location.hostname === "[::1]" ||
          // 127.0.0.0/8 are considered localhost for IPv4.
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          ))
    );

    this.envType =
      process.env.NODE_ENV !== "production" &&
      this._isLocalhost &&
      !process.env.REACT_APP_ENV
        ? "production"
        : process.env.REACT_APP_ENV;
  }

  getBaseUrl() {
    switch (this.envType) {
      case "local":
        return this._HOSTNAME_LOCALHOST;
      // можно прописать также любые имена окружений под себя
      // case "":
      //  return this._HOSTNAME_MAIN;
      default:
        return this._HOSTNAME_PRODUCTION;
    }
  }
}

module.exports = function (app) {
  const gateway = new Gateway();

  app.use(
    "/api",
    createProxyMiddleware({
      target: gateway.getBaseUrl(),
      changeOrigin: true,
      // pathRewrite: { "^/api": "/api" },
    })
  );
};
