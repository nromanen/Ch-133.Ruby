import React, { useState } from "react";
import FormInput from "../../components/form-input/form-input";
import Message from "../../components/toster/message";
import Cookies from "universal-cookie";
import "../../consts.js";
import axios from "axios";
import ImageUploader from "react-images-upload";
import { forwardRef, useImperativeHandle } from "react";

const EditCategory = forwardRef((props, ref) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [messageStyle, setMessageStyle] = useState("error");
  const [image, setImage] = useState(null);
  const label = "Edit category";
  const cookies = new Cookies();

  useImperativeHandle(ref, () => ({
    changeCategory() {
      axios
        .put(
          `${window.createCategoryUrl}/${props.id}`,
          { name: name, image: image },
          getCredentials()
        )
        .then(function (response) {
          setShowMessage(true);
          setMessage(response.data["message"]);
          setMessageStyle("success");
          props.change();
        })
        .catch(function (error) {
          setShowMessage(true);
          setMessage(JSON.stringify(error.response.data));
        });
    },
  }));

  const getCredentials = () => {
    const token = cookies.get("user-info");
    const language = cookies.get("i18next");
    return {
      headers: {
        "Content-Type": "application/json",
        "X-lang": language,
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const onImage = async (failedImages, successImages) => {
    try {
      const parts = successImages[0].split(";");
      const mime = parts[0].split(":")[1];
      const name = parts[1].split("=")[1];
      const data = parts[2].split(",")[1];
      setImage([mime, name, data]);
    } catch (error) {
      console.log("error in upload", error);
    }
  };

  return (
    <div className="category">
      {showMessage ? <Message text={message} type={messageStyle} /> : null}
      <h2>{label}</h2>
      <form>
        <FormInput
          name="name"
          type="name"
          value={name}
          handleChange={(event) => {
            setName(event.target.value);
          }}
        />
        <ImageUploader
          withPreview={true}
          withIcon={true}
          onChange={onImage}
          imgExtension={[".jpg", ".png"]}
          maxFileSize={5242880}
          singleImage={true}
          label={"Max file size: 5mb, accepted: jpg, png"}
        />
      </form>
    </div>
  );
});

export default EditCategory;
