
import React from 'react'
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

class TopBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            likes: 0
        }
        this.select = this.select.bind(this)
    }

    select(index) {
        console.log(index)
    }

    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Movies Ranked!</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
            </Navbar>
        )
    }
}

export default TopBar