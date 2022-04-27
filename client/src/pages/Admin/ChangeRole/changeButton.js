import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { baseUrlUsers } from "../../../consts";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import axios from "axios";

export default function CustomizedMenus(props) {
  const [roles, setRoles] = React.useState("");
  const rolesUrl = `${window.baseUrl}/roles`;

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    await axios.get(rolesUrl).then(function (response) {
      setRoles(response.data);
    });
  };

  const handleChange = (event) => {
    localStorage.setItem("changeRole", event.target.value);
    props.change();
  };

  return (
    <>
      <FormControl>
        <NativeSelect
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
          onChange={handleChange}
        >
          {roles
            ? roles.map((role) =>
                props.selected == role.name ? (
                  <option value={role.name} selected={true} key={role.id}>
                    {role.name}
                  </option>
                ) : (
                  <option value={role.name} key={role.id}>
                    {role.name}
                  </option>
                )
              )
            : null}
        </NativeSelect>
      </FormControl>
    </>
  );
}
