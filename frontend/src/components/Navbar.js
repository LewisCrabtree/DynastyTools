import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ThumbsUp, Tool, TrendingUp} from 'react-feather';
import { NavLink } from 'react-router-dom';
import AuthButton from './AuthButton';
import Logo from '../images/dynasty_logo.png';

const Navbar = () => {

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
        <header className="main-nav">
            <div className="title-wrapper">
                <img src={Logo} alt="Logo"/>
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
                            {state !== 'mobile' && 'Global Rankings'}
                        </NavLink>
                    </li>
                    <li className="link">
                        <NavLink to="/myrankings">
                            <TrendingUp />
                            {state !== 'mobile' && 'My Rankings'}
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
            <AuthButton />
        </header>
    )
}

export default Navbar;
