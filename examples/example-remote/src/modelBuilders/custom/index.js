import {
  buildModel as buildGovernmentAffairManagerModel,
  governmentAffairManagerTypeCollection,
} from './governmentAffairManager';
import {
  buildModel as buildGovernmentAffairManagerRoleModel,
  governmentAffairManagerRoleTypeCollection,
} from './governmentAffairManagerRole';
import {
  buildModel as buildUserYonYouCorrelationModel,
  userYonYouCorrelationTypeCollection,
} from './userYonYouCorrelation';
import {
  buildModel as buildYonYouImportHistoryModel,
  yonYouImportHistoryTypeCollection,
} from './yonYouImportHistory';
import {
  buildModel as buildYonYouPushMessageModel,
  yonYouPushMessageTypeCollection,
} from './yonYouPushMessage';

export const modelTypeCollection = {
  governmentAffairManagerTypeCollection,
  governmentAffairManagerRoleTypeCollection,
  userYonYouCorrelationTypeCollection,
  yonYouImportHistoryTypeCollection,
  yonYouPushMessageTypeCollection,
};

export function listModelBuilder() {
  const list = [];

  list.push(
    buildGovernmentAffairManagerModel,
    buildGovernmentAffairManagerRoleModel,
    buildUserYonYouCorrelationModel,
    buildYonYouImportHistoryModel,
    buildYonYouPushMessageModel,
  );

  return list;
}
