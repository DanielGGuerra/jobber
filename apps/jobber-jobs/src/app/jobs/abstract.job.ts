import { PulsarClient, serialize } from '@jobber/pulsar';
import { OnModuleDestroy } from '@nestjs/common';
import { Producer } from 'pulsar-client';

export abstract class AbstractJob<T> implements OnModuleDestroy {
  private producer: Producer;

  constructor(private readonly pulsarClient: PulsarClient) {}

  async execute(data: T, job: string) {
    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(job);
    }
    await this.producer.send({
      data: serialize(data),
    });
  }

  async onModuleDestroy() {
    await this.producer.close();
  }
}
