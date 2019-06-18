import HomePage from './pages/home.vue';
import Login from './pages/login.vue';
import Register from './pages/register.vue';
import AboutPage from './pages/about.vue';
import FormPage from './pages/form.vue';
import DynamicRoutePage from './pages/dynamic-route.vue';
import NotFoundPage from './pages/not-found.vue';
import Profile from './pages/profile.vue';
import EditProfile from './pages/profile-edit.vue';
import TabRoute from './pages/tabs-routable.vue';
import TabSwipe from './pages/tabs-swipeable.vue';
import Info from './pages/info.vue';
import InfoTrayek from './pages/info-trayek.vue';
import Themes from './pages/color-theme.vue';
import Settings from './pages/settings.vue';
import SettingsPass from './pages/settings-pass.vue';
import Notifications from './pages/notifications.vue';
import Report from './pages/report.vue';
import ReportList from './pages/report-list.vue';
import ReportDetail from './pages/report-detail.vue';
import ReportEdit from './pages/report-edit.vue';
import Comments from './pages/comments.vue';
import IzinList from './pages/izin-list.vue';
import IzinAdd from './pages/izin-add.vue';
import KritikSaran from './pages/kritik-saran.vue';
import Leaflet from './pages/leaflet.vue';
import Survey from './pages/survey.vue';
import AxiosTest from './pages/axios-test.vue';

import PanelLeftPage from './pages/panel-left.vue';
import PanelRightPage from './pages/panel-right.vue';

export default [
    {
    path: '/home/',
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
        component: Info,
      },
      {
        path: '/tab3/',
        id: 'tab3',
        component: Report,
      },
      {
        path: '/tab4/',
        id: 'tab4',
        component: Notifications,
      },
      {
        path: '/tab5/',
        id: 'tab5',
        component: Profile,
      },
],
  },
  {
    path: '/login/',
    component: Login,
  },
  {
    path: '/register/',
    component: Register,
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
    path: '/info/',
    component: Info,
  },
  {
    path: '/info-trayek/:id',
    component: InfoTrayek,
  },
  {
    path: '/themes/',
    component: Themes,
  },
  {
    path: '/settings/',
    component: Settings,
  },
  {
    path: '/settings-pass/',
    component: SettingsPass,
  },
  {
    path: '/profile-edit/:id',
    component: EditProfile,
  },
  {
    path: '/report/',
    component: Report,
  },
  {
    path: '/report-list/',
    component: ReportList,
  },
  {
    path: '/report-detail/:id',
    component: ReportDetail,
  },
  {
    path: '/report-edit/:id',
    component: ReportEdit,
  },
  {
    path: '/comments/:id',
    component: Comments,
  },
  {
    path: '/izin-list/',
    component: IzinList,
  },
  {
    path: '/izin-add/',
    component: IzinAdd,
  },
  {
    path: '/kritik-saran/',
    component: KritikSaran,
  },
  {
    path: '/survey/',
    component: Survey,
  },
  {
    path: '/axios-test/',
    component: AxiosTest,
  },
  {
    path: '/leaflet/',
    component: Leaflet,
  },
  {
    path: '/tab-swipe/',
    component: TabSwipe,
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
