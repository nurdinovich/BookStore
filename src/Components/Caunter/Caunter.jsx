import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import fetchCounter from '../../store/reducers/caunterCreator'

const Caunter = () => {
    const {count} = useSelector((state)=> state.counter)
    const dispatch = useDispatch()

    const onClick = () => {
      dispatch(fetchCounter({count: count + 1, id: Math.random()}))
    }
  return (
    <div>
        <h2>{count}</h2>
        <button onClick={onClick}>+</button>
    </div>
  )
}

export default Caunter