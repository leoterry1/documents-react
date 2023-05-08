import React from 'react';
import { SCREENS } from './constants';
import { ListGroup } from 'react-bootstrap';

const Navigation = () => {
    const listItems = SCREENS.map(screen => {
        return (
            <ListGroup variant="flush">
                <ListGroup.Item h1>{screen.name}</ListGroup.Item>
                {screen.routes.map(route => {
                    return (<ListGroup.Item ><a href={route.url}>{route.title}</a></ListGroup.Item>)
                })}
            </ListGroup>
        )
    })
    return (
        <div style={{ margin: 20 }}>{listItems}</div>
    )
};

export default Navigation;
