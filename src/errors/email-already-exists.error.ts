export class EmailAreadyExistsError extends Error {
  statusCode = 400

  constructor(message = 'Email already exists', statusCode?: number) {
    super(message)
    this.statusCode = statusCode ?? this.statusCode
  }
}
