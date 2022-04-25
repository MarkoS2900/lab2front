import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import libraryService from "../../service/libraryService";

const BookEdit = (props) => {

    const id = useParams().id
    const [selectedBook, setSelectedBook] = useState({})
    const history = useNavigate();
    const [formData, updateFormData] = React.useState({
        name: "",
        category: "",
        author: 1,
        availableCopies: 1
    })

    const [categories, setCategories] = useState([])
    const [authors, setAuthors] = useState([])
    const page = useState(0)

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const fetchCategories = () => {
        return libraryService.fetchCategories()
    }
    const fetchAuthors = () => {
        return libraryService.fetchAuthors()
    }

    const getBook = (id) => {
        return libraryService.getBook(id)
    }
    useEffect(() => {
        getBook(id)
            .then(res => {
                setSelectedBook(res.data);
                updateFormData({
                    ...formData,
                    name: selectedBook.name,
                    availableCopies: selectedBook.availableCopies,
                    category: selectedBook.category,
                    author: selectedBook.author
                });
            })
        fetchAuthors()
            .then(data => {
                setAuthors(data.data);
            })
        fetchCategories()
            .then(data => {
                setCategories(data.data);
            })
    }, [page])

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name !== "" ? formData.name : selectedBook.name;
        const category = formData.category !== "" ? formData.category : selectedBook.category;
        const author = formData.author !== "" ? formData.author : selectedBook.author.id;
        const availableCopies = formData.availableCopies !== 0 ? formData.availableCopies : selectedBook.availableCopies;

        libraryService.editBook(id, name, category, author, availableCopies);
        history("/books");
    }

    return (
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               placeholder={selectedBook.name}
                               onChange={handleChange}
                        />
                    </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select name={"category"} className={"form-control"} onChange={handleChange}
                                    defaultValue={selectedBook.category}

                                    placeholder={selectedBook.category}>
                                {categories.map(cat => {
                                    return (
                                        <option value={cat}>{cat}</option>
                                    );
                                })}
                            </select>
                        </div>
                    {selectedBook.author != null &&
                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <select id="author" name="author" className="form-control" onChange={handleChange}
                                    defaultValue={selectedBook.author.id}>
                                {authors.map((term) => {
                                    return (
                                        <option value={term.id}>{term.name} {term.surname}</option>
                                    );
                                })}
                            </select>
                        </div>
                    }
                    <div className="form-group">
                        <label htmlFor="availableCopies">Copies</label>
                        <input type="text"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               placeholder={selectedBook.availableCopies}
                               defaultValue={selectedBook.availableCopies}
                               onChange={handleChange}
                        />
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default BookEdit;
