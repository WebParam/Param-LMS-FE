import { Middleware } from 'redux';
import { resetAnalticState } from './courseAnalyticSlice';
import { store } from './store';

const pageReloadMiddleware: Middleware = () => {
  if (typeof window !== 'undefined') {
    const handleBeforeUnload = () => {
      store.dispatch(resetAnalticState());
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
  }
  return (next) => (action) => next(action);
};

export default pageReloadMiddleware;
