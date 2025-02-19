import { PulsarClient } from '@jobber/pulsar';
import { Job } from '../../decorators/job.decorator';
import { AbstractJob } from '../abstract.job';
import { FibonacciData } from './fibonacci-data.interface';

@Job({
  name: 'Fibonacci',
  description: 'Generate a Fibonacci sequence and to it in the database',
})
export class FibonacciJob extends AbstractJob<FibonacciData> {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
