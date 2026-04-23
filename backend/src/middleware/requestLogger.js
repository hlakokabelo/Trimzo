import pinoHttp from "pino-http"
import { logger } from "../config/logger.js";

export const requestLogger = pinoHttp({
  logger,

  customLogLevel(res, err) {
    if (res.statusCode >= 500 || err) return "error"
    if (res.statusCode >= 400) return "warn"
    return "info"
  },

  serializers: {
    req(req) {
      return {
        method: req.method,
        path: req.url,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
      }
    }
  }
})