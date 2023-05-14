import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import yn from 'yn';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { MediaObjectModule } from './media-objects/media-objects.module';
import { RecaptchaModule } from './recaptcha/recaptcha.module';
import { CommentsModule } from './comments/comments.module';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment,@typescript-eslint/no-var-requires
const path = require('path');

@Module({
  imports: [
    // Config/DotENV module
    ConfigModule.forRoot({
      isGlobal: true, // you will not need to import ConfigModule in other modules once it's been loaded in the root module
      envFilePath: ['.env'],
    }),
    // TypeORM
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      // Entities
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      // Subscribers
      subscribers: [],
      // synchronize: false,
      synchronize: true,
    }),
    // GraphlQL Module
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: yn(process.env.GRAPHQL_DEBUG),
      playground: yn(process.env.GRAPHQL_PLAYGROUND),
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      cors: { credentials: true, origin: process.env.FE_BASE_URL },
      installSubscriptionHandlers: true,
    }),
    // App modules
    RecaptchaModule,
    AuthModule,
    UsersModule,
    MediaObjectModule,
    ArticleModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '../assets'),
      serveRoot: '/assets/',
      exclude: ['/api*'],
    }),
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
