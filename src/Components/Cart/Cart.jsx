import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fetchAllCart, { addBookToCart, deleteCartItem, removeFromCart } from '../../store/reducers/cartCreate'
import { Alert, Button, Spinner, Table } from 'react-bootstrap'

const Cart = () => {
  const dispatch = useDispatch()
  const { cart, isLoadingCart, cartError } = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(fetchAllCart())
  }, [])
const onDelete = (id)=>{
  dispatch(deleteCartItem(id))
}
  const renderItems = (item, idx) => {
    const { title, count, total, id } = item

    const onAddToCart = () => dispatch(addBookToCart(id))
    const onRemoveFromCart = () => dispatch(removeFromCart(id));

    return (
      <tr key={`item-${id}`}>
        <th>{idx + 1}</th>
        <th>{title}</th>
        <th>{count}</th>
        <th>{total}$</th>
        <td>
          <Button variant='outline-success' className='mx-1' onClick={onAddToCart}>
            <i className='fa-solid fa-plus'></i>
          </Button>
          <Button variant='outline-warning' className='mx-1' onClick={onRemoveFromCart}>
            <i className='fa-solid fa-minus'></i>
          </Button>
          <Button variant='outline-danger' className='mx-1' onClick={()=> onDelete(item.id)}>
            <i className='fa-solid fa-trash'></i>
          </Button>
        </td>
      </tr>
    )
  }
  return   <div>
  <h2>Your order</h2>
  {isLoadingCart ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : cartError ? (
    <Alert variant="danger">{cartError}</Alert>
  ) : (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
          <th>Count</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{cart?.map(renderItems)}</tbody>
    </Table>
  )}
</div>

}

export default Cart