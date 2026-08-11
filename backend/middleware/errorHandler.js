const multer = require('multer');

/**
 * Express Error Handler Middleware
 */
function errorHandler(err, req, res, next) {
  console.error('❌ Server Error Caught:', err.message);

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large! Please upload a crop photo under 10MB.'
      });
    }
    return res.status(400).json({
      success: false,
      message: `File upload error: ${err.message}`
    });
  }

  if (err.message && err.message.includes('Only image files are allowed')) {
    return res.status(400).json({
      success: false,
      message: 'Invalid file type! Please upload a valid image file (.jpg, .jpeg, .png, .webp).'
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Something went wrong while checking your crop. Please try again.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
}

/**
 * 404 Route Not Found Handler
 */
function notFoundHandler(req, res, next) {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({
      success: false,
      message: `API Endpoint ${req.originalUrl} not found.`
    });
  }
  next();
}

module.exports = {
  errorHandler,
  notFoundHandler
};
