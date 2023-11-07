import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';
import All from '../views/pages/all';

const routes = {
  '/': All, // default page
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;
