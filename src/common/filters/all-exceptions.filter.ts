import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const r = exception.getResponse();
      message = typeof r === 'string' ? r : (r as any).message ?? exception.message;
    } else if (exception?.code === 11000) {
      status = HttpStatus.CONFLICT;
      message = 'Resource already exists';
    } else if (exception?.name === 'CastError' || exception?.name === 'ValidationError') {
      status = HttpStatus.BAD_REQUEST;
      message = 'Invalid input';
    }

    if (status >= 500) this.logger.error(`${req.method} ${req.url}`, exception?.stack);
    else this.logger.warn(`${req.method} ${req.url} -> ${status}`);

    res.status(status).json({
      statusCode: status,
      message,
      error: HttpStatus[status] ?? 'Error',
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}