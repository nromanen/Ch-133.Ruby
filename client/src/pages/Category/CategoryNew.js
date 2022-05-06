import React, { useCallback, useState } from "react";
import FormInput from "../../components/form-input/form-input";
import CustomButton from "../../components/custom-button/custom-button";
import Message from "../../components/toster/message";
import Cookies from "universal-cookie";
import "./CategoryPage.scss";
import "../../consts.js";
import axios from "axios";
import ImageUploader from "react-images-upload";
const cookies = new Cookies();

export default function NewCategory() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [messageStyle, setMessageStyle] = useState("error");
  const [image, setImage] = useState(null);
  const token = cookies.get("user-info");
  const language = cookies.get("i18next");
  const label = "New category";

  const configWithToken = {
    headers: {
      "Content-Type": "application/json",
      "X-lang": language,
      Authorization: `Bearer ${token}`,
    },
  };

  const Submit = (event) => {
    event.preventDefault();
    axios
      .post(
        window.createCategoryUrl,
        { name: name, image: image },
        configWithToken
      )
      .then(function (response) {
        setShowMessage(true);
        setMessage(response.data["message"]);
        setMessageStyle("success");
      })
      .catch(function (error) {
        setShowMessage(true);
        setMessage(JSON.stringify(error.response.data));
      });
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
      <form onSubmit={Submit}>
        <FormInput
          name="name"
          type="name"
          value={name}
          handleChange={(event) => {
            setName(event.target.value);
          }}
        />
        <CustomButton type="submit">Create</CustomButton>
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
}
