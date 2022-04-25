import React, {Component} from 'react';
import ReactPaginate from 'react-paginate'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import libraryService from "../../service/libraryService";

class Books extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            size: 5,
            books: []
        }
    }

    render() {
        const offset = this.state.size * this.state.page;
        const nextPageOffset = offset + this.state.size;
        const pageCount = Math.ceil(this.state.books.length / this.state.size);
        const books = this.state.books.slice(offset, nextPageOffset);
        console.log(books, pageCount)

        return (
            <main>
                <div className={"container mm-4 mt-5"}>
                    <div className={"row"}>
                        <div className={"table-responsive"}>
                            <table className={"table table-striped"}>
                                <thead>
                                <th scope={"col"}>Name</th>
                                <th scope={"col"}>Category</th>
                                <th scope={"col"}>Author</th>
                                <th scope={"col"}>Available copies</th>
                                </thead>
                                <tbody>
                                {books.map(book => {
                                    return (
                                        <tr>
                                            <td>{book.name}</td>
                                            <td>{book.category}</td>
                                            <td>{book.author.name} {book.author.surname}</td>
                                            <td>{book.availableCopies}</td>
                                            <td className={"text-right"}>
                                                <button title={"Delete"} className={"btn btn-danger"}
                                                   onClick={() => this.deleteBooks(book.id)}>
                                                    Delete
                                                </button>
                                                <Link className={"btn btn-info ml-2"}
                                                      to={`/books/edit/${book.id}`}>
                                                    Edit
                                                </Link>
                                                <button title={"Take"} className={"btn btn-success"}
                                                        onClick={() => this.takeBook(book.id)}>
                                                    Take book</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                        <div className="col mb-3">
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <Link className={"btn btn-block btn-dark"} to={"/books/add"}>Add new book</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ReactPaginate previousLabel={"back"}
                                   nextLabel={"next"}
                                   breakLabel={<a href="/#">...</a>}
                                   breakClassName={"break-me"}
                                   pageClassName={"ml-1"}
                                   pageCount={pageCount}
                                   marginPagesDisplayed={2}
                                   pageRangeDisplayed={5}
                                   onPageChange={this.handlePageClick}
                                   containerClassName={"pagination m-4 justify-content-center"}
                                   activeClassName={"active"}/>
                </div>
            </main>
        )
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        console.log(selected)
        this.setState({
            page: selected
        })
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        this.loadBooks();
    }
    loadBooks = () => {
        libraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }
    deleteBooks = (id) => {
        libraryService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            });
    }
    takeBook = (id) => {
        libraryService.takeBook(id).
        then(() => {
            this.loadBooks();
        });
    }
}

export default Books;
