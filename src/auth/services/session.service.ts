import { Injectable, Logger } from '@nestjs/common';
import { Session } from '../entities';
import { SessionRepository } from '../resources';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(private readonly sessionResource: SessionRepository) {}

  getListSessions(userId) {
    return this.sessionResource.getByUserId(userId);
  }

  async getSession(userId, deviceId): Promise<Session> {
    return await this.sessionResource.getByUserIdAndDeviceId(userId, deviceId);
  }

  async saveSession(data: Partial<Session>): Promise<Session> {
    const session = this.sessionResource.create(data);
    try {
      return await this.sessionResource.save(session);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async removeSession(userId, deviceId): Promise<void> {
    try {
      await this.sessionResource.deleteByUserIdAndDeviceId(userId, deviceId);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
