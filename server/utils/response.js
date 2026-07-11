const responseSuccess = (data = null, message = 'Success') => {
  return {
    success: true,
    message,
    data
  };
};

const responseError = (message = 'Error', errors = null, statusCode = 500) => {
  return {
    success: false,
    message,
    errors
  };
};

module.exports = {
  responseSuccess,
  responseError
};
