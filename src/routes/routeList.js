import App from '../containers/App';
import Add from '../containers/Add';
import SubmitNewLink from '../containers/SubmitNewLink';

const routeList = [
  {
    path: '/',
    component: App,
    exact: true,
  },
  {
    path: '/add',
    component: Add,
    exact: false,
  },
  // {
  //   path: '/',
  //   component: SubmitNewLink,
  //   exact: false,
  // },
];

export default routeList;
