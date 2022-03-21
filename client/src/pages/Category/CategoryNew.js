import React, {useCallback} from 'react';

import FormInput from '../../components/form-input/form-input'
import CustomButton from '../../components/custom-button/custom-button'
import Message from '../../components/message/message'

import './CategoryPage.scss'
import '../../consts.js'
import axios from "axios";

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-lang': 'uk' },
            body: JSON.stringify({
                "name": this.state.name
            })
        };
        fetch(window.createCategoryUrl, requestOptions)
            .then((response) => {
                this.setState({ ShowMessage: true });
                return response.json();
            })
            .then((data) => {
                if(this.state.ShowMessage) {
                    this.setState({text: data.name});
                }
            });
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className='category'>
                { this.state.ShowMessage ? <Message text={this.state.text}/> : null }
                <h2>Create category</h2>
                <form onSubmit={this.handleSubmit}>
                    <FormInput name='name' type='name' value={this.state.name}
                               required handleChange={this.handleChange} label='Name of Category' />
                    <CustomButton type='submit'>Create</CustomButton>
                </form>
            </div>
        );
    }
}

export default Category;

// export default function App() {
//     const [disabled, setDisabled] = useState(false);
//
//     const handleSubmit = useCallback((event, value) => {
//         event.preventDefault();
//         const bodyParameters = {
//             "name": name
//         };
//         setDisabled(true);
//         axios.put(window.createCategoryUrl, bodyParameters).then()
//     })
// }