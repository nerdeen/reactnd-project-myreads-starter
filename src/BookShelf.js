import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ChangeShelf from './ChangeShelf';
class BookShelf extends Component{
    static propTypes = {
        books : PropTypes.array.isRequired,
        OnUpdate:PropTypes.func
    }
    render(){
        const {books,OnUpdate} = this.props;
        return(
            <div className="bookshelf">           
            <div className="bookshelf-books">
            <ol className="books-grid">
                {
                books.map((book)=>(
                <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <ChangeShelf book={book} OnUpdate={OnUpdate}/>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
                </li>
                ))}
            </ol>
            </div>
        </div>
    )}
}

export default BookShelf;