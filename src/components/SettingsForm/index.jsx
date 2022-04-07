import React from 'react'
import Input from '../Input'
import Select from '../Select';
import Textarea from '../Textarea';
import { ChromePicker } from 'react-color';
import "./style.css";
import Button from '../Button';
import NoPermissions from '../NoPermissions';

export default function SettingsForm(props) {
  // console.log(props.curGuild.permissions);
  // console.log(props.adminPermissions);
  if(!props.isAdmin){
    return <NoPermissions curGuild={props.curGuild}/>;
  }else{
    return (
      <div className="card">
      <div className="card-body">
      <form className="settings-form" onSubmit={props.saveSettingsForm}>
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <label htmlFor="bot-name">Имя бота</label>
              <Input
                value={props.botName}
                onChange={props.setBotName}
                required={true}
                placeholder="Имя бота"
                id='bot-name'
              />
            </div>
            <div className="form-group">
              <label htmlFor="bot-pic">Изображение</label>
              <Input
                value={props.botPic}
                onChange={props.setBotPic}
                required={true}
                placeholder="Изображение"
                id='bot-pic'
              />
              <img className="bot-img my-3" src={props.botPic} alt={props.botName}/>
              <small className="form-text text-muted">Вставляем ссылку, так как хранить изображения негде.</small>
            </div>
            <div className="form-group">
              <label htmlFor="bot-channel">Канал для рапортов</label>
              <Input
                value={props.botChannelId}
                onChange={props.setBotChannelId}
                required={true}
                classes="mb-2"
                placeholder="Канал для рапортов"
                id='bot-channel'
              />
              <Select
                value={props.botChannelId}
                onChange={props.setBotChannelId}
                id='bot-channel'
                options={props.channels}
              />
              <small className="form-text text-muted">Каналы могут обновляться с задержкой. Если нужных каналов нет, используйте обычное поле, которое принимает в себя ID канала.</small>
            </div>
            <div className="form-group">
              <label htmlFor="bot-legions-channel">Канал для общения</label>
              <Input
                value={props.botChannelLegionsId}
                onChange={props.setBotChannelLegionsId}
                required={true}
                classes="mb-2"
                placeholder="Канал для общения"
                id='bot-legions-channel'
              />
              <Select
                value={props.botChannelLegionsId}
                onChange={props.setBotChannelLegionsId}
                id='bot-legions-channel'
                options={props.channels}
              />
              <small className="form-text text-muted">Каналы могут обновляться с задержкой. Если нужных каналов нет, используйте обычное поле, которое принимает в себя ID канала.</small>
            </div>
            <div className="form-group">
              <label htmlFor="bot-footer">Подпись</label>
              <Input
                value={props.botFooter}
                onChange={props.setBotFooter}
                required={true}
                placeholder="Подпись"
                id='bot-footer'
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label htmlFor="bot-legion">Список подразделений</label>
              <Input
                value={props.botLegion}
                onChange={props.setBotLegion}
                required={true}
                placeholder="Список подразделений"
                id='bot-legion'
              />
              <small className="form-text text-muted">Через "," и без пробелов, пример - "212,41,501". "none" - для отслеживания ВСЕХ на сервере.</small>
            </div>
            <div className="form-group">
              <label htmlFor="bot-color">Цвет</label>
              <ChromePicker
                color={props.botColor}
                onChangeComplete={props.setBotColor}
              />

            </div>
            <div className="form-group">
              <label htmlFor="bot-ip">IP</label>
              <Input
                value={props.botIp}
                onChange={props.setBotIp}
                required={true}
                placeholder="IP"
                id='bot-ip'
              />
            </div>
            <div className="form-group">
              <label htmlFor="bot-port">Порт</label>
              <Input
                value={props.botPort}
                onChange={props.setBotPort}
                required={true}
                placeholder="Порт"
                id='bot-port'
              />
            </div>
            <div className="form-group">
              <label htmlFor="battlemetric">Ссылка на battlemetrics.com</label>
              <Input
                value={props.battleMetricsUrl}
                onChange={props.setBattleMetricUrl}
                required={false}
                placeholder="battlemetrics.com"
                id='battlemetric'
              />
              <small className="form-text text-muted">Заполняется ТОЛЬКО в том случае, когда бот неспособен "достучаться" до сервера своими средствами.</small>
            </div>
          </div>

          <div className="col-12"><div className="form-group mt-4"><h3>Приветствие пользователей</h3></div></div>
          <div className="col-12">
            <div className="form-group">
                <label htmlFor="bot-greetings-channel">Канал для приветствия</label>
                <Input
                  value={props.greetingsChannel}
                  onChange={props.setGreetingsChannel}
                  required={false}
                  classes="mb-2"
                  placeholder="Канал для приветствия"
                  id='bot-greetings-channel'
                />
                <Select
                  value={props.greetingsChannel}
                  onChange={props.setGreetingsChannel}
                  id='bot-greetings-channel'
                  options={props.channels}
                />
                <small className="form-text text-muted">Каналы могут обновляться с задержкой. Если нужных каналов нет, используйте обычное поле, которое принимает в себя ID канала.</small>
              </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label htmlFor="greetings-text">Текст приветствия</label>
              <Textarea
                value={props.greetingsText}
                onChange={props.setGreetingsText}
                required={false}
                placeholder="Текст приветствия"
                id="greetings-text"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label htmlFor="greetings-pic">Изображение приветствия</label>
              <Input
                value={props.greetingsImage}
                onChange={props.setGreetingsImage}
                required={false}
                placeholder="Изображение"
                id='greetings-pic'
              />
              <img className="bot-img my-3" src={props.greetingsImage} alt="Изображение при приветствии пользователя"/>
              <small className="form-text text-muted">Вставляем ссылку, так как хранить изображения негде.</small>
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <Button
                text="Сохранить"
                classes='btn-block'
                type="submit"
              />
            </div>
          </div>
        </div>
      </form>
      </div>
      </div>
    )
  }
}

