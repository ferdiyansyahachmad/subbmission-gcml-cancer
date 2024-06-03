class InputError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = "InputError";
    this.statusCode = parseInt(statusCode, 10); // pastikan statusCode adalah integer
  }
}

module.exports = InputError;
