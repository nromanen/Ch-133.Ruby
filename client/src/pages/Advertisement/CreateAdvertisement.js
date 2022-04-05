import React, {useCallback, useEffect, useState} from 'react';
import FormInput from '../../components/form-input/form-input'
import CustomButton from '../../components/custom-button/custom-button'
import axios from 'axios';
import './CreateAdvertisement.scss';
import {createAdvertUrl, getAllAdverts} from '../../consts';
import {getAllCategories} from '../../consts';
import ImageUploader from "react-images-upload";
import {Dropdown} from "semantic-ui-react";
import Cookies from 'universal-cookie';
import '../../consts.js'
import {useNavigate} from "react-router-dom";
import DescriptionAlerts from '../../components/toster/message'

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

      let token = cookies.get('user-info');
      let navigate = useNavigate();

     React.useEffect(()=> {
         axios.get(`${getAllCategories}`).then(function(response){
             setCategories(response.data);
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
              headers: { Authorization: `Bearer ${token}`, 'X-lang': 'uk', 'Content-Type': 'application/json'
              }
          };
       const postData = {
               title,
               text,
               category_id,
               image,
       };
       setDisabled(true);
       axios.post(`${createAdvertUrl}`, postData, config
       )            .then((response) => {
           console.log(response)
           if (response.status === 200){
               console.log(response.status)
               navigate(`${getAllAdverts}`, {replace: true});
           }
           setMessage(response.data.message());
       })
           .catch(function (error) {
               console.log("asdasd")
               if (error.response.status === 422){
                   setMessage(error.response.data.join('<br>'));
               }
                if (error.response.status === 200){
                    navigate(`${getAllAdverts}`, {replace: true});
                }
           }).finally(() => {setDisabled(false)});
      }, [title, text, category_id, image, token]);

      const handleDropdown = (event, data) => {
          setCategory_id(data.value);
      };


     return (
            <div className='create-post'>
                { !!message  ? <DescriptionAlerts text={message}/> : null }
                <h2>Create your advertisement!</h2>
                <form onSubmit={onCreatePost} >
                    <FormInput name='title' type='text' value={title}
                               handleChange={event => {setTitle(event.target.value)}}
                               label='Title' />
                    <FormInput name='text' type='text' value={text} autoComplete="off"
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
            </div>
        );
    }

export default CreateAdvertisement