import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { Session } from '../entities';

@EntityRepository(Session)
export class SessionRepository extends Repository<Session> {
  getByUserId(userId: string): Promise<Session[]> {
    return this.find({ userId });
  }

  getByUserIdAndClientId(userId: string, clientId: string): Promise<Session> {
    return this.findOne({ userId, deviceId: clientId });
  }

  deleteByUserIdAndClientId(
    userId: string,
    clientId: string,
  ): Promise<DeleteResult> {
    return this.delete({ userId, deviceId: clientId });
  }
}
