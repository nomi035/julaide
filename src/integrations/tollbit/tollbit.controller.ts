import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { TollbitService } from './tollbit.service';

@ApiTags('tollbit')
@Controller('tollbit')
export class TollbitController {
    constructor(private readonly tollbitService: TollbitService) { }

    @Post('tokens')
    @ApiOperation({ summary: 'Generate a content token' })
    @ApiBody({ schema: { type: 'object', properties: { url: { type: 'string', example: 'https://example.com' } } } })
    async generateToken(@Body('url') url: string) {
        return this.tollbitService.generateToken(url);
    }

    @Post('trackers')
    @ApiOperation({ summary: 'Create a new tracker for a domain' })
    @ApiBody({ schema: { type: 'object', properties: { domain: { type: 'string', example: 'example.com' } } } })
    async createTracker(@Body('domain') domain: string) {
        return this.tollbitService.createTrackerForDomain(domain);
    }

    @Get('analytics/:trackerId')
    @ApiOperation({ summary: 'Get analytics for a tracker (last 24h)' })
    @ApiQuery({ name: 'clientId', required: true, type: 'string', example: 'client_123' })
    async getAnalytics(
        @Param('trackerId') trackerId: string,
        @Query('clientId') clientId: string,
    ) {
        return this.tollbitService.syncAnalytics(trackerId, clientId);
    }
}
