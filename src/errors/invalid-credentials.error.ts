export class InvalidCredentialsError extends Error {
  statusCode = 400

  constructor(message = 'Invalid credentials', statusCode?: number) {
    super(message)
    this.statusCode = statusCode ?? this.statusCode
  }
}
