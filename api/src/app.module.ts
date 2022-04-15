import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PizzaModule } from './pizza/pizza.module';

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
      }),
    ConfigModule,
    PizzaModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
