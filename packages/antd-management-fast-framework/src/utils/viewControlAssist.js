import {
  viewLoadingFlag,
  viewProcessingFlag,
  viewRefreshingFlag,
  viewReloadingFlag,
  viewSearchingFlag,
} from '../customConfig';

import { switchControlAssist } from './switchControlAssist';

/**
 * list view control assist
 */
export const viewControlAssist = {
  startLoading() {
    switchControlAssist.open(viewLoadingFlag);
  },
  stopLoading() {
    switchControlAssist.close(viewLoadingFlag);
  },
  startSearching() {
    switchControlAssist.openMulti([viewSearchingFlag, viewLoadingFlag]);
  },
  stopSearching() {
    switchControlAssist.closeMulti([viewSearchingFlag, viewLoadingFlag]);
  },
  startRefreshing() {
    switchControlAssist.openMulti([viewLoadingFlag, viewRefreshingFlag]);
  },
  stopRefreshing() {
    switchControlAssist.closeMulti([viewLoadingFlag, viewRefreshingFlag]);
  },
  startReloading() {
    switchControlAssist.openMulti([viewLoadingFlag, viewReloadingFlag]);
  },
  stopReloading() {
    switchControlAssist.closeMulti([viewLoadingFlag, viewReloadingFlag]);
  },
  startProcessing() {
    switchControlAssist.open(viewProcessingFlag);
  },
  stopProcessing() {
    switchControlAssist.close(viewProcessingFlag);
  },
};
