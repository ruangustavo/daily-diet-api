export class ResourceNotFoundError extends Error {
  statusCode: number

  constructor(message = 'Resource not found') {
    super(message)
    this.statusCode = 404
  }
}
