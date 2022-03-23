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

    const items = categories.map((category) =>
        <li key={category.id}>
            {category.name}
        </li>
    );

    return (
        <div className="categories">
            <div>
                <Dropdown
                    placeholder={perPageOptions[0]}
                    defaultValue={perPageOptions[0]}
                    fluid
                    selection
                    options={perPageOptions.map(numb => ({key: numb, text:numb, value: numb }))}
                    onChange={handleOnChangeDropdown}
                />
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
            </div>
        </div>
        );
}