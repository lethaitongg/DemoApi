import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ErrorResponse } from './shared/filters/HttpException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const errorsMap = {};

        for (const error of errors) {
          errorsMap[error.property] = Object.values(error.constraints)[0];
        }

        const ErrorResponse: ErrorResponse = {
          error: 'Bad Request',
          message: errorsMap,
          statusCode: 400,
        };

        return new BadRequestException(ErrorResponse);
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
