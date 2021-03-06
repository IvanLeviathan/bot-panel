require('dotenv').config();

const dev = false;

const urlPrefix = dev ? '' : "";

const links = [
  {
    name: 'Главная',
    url: '/'
  },
  {
    name: 'Настройки',
    url: '/settings'
  },
  {
    name: 'Список',
    url: '/users',
    exact: false
  },
  {
    name: 'Статистика',
    url: '/stats'
  },
  {
    name: 'Логи',
    url: '/logs'
  }
];





const app = {
  // REDIRECT_URI: dev ? 'http://localhost:3000' : 'http://ivanleviathan.github.io/bot-panel/#/',
  REDIRECT_URI: dev ? 'http://localhost:3000' : 'https://heshjunior.herokuapp.com/',
  DS_AUTH_URL: dev ? process.env.REACT_APP_DS_AUTH_DEV_URL : process.env.REACT_APP_DS_AUTH_URL2,
  COOKIE_ACCESS: 'ds-auth-access',
  COOKIE_REFRESH: 'ds-auth-refresh',
  BOT_API_URL: dev ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL
}


export {app, links, urlPrefix};