import React, { Component } from 'react';

import EventInstance from '../EventInstance/EventInstance'
import './DayEvents.css';


export default class DayEvents extends Component {

    findIntersectionNumber = (event) => {
        let intersections = 0;
        const { currentDayEvents } = this.props;
        Object.keys(currentDayEvents).map(
            (key) => {
                if (key < event['startDate']){
                    currentDayEvents[key].map(previousEvent => {
                        if (previousEvent['endDate'] > event['startDate']){
                            intersections += 1;
                        }
                    });
                }
            }

        );
        return intersections;
    };

    render() {
        const { day, currentDayEvents, daysInBoard } = this.props;
        const elementWidth = daysInBoard > 1 ? String(80/daysInBoard) + '%': '99%';
        return ( <div className="currentDayEvents" style={{width: elementWidth}}>
                {Object.keys(currentDayEvents).map((key, index) => {
                    let instance = 0;
                    const eventsCount = currentDayEvents[key].length;
                    return (
                        <div className="currentDayEventContainer" key={index}>
                            {currentDayEvents[key].map((event) => {
                                instance += 1;
                                return <EventInstance
                                    daysInBoard={daysInBoard}
                                    day={day}
                                    key={index}
                                    event={event}
                                    intersections = {this.findIntersectionNumber(event)}
                                    instance = {instance}
                                    eventsCount = {eventsCount}
                                />
                            })}
                        </div>
                    )
                })}
            </div>
        );
    }

}
