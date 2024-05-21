import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fetchAllBooks from '../../store/reducers/bookListCreate'
import BookListItem from './BookListItem'
import { addBookToCart } from '../../store/reducers/cartCreate'

const BookList = () => {
  const { books, isLoading, isError } = useSelector((state) => state.bookList)
  const onAddToCart = (id) => dispatch(addBookToCart(id))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllBooks());
  },[])
  return (
    <div>
    {isError && isError}
    {isLoading ? 'Loading....': books?.map((book) => (
    <BookListItem book={book} key={`book-${book.id}`} addToCart={onAddToCart}/>
    ))}
    </div>
  )
}

export default BookList