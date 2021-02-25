import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { Session } from '../entities';

@EntityRepository(Session)
export class SessionRepository extends Repository<Session> {
  getByUserId(userId: string): Promise<Session[]> {
    return this.find({ userId });
  }

  getByUserIdAndDeviceId(userId: string, deviceId: string): Promise<Session> {
    return this.findOne({ userId, deviceId: deviceId });
  }

  deleteByUserIdAndDeviceId(
    userId: string,
    deviceId: string,
  ): Promise<DeleteResult> {
    return this.delete({ userId, deviceId: deviceId });
  }
}
