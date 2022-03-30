import React, {useCallback, useEffect, useMemo, useState} from 'react';

import './Categories.scss'
import '../../consts.js'
import {Dropdown, List, Pagination} from 'semantic-ui-react';
import axios from "axios";

export default function App() {
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1)
    const perPageOptions = [10, 25, 50, 100]
    const [perPage, setPerPage] = useState(perPageOptions[0]);

    const apiUrl = useMemo(() => {
        return window.createCategoryUrl+`/?page=${page}&per_page=${perPage}`
    }, [page, perPage])

    useEffect( () => {
        const queryParams = new URLSearchParams(window.location.search)
        const pageparam = (queryParams.get("page"))
        const perpageparam = (queryParams.get("per_page"))
        if (pageparam!=null) setPage(pageparam)
        if (perpageparam!=null) setPerPage(perpageparam)
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

    const handleDelete = (e, Info) => {
        console.log(Info);
    }

    const items = categories.map((category) =>
        <li key={category.id}>
            {category.name}
            <button onClick={(e) => handleDelete(e,category.id)}>delete</button>
        </li>
    );

    return (
        <div className="categories">
            <div>
                <h3 className="bold">All categories</h3>
                <List>{items}</List>
            </div>

            <div className="categories">
                <Pagination
                    size='mini'
                    siblingRange={1}
                    activePage={page}
                    onPageChange={handleOnChange}
                    totalPages={pages}
                />
                <Dropdown
                    placeholder={perPageOptions[0].toString()}
                    defaultValue={perPageOptions[0]}
                    fluid
                    selection
                    options={perPageOptions.map(numb => ({key: numb, text:numb, value: numb }))}
                    onChange={handleOnChangeDropdown}
                />
            </div>
        </div>
        );
}
