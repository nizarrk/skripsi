import HomePage from './pages/home.vue';
import AboutPage from './pages/about.vue';
import FormPage from './pages/form.vue';
import DynamicRoutePage from './pages/dynamic-route.vue';
import NotFoundPage from './pages/not-found.vue';
import Profile from './pages/profile.vue';
import TabRoute from './pages/tabs-routable.vue';

import PanelLeftPage from './pages/panel-left.vue';
import PanelRightPage from './pages/panel-right.vue';

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/panel-left/',
    component: PanelLeftPage,
  },
  {
    path: '/panel-right/',
    component: PanelRightPage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/profile/',
    component: Profile,
  },
  {
    path: '/tabs-routable/',
    component: TabRoute,
    tabs: [
      {
        path: '/',
        id: 'tab1',
        component: HomePage,
      },
      {
        path: '/tab2/',
        id: 'tab2',
        component: Profile,
      },
      {
        path: '/tab3/',
        id: 'tab3',
        component: AboutPage,
      },
],
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
