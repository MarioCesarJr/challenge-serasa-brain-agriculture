import { Injectable } from '@nestjs/common';
import { Producer } from '../../../../domain/entities/producer';
import { ProducerRepository } from '../../../../domain/repositories/producer-repository';
import { CpfCnpjIdentify } from '../../../../domain/validators/cpf-cnpj-identify';
import { CnpjValidator } from '../../../../domain/validators/cnpj-validator';
import { CpfValidator } from '../../../../domain/validators/cpf-validator';

@Injectable()
export class UpdateProducerUseCase {
  constructor(
    private producerRepository: ProducerRepository,
    private cpfCnpjIdentify: CpfCnpjIdentify,
    private cnpjValidator: CnpjValidator,
    private cpfValidator: CpfValidator,
  ) {}

  async execute(id: string, cpfCnpj: string, name: string): Promise<Producer> {
    const producer = await this.producerRepository.findById(id);
    if (!producer) {
      throw new Error('Produtor não econtrado');
    }

    const documentType = this.cpfCnpjIdentify.check(cpfCnpj);

    if (documentType === 'CNPJ' && !this.cnpjValidator.isValid(cpfCnpj)) {
      throw new Error('CNPJ inválido');
    }

    if (documentType === 'CPF' && !this.cpfValidator.isValid(cpfCnpj)) {
      throw new Error('CPF inválido');
    }

    producer.id = id;
    producer.cpfCnpj = cpfCnpj;
    producer.name = name;

    return this.producerRepository.update(producer);
  }
}
