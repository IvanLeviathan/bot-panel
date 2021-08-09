require('dotenv').config();

const dev = false;

const urlPrefix = dev ? '' : "";

const links = [
  {
    name: 'Главная',
    url: urlPrefix + '/'
  },
  {
    name: 'Настройки',
    url: urlPrefix + '/settings'
  },
  // {
  //   name: 'Статистика',
  //   url: '/stats'
  // },
  // {
  //   name: 'Профиль',
  //   url: urlPrefix + '/profile'
  // }
];





const app = {
  REDIRECT_URI: dev ? 'http://localhost:3000' : 'http://ivanleviathan.github.io/bot-panel/#/',
  DS_AUTH_URL: dev ? process.env.REACT_APP_DS_AUTH_DEV_URL : process.env.REACT_APP_DS_AUTH_URL,
  COOKIE_ACCESS: 'ds-auth-access',
  COOKIE_REFRESH: 'ds-auth-refresh',
  BOT_API_URL: dev ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL
}


export {app, links, urlPrefix};