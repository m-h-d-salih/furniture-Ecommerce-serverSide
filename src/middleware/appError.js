export default class AppError extends Error {
    constructor(message, statusCode = 500, data = {}) {
      super(message);
      this._status = statusCode;
      this._data = data;
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  
    get statusCode() {
      return this._status;
    }
  
    set statusCode(code) {
      this._status = code;
    }
  
    get data() {
      return this._data;
    }
  
    set data(errorData) {
      this._data = errorData;
    }
  }
  
  