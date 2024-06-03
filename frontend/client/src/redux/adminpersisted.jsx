import { store, persistor } from './appStore';
import { resetAdmin } from './tokenSlice';

export const clearAdminPersistedData = () => {
  store.dispatch(resetAdmin());
  persistor.persist(); 
};