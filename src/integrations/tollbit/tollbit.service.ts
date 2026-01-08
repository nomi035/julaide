import { Injectable, Logger } from '@nestjs/common';
import { TollbitClient } from './tollbit.client';
import { TollbitMapper } from './tollbit.mapper';

@Injectable()
export class TollbitService {
  private readonly logger = new Logger(TollbitService.name);

  constructor(
    private readonly client: TollbitClient,
    private readonly mapper: TollbitMapper,
  ) { }

  async generateToken(url: string) {
    return this.client.generateToken(url);
  }

  async createTrackerForDomain(domain: string) {
    const tracker = await this.client.createTracker(domain);
    return {
      trackerId: tracker.id,
      dnsRecord: tracker.dns_record,
    };
  }

  async syncAnalytics(trackerId: string, clientId: string) {
    const to = new Date().toISOString();
    const from = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const raw = await this.client.getAnalytics(trackerId, from, to);
    return this.mapper.mapAnalytics(raw, clientId);
  }
}
