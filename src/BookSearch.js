import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
class BookSearch extends Component{
    state={
        searchedBooks:[],
    }
static propTypes = {
    query : PropTypes.string.isRequired,
}
SearchQuery=(query)=>{
    BooksAPI.search(query).then((books)=>{
      this.setState({
        searchedBooks:books,
      })
    })
  }
render(){
    const {query,OnUpdate,OnSearch} = this.props;
    return(
        <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/" onClick= { OnSearch}>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"
                value={query}
                onChange={(event) => this.SearchQuery(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              {
                this.state.searchedBooks.length>0&&(
              <BookShelf books={this.state.searchedBooks} OnUpdate={OnUpdate}/>)}
            </div>
          </div>
    )
}
}
export default BookSearch;