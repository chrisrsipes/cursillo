var constants = {
  'saltRounds': 10,
  'http': {
    'SUCCESS': {
      status: 200,
      message: 'OK.'
    },
    'CREATED': {
      status: 201,
      message: 'Object created.'
    },
    'NO_CONTENT': {
      status: 204,
      message: 'No content.'
    },
    'BAD_REQUEST': {
      status: 400,
      message: 'Bad Request.'
    },
    'NOT_AUTHORIZED': {
      status: 401,
      message: 'Unauthorized request.'
    },
    'FORBIDDEN': {
      status: 403,
      message: 'Forbidden request.'
    },
    'NOT_FOUND': {
      status: 404,
      message: 'Resource not found.'
    },
    'NOT_ALLOWED': {
      status: 405,
      message: 'Method not allowed.'
    },
    'TEAPOT': {
      status: 418,
      message: 'Im a teapot.'
    },
    'INTERNAL_ERROR': {
      status: 500,
      message: 'Internal server error..'
    }
  }
};

module.exports = constants;
