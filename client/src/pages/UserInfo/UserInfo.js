import React, {useCallback, useState} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import FormInput from '../../components/form-input/form-input'
import CustomButton from '../../components/custom-button/custom-button'
import Cookies from 'universal-cookie';
import Message from "../../components/message/message";
import {baseUrlUsers} from "../../consts";
import '../../components/message/message.scss'
const cookies = new Cookies();

const UserInfo = (props) => {
    let params = useParams();

    let token = cookies.get('user-info');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [text, setText] = useState(null);

    const handleSubmit = useCallback((event, value) => {
        event.preventDefault();
        console.log('values = ', firstName, lastName, phone, token);

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const bodyParameters = {
            "user_info":
                {
                    "first_name": firstName,
                    "last_name": lastName,
                    "phone": phone
                }
        };
        setDisabled(true);
        axios.put(`${baseUrlUsers}/${params.userId}/user_infos`,
            bodyParameters,
            config
            )
            .then(function (response) {
                setText('');
            })
            .catch(function (error) {
                if (error.response.status === 422){
                    console.log('----------', error.response.data);
                    setText(error.response.data.join('<br>'));
                }
            }).finally(() => setDisabled(false));

    }, [firstName, lastName, phone, params.userId, token]);

    React.useEffect(()=>{

        axios.get(`${baseUrlUsers}/${params.userId}/user_infos`)
            .then((response)=>{
                setFirstName(response.data.first_name);
                setLastName(response.data.last_name);
                setPhone(response.data.phone);
            })
            .catch(function (error) {
                setText(error.response.data.message);
                // console.log('----- ', error.response.data.message)
                if ((error.response.status === 404) && (error.response.data.message === "User doesn't exist.")) {
                    window.location = '/HomePage';
                }
            })
    }, [params.userId]);

    // let errorMsg = text.map((el) => {
    //     return <h1 key={el.name}> {el.name} </h1>;
    // });
    // let errorMsg = text.map((el, index) => {
    //     return (
    //         <h1 key={el.name}> {el.name} </h1>
    //     );
    // });
    return (
        <div className={'user-info-page'}>
            { !!text  ? <Message text={text}/> : null }
            {/*{ !!text && <div className='message-style'>*/}
            {/*    {Object.entries(text).forEach(([key, value]) => console.log(`${key}: ${value}`))}*/}
            {/*    /!*{text.map(function(first_name, last_name, phone) {*!/*/}
            {/*    /!*    return (*!/*/}
            {/*    /!*        <div>*!/*/}
            {/*    /!*            <h1>{first_name}</h1>*!/*/}
            {/*    /!*            <h1>{last_name}</h1>*!/*/}
            {/*    /!*            <h1>{phone}</h1>*!/*/}
            {/*    /!*        </div>*!/*/}
            {/*    /!*    )*!/*/}
            {/*    /!*})}*!/*/}
            {/*    /!*{text.map(({ id, first_name, last_name, phone }) => (*!/*/}
            {/*    /!*    <div key={id}>*!/*/}
            {/*    /!*        <h1>{first_name}</h1>*!/*/}
            {/*    /!*        <h1>{last_name}</h1>*!/*/}
            {/*    /!*        <h1>{phone}</h1>*!/*/}
            {/*    /!*    </div>*!/*/}
            {/*    /!*))}*!/*/}
            {/*    /!*<h1>{text}</h1>*!/*/}
            {/*</div>  }*/}
            <h2>User info</h2>
            <form onSubmit={handleSubmit}>
                <FormInput name='first_name' type='text' value={firstName}
                           handleChange={event => { setFirstName(event.target.value)}}
                           label='First name' />
                <FormInput name='last_name' type='text' value={lastName}
                           handleChange={event => { setLastName(event.target.value)}}
                           label='Last name' />
                <FormInput name='phone' type='text' value={phone}
                           handleChange={event => { setPhone(event.target.value)}}
                           label='Phone' />
                <CustomButton disabled={disabled} type='submit'>Send</CustomButton>
            </form>
        </div>

    )
};


export default UserInfo;