import React from 'react'
import classes from './style.module.css'
import {Button} from 'react-bootstrap'


const BookListItem = ({ book, addToCart }) => {
    const { id, title, price, author, imgUrl } = book
    const onAddToCart = () => addToCart(id)
 

    return <div className={classes.list_item} itemScope itemProp='http://schema.org/Product'>
        <div className={classes.list_item_cover}>
            <img src={imgUrl} alt="book" />
        </div>
        <div className={classes.list_item_details} itemScope itemProp='http://schema.org/Review'>
            <h4>{title}</h4>
            <div itemProp='http://schema.org/author'> {author}</div>
            <div className={classes.list_item_prive}>{price}$</div>
            <Button onClick={onAddToCart}>Add to cart</Button>
        </div>
    </div>

}

export default BookListItem