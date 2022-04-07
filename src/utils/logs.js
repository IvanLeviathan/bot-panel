import { app } from "../_config";

const header = new Headers();
header.append('Content-Type', 'application/json');

export const getServerLogs = async (authToken, serverId) => {
  const params = new URLSearchParams();
  params.append('auth_token', authToken);
  params.append('action', 'GET_SERVER_LOGS');
  params.append('server_id', serverId);

  const res = await fetch(app.BOT_API_URL + "?" + params.toString(), {
    method: 'GET',
    headers: header
  })
  .then(res => res.json())
  .then(res => {
    return res.data
  })
  .catch(e => {
    console.log(e);
    return []
  })
  return res
}