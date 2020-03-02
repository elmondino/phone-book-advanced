import React, { Component } from 'react';
import axios from 'axios';
import './Calendar.css';
import { v1 as uuid } from 'uuid';

class Calendar extends Component {
    state = {
        contacts: [],
        search: '',
        sortType: 'asc',
        contactName: '',
        contactNumber: '',
        contactAddress: ''
    }
    updateSearch = event => {
        this.setState({
            search: event.target.value
        })
    }
    handleChange = (e) => {
        this.setState({ sortType: e.target.value });
    }
    updateContact = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    addContact = (e) => {
        e.preventDefault();
        this.setState({contacts: [...this.state.contacts, {name: this.state.contactName, address: this.state.contactAddress, id: uuid(), phone_number: this.state.contactNumber}]},
         () => {
            this.setState({
                contactName: '',
                contactAddress: '',
                contactNumber: ''
            })
         });
    }
    removeContact = (id) => {
        this.setState({
            contacts: this.state.contacts.filter(contact => contact.id !== id)
        })
    }
    componentDidMount() {
        axios.get('http://www.mocky.io/v2/581335f71000004204abaf83')
            .then(response => {
                response.data.contacts.forEach((contact, index) => {
                    contact.id = index + 1;
                });
                this.setState({
                    contacts: response.data.contacts
                })
            })
    }
    render() {
        const { contacts, sortType } = this.state;
        const filteredContacts = contacts.filter((contact) => {
            return contact.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        });
        const sortedContacts = filteredContacts.sort((a, b) => {
            let isReversed = (sortType === 'asc') ? 1 : -1;
            return isReversed * a.name.localeCompare(b.name);
        })
        const contactsList = sortedContacts.length ? (
            sortedContacts.map(contact => {
                return (
                    <div key={contact.id} className="contact">
                        <div>{contact.name}</div>
                        <div>{contact.phone_number}</div>
                        <div>{contact.address}</div>
                        <div className="remove-contact" onClick={() => this.removeContact(contact.id)}>Remove Contact</div>
                        <hr/>
                    </div>
                )
            })
        ) : (
                <div className="center"> No Contacts Found </div>
            )
        return (
            <div className="container">
                <div className="header">
                    <h1>Phone Book</h1>
                    <div className="filter">
                        <label htmlFor="filter">Filter by name: </label>
                        <input type="text" id="filter" value={this.state.search} onChange={this.updateSearch} />
                    </div>
                    <div className="sort"> 
                        <label htmlFor="orderBy">Sort by name: </label>
                        <select value={this.state.value} id="orderBy" onChange={this.handleChange}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div> 
                    <div className="add-contact">
                        <form className="contact-form" onSubmit={this.addContact}>
                            <input type="text" placeholder='name' name="contactName" value={this.state.contactName} onChange={this.updateContact} required />
                            <input type="text" placeholder='phone number' name="contactNumber" value={this.state.contactNumber} onChange={this.updateContact} required />
                            <input type="text" placeholder='address' name="contactAddress" value={this.state.contactAddress} onChange={this.updateContact} required />
                            <input type="submit" value='Add Contact'/>
                        </form>
                    </div>
                </div>
                <div className="contact-list">
                    {contactsList}
                </div>
            </div>
        );
    }
}

export default Calendar;