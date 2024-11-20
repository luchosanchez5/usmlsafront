import React from 'react'
import FindEvents from '../components/product/FindEvents'
import NavTopbar from '../pages/Home/NavTopbar'
import { Container } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
const GlobalLayout = (WrapComponent) => {
    return function Globally(props) {
        const location = useLocation()
        const pathname = ['/myaccount']

        return (
            <React.Fragment>
                <NavTopbar />
                <div className="page-container">
                    {!pathname.includes(location.pathname) ?
                        <FindEvents />
                        : null
                        }
                    <Container fluid>
                        <WrapComponent {...props} />
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}

export default GlobalLayout;