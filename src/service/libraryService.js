import axios from "../axios/axios";

const LibraryService = {
    fetchBooks: () => {
        return axios.get("/books")
    },
    fetchCategories: () => {
        return axios.get("/categories");
    },
    fetchAuthors: () => {
        return axios.get("/books/authors")
    },
    addBooks: (name, category, author, availableCopies) => {
        return axios.post("/books/add", {
            "name": name,
            "category": category,
            "author": author,
            "availableCopies": availableCopies
        });
    },
    editBook: (id, name, category, author, availableCopies) => {
        return axios.put(`/books/edit/${id}`, {
            "name": name,
            "category": category,
            "author": author,
            "availableCopies": availableCopies
        });
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`);
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },
    takeBook: (id) => {
        return axios.post(`/books/taken/${id}`)
    }
}
export default LibraryService;