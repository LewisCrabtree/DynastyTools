import React, { Component }  from 'react';
import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { GET_RANKINGS } from '../constants/api-urls';
import ButtonGroup from "../components/ButtonGroup";
import PlayerCard from "../components/PlayerCard";
import { Grid, List } from "react-feather";

//Router stuff
import { useSearchParams } from 'react-router-dom';

const RankingsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [error, setError] = useState(null);
    const [pos, setPos] = useState(searchParams.get('position'));
    const [rankings, setPlayers] = useState();
    const [layout, setLayout] = useState('list');

    const POSITION_BUTTONS = [{label: 'All', value: 'All'}, 
                                {label: 'QB', value: 'QB'},
                                {label: 'RB', value: 'RB'},
                                {label: 'WR', value: 'WR'},
                                {label: 'TE', value: 'TE'}];

    const LAYOUT_BUTTONS = [
        {label: (<List />), value: 'list'},
        {label: (<Grid />), value: 'grid'}
    ]

    const getRankings = useCallback(() => {
        axios.get(`${GET_RANKINGS}${'?username=Global'}${pos ? `&position=${pos}` :''}`).then(res => {
            setPlayers(res.data);
        }).catch(() => {
            console.log("err")
            setError('Oops! It looks like we\'re having trouble gathering the rankings. Please try again later.');
        });
    }, [pos]);

    useEffect(() => {
        getRankings();
    }, [pos, getRankings])

    useEffect(() => {
        setPos(searchParams.get('position'));
    }, [searchParams])

    return (
        <section className={`rankings-section`}>
            <h1>Rankings</h1>
            <p className="caption">Ranking {pos ? pos : 'All'} Players</p>

            <div className="filters">
                <ButtonGroup 
                    buttons={POSITION_BUTTONS} 
                    defaultValue="All" 
                    onChange={(pos) => setSearchParams({...searchParams, position: pos})} 
                    label="Select A Position" 
                    value={pos ? pos : 'All'}
                />
            </div>

            <ButtonGroup 
                buttons={LAYOUT_BUTTONS} 
                defaultValue="list" 
                onChange={setLayout}
                className="layout-btn-group"
            />

            {
                (error && ( <h2>{error}</h2>)) 
                ||
                (rankings &&
                    (layout === 'grid' ?
                    <div className={`players-wrapper ${layout}`}>
                        { rankings.map((ranking, i) => <PlayerCard player={ranking} showFullDetails key={ranking.id} animateOnChange={false} placement={i + 1}/>) }
                    </div> :
                    <div className="table-wrapper">
                        <table className="players-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Team</th>
                                    <th>Rating</th>
                                    <th>Position</th>
                                    <th>Age</th>
                                    <th>Drafted</th>
                                </tr>
                            </thead>
                            <tbody>
                                { rankings.map((ranking, i) => (
                                    <tr key={ranking.id}>
                                        <td>{i + 1}</td>
                                        <td>{ranking.Player.Name}</td>
                                        <td>{ranking.Player.Team}</td>
                                        <td>{ranking.Rating.toFixed(0)}</td>
                                        <td>{ranking.Player.Position}</td>
                                        <td>{ranking.Player.Age.toFixed(0)}</td>
                                        <td>{ranking.Player.Draftyear}</td>
                                    </tr>
                                )) }
                            </tbody>
                        </table>
                    </div>)
                ) 
                || 
                <div id="matchup-loader">
                    <p>Loading...</p>
                </div>
            }
        </section>
    )
}

export default RankingsPage;