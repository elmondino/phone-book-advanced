import React from "react";

const SortContact = ({sortContact}) => {
    const handleChange = (e) => {
        sortContact(e.target.value)
    }
    return (
        <div className="sort">
            <label htmlFor="orderBy">Sort by name: </label>
            <select id="orderBy" onChange={handleChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    );
};

export default SortContact;