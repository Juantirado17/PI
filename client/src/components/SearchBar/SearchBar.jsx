import { useState } from 'react';
import { useDispatch } from "react-redux";
import { getAllDogsName } from '../../redux/actions';
import style from "./Search.module.css";

const SearchBar = () => {
    const dispatch = useDispatch();

    const [search, setSearch] = useState({
        name: ""
    })

    const searchHandler = (event) => {
        setSearch({ name: event.target.value });
    }

    const submitHandler = () => {
        const name = search.name
        if (name.length > 0) {
            dispatch(getAllDogsName(name));
        }
    }

    return (
        <div className={style.container}>
            <h1> Search </h1>
            <input id="search" type="search" placeholder="Search breed..." onChange={searchHandler} value={search.name} />
            <button type="submit" onClick={submitHandler} value={search.name}>Search</button>
        </div>
    )
}

export default SearchBar;

