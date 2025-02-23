import { Module } from '@nestjs/common';
import { CreateProducerController } from './http/controllers/create-producer.controller';
import { DatabaseModule } from './database/database.module';
import { CreateProducerUseCase } from 'src/application/use-cases/producer/create/create-producer.use-case';
import { UpdateProducerUseCase } from 'src/application/use-cases/producer/update/update-producer.use-case';
import { DeleteProducerUseCase } from 'src/application/use-cases/producer/delete/delete-producer.use-case';
import { UpdateProducerController } from './http/controllers/update-producer.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateProducerController, UpdateProducerController],
  providers: [
    CreateProducerUseCase,
    UpdateProducerUseCase,
    DeleteProducerUseCase,
  ],
})
export class AppModule {}
