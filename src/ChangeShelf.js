import React, {Component} from 'react'
import PropTypes from 'prop-types'
class ChangeShelf extends Component{
    static propTypes = {
        book : PropTypes.object.isRequired,
        OnUpdate:PropTypes.func,
    }
render(){
    const {book,OnUpdate} = this.props;
    return(
        <div className="book-shelf-changer">
            <select  value={book.shelf} onChange={(event)=> OnUpdate(book,event.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )
}
}
export default ChangeShelf;