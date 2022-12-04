class ApiError extends Error {
  status;
  errors;

  constructor(status: number, message: string, errors: any = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  };

  static UnauthorizedError() {
    console.log("Unauthorized!!!!============++++")
    return new ApiError(401, 'Signin failed');
  };
  static GoogleauthorizedError() {
    return new ApiError(401, 'Google authorization is failed');
  };

  static ForbiddenError() {
    return new ApiError(403, 'Unavailable entity');
  }
  static NotFound() {
    return new ApiError(404, 'Page not found');
  }

  static BadRequestError(message: string, errors: any = []) {
    return new ApiError(400, message, errors);
  };

  static UnprocessableEntity(message: string, errors: any = []) {
    return new ApiError(422, message, errors);
  };

  static ServerError() {
    return new ApiError(500, "Something's gone wrong on our side")
  };
};

export default ApiError;