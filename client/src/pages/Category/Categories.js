import React, {useEffect, useMemo, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

import './Categories.scss'
import '../../consts.js'
import {Dropdown, List, Pagination, Icon} from 'semantic-ui-react';
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../../i18n";
import { useTranslation } from "react-i18next";
import jwt from 'jwt-decode';

const cookies = new Cookies();

export default function App() {
    const queryParams = new URLSearchParams(window.location.search)
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(queryParams.get("page"));
    const [pages, setPages] = useState(1)
    const perPageOptions = [10, 25, 50, 100]
    const [perPage, setPerPage] = useState(queryParams.get("per_page"));
    const token = cookies.get('user-info');
    const lang = cookies.get('i18next');
    const { t } = useTranslation();
    const decoded = jwt(token);
    let navigate = useNavigate();
    let tokentest = decoded['role'];

    const apiUrl = useMemo(() => {
        return window.createCategoryUrl+`/?page=${page}&per_page=${perPage}`
    }, [page, perPage])

    useEffect( () => {
        if (queryParams.get("page")==null) setPage(1);
        if (queryParams.get("per_page")==null) setPerPage(perPageOptions[0]);
        navigate(`./?page=${page}&per_page=${perPage}`)
        axios.get(apiUrl).then(response => {
            setPages(response.data.pages)
            setCategories(response.data.categories);
        });
    }, [apiUrl]);

    const handleOnChangeDropdown = (e, Info) => {
        setPerPage(Info.value);
        setPage(1)
    };

    const handleOnChange = (e, pageInfo) => {
        if (pageInfo.activePage != null){
            setPage(pageInfo.activePage);
        } else setPage(1)
    };

    const requestHeaders = {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    };

    const categoryDelete = (categoryID) => {
        axios.delete(window.createCategoryUrl+`/${categoryID.toString()}`, requestHeaders)
            .then((res) => {
                alert('Deleted successfully');
                window.location.reload();
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    }

    const handleDelete = (e, Info) => {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure to do this?',
            buttons: [ {label: 'Yes', onClick: () => categoryDelete(Info)}, {label: 'No'} ]
        });
    }

    const redirectToEdit = (e, Info) => {
      navigate(`./edit/${Info}`)
    }


    const items = categories.map((category) =>
        <li key={category.id}>
            {category.name}
            {tokentest=='Moderator'||tokentest=='Admin'&&
                <div className="icon">
                    <button className="icon" onClick={(e) => handleDelete(e, category.id)}><Icon name='delete'/></button>
                    <button className="icon" onClick={(e) => redirectToEdit(e,category.id)}><Icon name ='edit'/></button>
                </div>
            }
        </li>
    );

    return (
        <div className="categories">
            <div>
                <h3 className="bold">{t("category.all")}</h3>
                <List>{items}</List>
            </div>

            <div className="categories">
                <Pagination className = "inbox"
                    size='mini'
                    siblingRange={1}
                    activePage={page}
                    onPageChange={handleOnChange}
                    totalPages={pages}
                />
                <Dropdown className = "inbox"
                    placeholder={perPage}
                    defaultValue={perPage}
                    fluid
                    selection
                    options={perPageOptions.map(numb => ({key: numb, text:numb, value: numb }))}
                    onChange={handleOnChangeDropdown}
                />
            </div>
        </div>
        );
}