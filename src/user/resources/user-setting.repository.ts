import { EntityRepository, In, Repository } from 'typeorm';
import { UserSetting } from '../entities';

@EntityRepository(UserSetting)
export class UserSettingRepository extends Repository<UserSetting> {
  /**
   * Getting user setting by key
   *
   * @param userId string
   * @param keys string
   */
  getSetting(userId: string, keys?: string | string[]): Promise<UserSetting> {
    const options: any = { userId };
    if (keys) {
      if (Array.isArray(keys) && keys.length > 0) {
        options.key = In(keys);
      } else {
        options.key = keys;
      }
    }
    return this.findOne({ where: options });
  }

  saveSetting(userId: string, key: string, value: string) {
    const userSettingEntity = new UserSetting({ userId, key, value });
    return this.save(userSettingEntity);
  }
}
