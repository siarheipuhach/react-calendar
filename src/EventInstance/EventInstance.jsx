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
        const { event, intersections, day, daysInBoard } = this.props;
        const momentStartDate = moment(event['startDate']);
        const momentEndDate = moment(event['endDate']);

        const duration = momentEndDate.diff(momentStartDate, 'minutes');
        const decimalHours = parseFloat(momentStartDate.get('hour')) + parseFloat(momentStartDate.get('minute') / 60);

        const dayAmount = day ? day : 0;
        let leftPositionOneDay = intersections > 0 ?
            String(7 + intersections * 2) +'%'
            :
            ('7%');
        let leftPositionWeek = intersections > 0 ?
            String(64 + dayAmount*116 + intersections * 2) +'%'
            :
            String(64 + dayAmount*116) + '%';

        let leftPositionFourDays = intersections > 0 ?
            String(36 + dayAmount*116 + intersections * 2) +'%'
            :
            String(36 + dayAmount*116) + '%';

        let leftPosition = daysInBoard === 1 ?
            leftPositionOneDay
            :
            daysInBoard === 7 ? leftPositionWeek : leftPositionFourDays;

        return (
            <div className="eventContainer"
                 style={{
                     backgroundColor: this.getRandomColor(),
                     height: duration,
                     top: 60 + decimalHours * 60,
                     left: leftPosition,
                     zIndex: intersections,
                     opacity: 0.75
                 }}>
                <p className="eventName">{momentStartDate.format('HH:mm')} - {momentEndDate.format('HH:mm')} {event.name}</p>
            </div>
        );
    }

}
