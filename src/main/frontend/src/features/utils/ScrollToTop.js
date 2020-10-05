import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ history }) {
  useEffect(() => {
    const historyListener = history.listen(() => window.scrollTo(0, 0));
    return () => historyListener();
    }, []);

  return null;
}

export default withRouter(ScrollToTop);