import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Consumer, Message, Producer } from 'pulsar-client';

@Injectable()
export class PulsarClient implements OnModuleDestroy {
  private readonly client = new Client({
    serviceUrl: this.configService.getOrThrow<string>('PULSAR_SERVICE_URL'),
  });
  private producers: Producer[] = [];
  private consumers: Consumer[] = [];

  constructor(private readonly configService: ConfigService) {}

  async onModuleDestroy() {
    for (const producer of this.producers) {
      await producer.close();
    }
    await this.client.close();
  }

  async createProducer(topic: string) {
    const producer = await this.client.createProducer({
      topic,
    });
    this.producers.push(producer);
    return producer;
  }

  async createConsumer(topic: string, listener: (message: Message) => void) {
    const consumer = await this.client.subscribe({
      topic,
      subscription: 'jobber',
      listener,
    });
    this.consumers.push(consumer);
    return consumer;
  }
}
