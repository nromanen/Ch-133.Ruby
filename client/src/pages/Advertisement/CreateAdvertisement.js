import React, {useCallback, useEffect, useState} from 'react';
import FormInput from '../../components/form-input/form-input'
import CustomButton from '../../components/custom-button/custom-button'
import axios from 'axios';
import './CreateAdvertisement.scss';
import {baseAdvertUrl} from '../../consts';
import '../../consts.js'
import ImageUploader from "react-images-upload";
import {Dropdown} from "semantic-ui-react";
import Cookies from 'universal-cookie';
import '../../consts.js'
import {useNavigate} from "react-router-dom";
import Message from '../../components/toster/message'
import InstantMessaging from "../../components/toster/toster";
import FormText from  "../../components/form-text/form-text"

const cookies = new Cookies();

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

 const CreateAdvertisement = (props) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [category_id, setCategory_id] = useState('');
    const [image, setImage] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [message, setMessage] = useState(null);
    const [categories, setCategories] = useState(null);
    const language = cookies.get('i18next');
    const [open, setOpen] = React.useState(false);

      let token = cookies.get('user-info');
      let navigate = useNavigate();

     React.useEffect(()=> {
         axios.get(`${window.createCategoryUrl}`).then(function(response){
             const result = [];
             response.data.categories.forEach(element => result.push({'key': element.name, 'text': element.name, 'value': element.id}))
             setCategories(result);
         });
     },[JSON.stringify(categories)]);

     const onImage = async (failedImages, successImages) => {
         try {
             console.log('successImages', successImages);
             const parts = successImages[0].split(';');
             const mime = parts[0].split(':')[1];
             const name = parts[1].split('=')[1];
             const data = parts[2].split(',')[1];
             setImage([mime, name, data])
         } catch (error) {
             console.log('error in upload', error);}
     };

    const onCreatePost = useCallback((event, value) => {
       event.preventDefault();
          const config = {
              headers: { Authorization: `Bearer ${token}`, 'X-lang': language, 'Content-Type': 'application/json'
              }
          };
       const postData = {
               title,
               text,
               category_id,
               image,
       };
       setDisabled(true);
       axios.post(`${baseAdvertUrl}`, postData, config
       )            .then((response) => {
           console.log(response)
           if (response.status === 200){
               navigate("/adverts", {replace: true});
               setOpen(true);
               setMessage(response.data);
               return Promise.reject(response);
           }
           setMessage(response.data.message());
       })
           .catch(function (error) {
               if (error.response.status === 422){
                   console.log(error.response.data.join(<br/>))
                   setMessage(error.response.data);
               }
           }).finally(() => {setDisabled(false)});
      }, [title, text, category_id, image, token]);

      const handleDropdown = (event, data) => {
          setCategory_id(data.value);
      };


     return (
            <div className='create-post'>
                { message  ? <Message text={message} type={"error"}/> : null }
                <h2>Create your advertisement!</h2>
                <form onSubmit={onCreatePost} >
                    <FormInput name='title' type='text' value={title}
                               handleChange={event => {setTitle(event.target.value)}}
                               label='Title' />
                    <FormText name='text' type='text' value={text} autoComplete="off"
                               handleChange={event => {setText(event.target.value)}}
                               label='Text' />
                    <Dropdown
                        placeholder='Categories'
                        fluid
                        selection
                        onChange={handleDropdown}
                        options={categories} />
                    <ImageUploader
                        onChange={onImage}
                        withIcon={false}
                        withPreview={true}
                        buttonText="Choose images"
                        imgExtension={[".jpg", ".png", ".jpeg", ".webp"]}
                    />
                    <CustomButton  disabled={disabled} type='submit'>Create Advert</CustomButton>
                </form>
                <InstantMessaging open = {open} type="success" text={message} />
            </div>
        );
    }

export default CreateAdvertisement