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

  async getSession(userId, clientId): Promise<Session> {
    return await this.sessionResource.getByUserIdAndClientId(userId, clientId);
  }

  async saveSession(data: Partial<Session>): Promise<Session> {
    const session = this.sessionResource.create(data);
    try {
      return await this.sessionResource.save(session);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async removeSession(userId, clientId): Promise<void> {
    try {
      await this.sessionResource.deleteByUserIdAndClientId(userId, clientId);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
