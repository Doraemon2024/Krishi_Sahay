/**
 * HTTP Request Logger Middleware
 */
function requestLogger(req, res, next) {
  const start = Date.now();
  const timestamp = new Date().toLocaleTimeString('en-IN');

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const statusSymbol = status >= 400 ? '❌' : '✅';
    console.log(`[${timestamp}] ${statusSymbol} ${req.method} ${req.originalUrl} - ${status} (${duration}ms)`);
  });

  next();
}

module.exports = requestLogger;
