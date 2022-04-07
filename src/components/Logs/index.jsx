import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Pagination from '../Pagination'
import Spinner from '../Spinner'
import './style.css'

export default function Logs(props) {
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)
  const [items, setItems] = useState(null)

  const onPage = props.onPage||0

  useEffect(() => {
    if(props.items === null)
      return setItems(null)

    if(onPage > 0 && !!props.items){
      let startIndex = onPage * (page - 1)
      if(page === 1)
        startIndex = 0
      setPages(Math.ceil(props.items.length/onPage))
      setItems(props.items.slice(startIndex, startIndex + onPage))
    }
  }, [props.items, page])

  const pageClick = (num) => {
    if(num > pages)
      num = pages
    setPage(num)
  }



  return items === null ? (
    <Spinner card={true}/>
  ) : (
    <div className="card">
      <div className="card-body">
        <ul className="list-group logs-list">
          {!items.length ? (
            <li className="list-group-item text-center">Логи не найдены</li>
          ): (
            items.map((item) => {
              const createdAt = new Date(item.createdAt)
              return <li className={'list-group-item ' + item.actionType} key={item.id}>
                <div className='left'>
                  <span className='date-log'>{createdAt.toLocaleDateString()} {createdAt.toLocaleTimeString()}</span>
                  <NavLink to={'/users/' + item.userId}>{!!item.username ? item.username : `Пользователь ${item.userId}`}</NavLink>
                </div>
                <span>{item.action}</span>
              </li>
            })
          )}
        </ul>
        {pages > 1 && (
          <Pagination
            pages={pages}
            curPage={page}
            onPageClick={pageClick}
          />
        )}
      </div>
    </div>
  )
}
