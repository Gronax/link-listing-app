import App from '../containers/App';
import Add from '../containers/Add';

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
];

export default routeList;
