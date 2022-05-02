import React, { useCallback, useEffect, useMemo, useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import "./Categories.scss";
import "../../consts.js";
import axios from "axios";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TopButton from "../../components/topButton";
import DeleteDialog from "../../components/dialogs/deleteDialog";
import EditDialog from "../../components/dialogs/editDialog";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useRef } from "react";

export default function App() {
  const cookies = new Cookies();
  const [categories, setCategories] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = React.useState(0);
  const [id, setId] = React.useState(null);
  const [totalPage, setTotalPage] = React.useState(0);
  const navigate = useNavigate();
  const deleteDialogRef = useRef();
  const editDialogRef = useRef();

  const apiUrl = useMemo(() => {
    return window.createCategoryUrl + `/?page=${page + 1}&per_page=${perPage}`;
  }, [page, perPage]);

  useEffect(() => {
    getCategories();
  }, [apiUrl]);

  const renderImage = (url) => {
    let url_image =
      "https://res.cloudinary.com/diw4a6aw6/image/upload/v1651000246/xmjke5gmaikqdlc1gawh0b5yonhh.webp";
    if (url != null) {
      url_image = url;
    }
    return url_image;
  };

  const getCategories = async () => {
    await axios.get(apiUrl).then((response) => {
      setTotalPage(response.data.pages);
      setCategories(response.data.categories);
    });
  };

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

  const deleteCategory = async () => {
    await axios
      .delete(`${window.createCategoryUrl}/${id}`, getCredentials())
      .then((response) => {
        getCategories();
      });
  };

  const changeCategory = () => {
    getCategories();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <ImageList sx={{ width: "60%", margin: "auto" }}>
        {categories.map((item) => (
          <ImageListItem key={renderImage(item.id)}>
            <img
              src={`${renderImage(item.image_url)}?w=248&fit=crop&auto=format`}
              srcSet={`${renderImage(
                item.image_url
              )}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
              onClick={() => {
                navigate(`/${item.id}`);
              }}
              style={{ cursor: "pointer" }}
            />

            <ImageListItemBar
              title={item.name}
              subtitle={item.name}
              actionIcon={
                <>
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.title}`}
                    onClick={() => (
                      deleteDialogRef.current.handleClickOpen(),
                      setId(item.id)
                    )}
                  >
                    <DeleteIcon sx={{ color: "#ffffff" }} />
                  </IconButton>
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.title}`}
                    onClick={() => (
                      editDialogRef.current.handleClickOpen(),
                      setId(item.id)
                    )}
                  >
                    <EditIcon sx={{ color: "#ffffff" }} />
                  </IconButton>
                </>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      <TablePagination
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "5%",
          marginBottom: "5%",
        }}
        count={totalPage * perPage}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={perPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <DeleteDialog delete={() => deleteCategory()} ref={deleteDialogRef} />
      <EditDialog change={() => changeCategory()} ref={editDialogRef} id={id}/>
      <TopButton />
    </>
  );
}
