import React from 'react'
import "./style.css";
import { app } from '../../_config';
import Button from "../Button";
import Input from '../Input';
import Textarea from '../Textarea';

export default function UserDetail(props) {
  return (
    !!props.curUser && props.curUser.username ? (
      <div className="card user-detail">
        <div className="card-header">
          {props.curUser.avatar && (
            <div className="detail-user-img">
              <img src={props.curUser.avatar} alt={props.curUser.username}/>
            </div>
          )}
          <div className="detail-user-info">
            {props.curUser.nickname && (
              <div className="detail-user-nickname">{props.curUser.nickname}</div>
            )}
            <div className="detail-user-username">
              {props.curUser.username}#{props.curUser.discriminator}
            </div>
          </div>
        </div>
        <div className="card-body">
          {props.edit ? (
            <div>
              <div className="form-group">
                <label htmlFor="bot-text">Описание</label>
                <Textarea
                  value={props.text}
                  onChange={props.textChange}
                  placeholder="Описание"
                  id='bot-text'
                />
              </div>
              <div className="form-group">
                <label htmlFor="bot-pic">Изображение</label>
                <Input
                  value={props.image}
                  onChange={props.imageChange}
                  placeholder="Изображение"
                  id='bot-pic'
                />
                <img className="bot-img my-3" src={props.image} alt={props.curUser.username}/>
                <small className="form-text text-muted">Вставляем ссылку, так как хранить изображения негде.</small>
              </div>
            </div>
          ) : (
            <div>
              <p className="card-text">
                {props.portfolio.text ? props.portfolio.text : 'Данные не найдены'}
              </p>
              {props.portfolio.image && (
                <img src={props.portfolio.image} alt={props.curUser.username} />
              )}
            </div>
          )}

          {
             props.isAdmin && (
              <Button
                text={props.buttonText}
                onClick={props.onClick}
                classes="mt-3"
              />
            )
          }
          {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>
    ) : (
      <div className="card">
        <div className="card-body">
          Пользователь не найден
        </div>
      </div>
    )
  )
}
