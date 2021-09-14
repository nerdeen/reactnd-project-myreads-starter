import React from 'react'
import {  Route,Link }  from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
class BooksApp extends React.Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books:[],
    currentlyReadingBooks:[],
    wantedBooks:[],
    readBooks:[],
    ordinaryBooks:[],
    
    query:"",
  }
  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({
        books:books,
        ordinaryBooks:books.filter((ordBooks)=>{
          return ordBooks.shelf==="none"}),
        wantedBooks:books.filter((wantBooks)=>{
          return wantBooks.shelf==="wantToRead"}),
        currentlyReadingBooks:books.filter((currBooks)=>{
          return currBooks.shelf==="currentlyReading"}), 
        readBooks:books.filter((readBooks)=>{
          return readBooks.shelf==="read"}),          
      })
    });

  }
  ChangeShelf=(book,shelf)=>{
    BooksAPI.update(book,shelf).then(()=>{
      BooksAPI.getAll().then((books)=>{
        this.setState({
          books:books,
          ordinaryBooks:books.filter((ordBooks)=>{
            return ordBooks.shelf==="none"}),
          wantedBooks:books.filter((wantBooks)=>{
            return wantBooks.shelf==="wantToRead"}),
          currentlyReadingBooks:books.filter((currBooks)=>{
            return currBooks.shelf==="currentlyReading"}), 
          readBooks:books.filter((readBooks)=>{
            return readBooks.shelf==="read"}),          
        })
      });
    })
  }
  render() {
    const { query,wantedBooks,currentlyReadingBooks,readBooks } = this.state
    // const DisplayedBoos = query === ''
    //   ? books
    //   : books.filter((info) => (
    //       info.name.toLowerCase().includes(query.toLowerCase())
    //     ))
    return (
      <div className="app">
        
                    <Route path="/search" render={({history})=>(
                      <BookSearch query={query} OnSearch={
                        ()=>{
                              history.push("/");
                          }} OnUpdate={this.ChangeShelf}
                          />
                    )} />
          
         
          <Route exact path="/" render={()=>(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <BookShelf books={currentlyReadingBooks} OnUpdate={this.ChangeShelf}/>
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <BookShelf books={wantedBooks} OnUpdate={this.ChangeShelf}/>
                    <h2 className="bookshelf-title">Read</h2>
                    <BookShelf books={readBooks} OnUpdate={this.ChangeShelf}/>          
                </div>
              </div>
              <div className="open-search">
                <Link to="/search"  >Add a book</Link>
              </div>
            </div>
          )} /> 
        
      </div>
    )
  }
}

export default BooksApp
