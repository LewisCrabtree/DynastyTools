import { React, useEffect, useRef, useState } from 'react';
import { LogIn, ThumbsUp, Tool, TrendingUp } from 'react-feather';
import { NavLink } from 'react-router-dom';
import Logo from '../images/dynasty_logo.png';

import { Modal, Button } from 'react-bootstrap';



const Navbar = () => {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [state, setState] = useState('');

    const mediaQ = useRef(window.matchMedia('(min-width: 46em) and (min-height: 36em)'));

    const checkMediaQ = () => {
        if (mediaQ.current.matches) setState('');
        else setState('mobile');
    };

    useEffect(() => {
        checkMediaQ();

        const currentMediaQ = mediaQ.current;

        currentMediaQ.addEventListener('change', checkMediaQ);

        return () => {
            currentMediaQ.removeEventListener('change', checkMediaQ);
        }
    }, []);

    return (
        <>
            <header className="main-nav">
                <div className="title-wrapper">
                    <img src={Logo} alt="Logo" />
                    <p className="title">Dynasty Tools</p>
                </div>

                <nav>
                    <ul>
                        <li className="link">
                            <NavLink to="/vote">
                                <ThumbsUp />
                                {state !== 'mobile' && 'Vote'}
                            </NavLink>
                        </li>
                        <li className="link">
                            <NavLink to="/rankings">
                                <TrendingUp />
                                {state !== 'mobile' && 'Rankings'}
                            </NavLink>
                        </li>
                        <li className="link">
                            <NavLink to="/calculator">
                                <Tool />
                                {state !== 'mobile' && 'Calculator'}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <button className="login-btn" onClick={handleShow}>
                <LogIn/>
                </button>
            </header>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Navbar;

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}