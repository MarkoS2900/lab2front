import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import libraryService from "../../service/libraryService";
import BookAdd from "../Books/bookAdd";
import Books from "../Books/book";
import BookEdit from "../Books/bookEdit"
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../Header/header";
import Categories from "../Categories/categories";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className="container">
                        <Routes>
                            <Route path={"/"} exact element={<Books/>}/>
                            <Route path={"/books"} exact element={<Books/>}/>
                            <Route path={"/books/add"} exact element={<BookAdd/>}/>
                        <Route path={"/books/edit/:id"} exact element={<BookEdit/>}/>
                        <Route path={"/categories"} exact element={<Categories/>}/>
                        </Routes>
                    </div>
                </main>
            </Router>
        );
    }
    addBook = (name, category, author, availableCopies) => {
        libraryService.addBooks(name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    editBook = (id, name, category, author, availableCopies) => {
        libraryService.editBook(id, name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }
}
export default App;