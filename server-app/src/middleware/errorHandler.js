//cathes all errors thrown

const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res
      .status(err.status)
      .json({ status: err.status, message: err.message, documentation: `/api` });
  } else {
    res.status(500).json({
      status: 500,
      message: err.message,
      documentation: `/api`,
    });
  }
};

export default errorHandler;
