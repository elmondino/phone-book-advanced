import React, { Component } from "react";
import { v1 as uuid } from "uuid";

class AddContact extends Component {
    state = {
        name: "",
        phone_number: "",
        address: "",
        id: ""
    };
    updateContact = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handleSubmit = e => {
        e.preventDefault();
        const id = uuid();
        this.setState(
            {
                id
            },
            () => {
                this.props.addContact(this.state);
            }
        );
    };
    render() {
        return (
            <div className="add-contact">
                <form className="contact-form" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="name" name="name" onChange={this.updateContact} required />
                    <input type="text" placeholder="phone number" name="phone_number" onChange={this.updateContact} required />
                    <input type="text" placeholder="address" name="address" onChange={this.updateContact} required />
                    <input type="submit" value="Add Contact" />
                </form>
            </div>
        );
    }
}

export default AddContact;
