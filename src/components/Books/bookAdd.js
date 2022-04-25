import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import libraryService from "../../service/libraryService";

const BookAdd = (props) => {
    const history = useNavigate();
    const [formData, updateFormData] = React.useState({
        name: "",
        category: "",
        author: 1,
        availableCopies: 0
    })

    const [categories, setCategories] = useState([])
    const [authors,setAuthors] = useState([])
    const page = useState(0)

    useEffect(() => {
        fetchAuthors()
            .then(res => setAuthors(res.data))
        fetchCategories()
            .then(res => setCategories(res.data))
    },[page])

    const fetchCategories = () => {
        return libraryService.fetchCategories()
    }
    const fetchAuthors = () => {
        return libraryService.fetchAuthors()
    }

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name;
        const category = formData.category;
        const author = formData.author;
        const availableCopies = formData.availableCopies;

        libraryService.addBooks(name, category, author, availableCopies);
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
                               required
                               placeholder="Enter book name"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select name={"category"} className={"form-control"} onChange={handleChange}>
                            {categories.map(cat => {
                                return(
                                    <option value={cat}>{cat}</option>
                                );
                            })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableCopies">Copies</label>
                        <input type="text"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               placeholder="availableCopies"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select name="author" className="form-control" onChange={handleChange}>
                            {authors.map((term) => {
                                return (
                                    <option value={term.id}>{term.name} {term.surname}</option>
                                )
                            })}
                        </select>
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default BookAdd;
