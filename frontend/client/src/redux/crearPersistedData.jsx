

import { store, persistor } from './appStore';
import { reset } from './tokenSlice';

export const clearPersistedData = () => {
  store.dispatch(reset());
  
  persistor.purge();
};

