// utils/customError.ts
export class CustomError extends Error {
    statusCode: number;
    validationErrors?: Array<{ param: string; msg: string }>;
  
    constructor(message: string, statusCode: number, validationErrors?: Array<{ param: string; msg: string }>) {
      super(message);
      this.statusCode = statusCode;
      this.validationErrors = validationErrors;
  
      // Ensuring the name of this error is the same as the class name
      this.name = this.constructor.name;
  
      // Capturing stack trace, excluding constructor call from it
      Error.captureStackTrace(this, this.constructor);
    }
  }
  