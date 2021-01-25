import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import ErrorBoundry from '../components/ErrorBoundry';
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';
import './App.css';

function Hooks() {

    const [robots, setRobots] = useState([])
    const [searchfield, setSearchField] = useState('')
    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(robots => setRobots(robots))
    }, [])

    const onSearchChange = (event) => {
        setSearchField(event.target.value)
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })

    return !robots.length ? 
        <h1>Loading</h1> :
        (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
}

export default Hooks;