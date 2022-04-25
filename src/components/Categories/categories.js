import React, {Component} from "react";
import libraryService from "../../service/libraryService";

class categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }
    render() {
        return (
            <main>
                <table>
                    <tr>
                        <th>Types</th>
                    </tr>
                <tr>
                {this.state.categories.map(category => {
                    return (
                        <td>{category}</td>
                    )
                })}
                </tr>
                </table>
            </main>
        );
    }
    componentDidMount() {
        this.fetchCategory()
    }
    fetchCategory() {
        libraryService.fetchCategories().then((data) =>
            this.setState({
                categories: data.data
            })
        )
    }
}
export default categories;