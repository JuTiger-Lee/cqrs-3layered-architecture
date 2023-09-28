import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RequestContextModule } from 'nestjs-request-context';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExceptionInterceptor } from '@common/application/interceptors/exception.interceptor';
import { UserModule } from './modules/user/user.module';
import { ContextInterceptor } from './common/application/context/ContextInterceptor';
import { entityList } from './common/db/entitys';

const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  },
];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // database name 필요시 사용
      // name: ''
      useFactory: () => {
        const host = process.env.DB_MYSQL_HOST as string;
        const port = process.env.DB_MYSQL_PORT as string;
        const username = process.env.DB_MYSQL_USER_NAME as string;
        const password = process.env.DB_MYSQL_PASSWORD as string;
        const database = process.env.DB_MYSQL_DATABASE_NAME as string;

        const fiveSeconds = 1000 * 5;

        return {
          // connection info
          type: 'mysql',
          host,
          username,
          password,
          database,
          port: Number(port),
          entities: entityList,

          // setting
          connectTimeout: fiveSeconds,
          synchronize: false,
          logging: false,
        };
      },
    }),
    RequestContextModule,
    EventEmitterModule.forRoot(),
    CqrsModule,
    // Modules
    UserModule,
  ],
  providers: [...interceptors],
})
export class AppModule {}
