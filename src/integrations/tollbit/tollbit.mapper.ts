import { Injectable } from '@nestjs/common';

@Injectable()
export class TollbitMapper {
  mapAnalytics(raw: any, clientId: string) {
    if (!raw?.events) return [];
    return raw.events.map((event) => ({
      clientId,
      source: 'TOLLBIT',
      botName: event.bot_name,
      botType: event.bot_type,
      page: event.page,
      timestamp: new Date(event.timestamp),
    }));
  }
}
