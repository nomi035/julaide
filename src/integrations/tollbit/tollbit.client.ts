import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TollbitClient {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.baseUrl = this.config.get<string>('TOLLBIT_API_URL');
  }

  private headers() {
    return {
      TollbitKey: this.config.get<string>('TOLLBIT_API_KEY'),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  async generateToken(url: string) {
    const res = await firstValueFrom(
      this.http.post(
        `${this.baseUrl}/tokens/content`,
        {
          url,
          userAgent: 'julaide-bot',
          maxPriceMicros: 1000000,
          currency: 'USD',
          licenseType: 'ON_DEMAND_LICENSE',
        },
        { headers: this.headers() },
      ),
    );
    return res.data;
  }

  async createTracker(domain: string) {
    const res = await firstValueFrom(
      this.http.post(`${this.baseUrl}/trackers`, { domain }, { headers: this.headers() }),
    );
    return res.data;
  }

  async verifyTracker(trackerId: string) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/trackers/${trackerId}/verify`, { headers: this.headers() }),
    );
    return res.data;
  }

  async getAnalytics(trackerId: string, from: string, to: string) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/trackers/${trackerId}/analytics`, {
        headers: this.headers(),
        params: { from, to },
      }),
    );
    return res.data;
  }
}
