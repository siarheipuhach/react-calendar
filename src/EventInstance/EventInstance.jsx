import React, { Component } from 'react';
import moment from 'moment';

import './EventInstance.css';


export default class EventInstance extends Component {

    getRandomColor(){
        let letters = 'BCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }

    render() {
        const { event, intersections, eventsCount, instance, day } = this.props;
        const momentStartDate = moment(event['startDate']);
        const momentEndDate = moment(event['endDate']);

        const duration = momentEndDate.diff(momentStartDate, 'minutes');
        const decimalHours = parseFloat(momentStartDate.get('hour')) + parseFloat(momentStartDate.get('minute') / 60);

        // TODO Get rid of magic constants and do style is flexible
        const dayAmount = day ? day : 0;
        const fourDaysLeft = this.props.daysInBoard === 4 ? 150 : 0;
        return (
            <div className="eventContainer"
                 style={{
                     backgroundColor: this.getRandomColor(),
                     height: duration,
                     top: 60 + decimalHours * 60,
                     left: intersections > 0
                         ?
                         (105+dayAmount*193 + fourDaysLeft*(dayAmount) ) + intersections * 20 + (
                             (1500 / eventsCount)-(105 + intersections * 20)
                         ) * (instance - 1)
                         :
                         (105+dayAmount*193 + fourDaysLeft*(dayAmount)),
                     zIndex: intersections,
                     opacity: 0.75
                 }}>
                <p className="eventName">{momentStartDate.format('HH:mm')} - {momentEndDate.format('HH:mm')} {event.name}</p>
            </div>
        );
    }

}
