import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersController } from './controllers/session.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { AuthMiddleware } from './auth/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './controllers/profile.controller';
import { CardController } from './controllers/card.controller';

@Module({
  imports: [AuthModule, UsersModule, TypeOrmModule.forRoot()],
  controllers: [UsersController, ProfileController, CardController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ProfileController);
    consumer.apply(AuthMiddleware).forRoutes(CardController);
  }
}
