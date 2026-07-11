const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: '유효성 검사 실패',
      errors: errors.array()
    });
  }
  next();
};

module.exports = validateRequest;
