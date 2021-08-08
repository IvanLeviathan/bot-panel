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
  {
    name: 'Профиль',
    url: urlPrefix + '/profile'
  }
];





const app = {
  API_ENDPOINT: 'https://discord.com/api/v8',
  REDIRECT_URI: dev ? 'http://localhost:3000' : 'https://IvanLeviathan.github.io/bot-panel/',
  DS_CLIENT: process.env.REACT_APP_DS_CLIENT,
  DS_SECRET: process.env.REACT_APP_DS_SECRET,
  DS_AUTH_URL: dev ? process.env.REACT_APP_DS_AUTH_DEV_URL : process.env.REACT_APP_DS_AUTH_URL,
  COOKIE_ACCESS: 'ds-auth-access',
  COOKIE_REFRESH: 'ds-auth-refresh'
}


export {app, links, urlPrefix};