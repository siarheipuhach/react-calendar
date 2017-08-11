import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { groupBy, range } from 'lodash';

import DayEvents from '../DayEvents/DayEvents'
import './CalendarBoard.css';


const hours = range(25);

export default class CalendarBoard extends Component {
    static propTypes = {
        daysInBoard: PropTypes.number.isRequired,
    };

    getTable = () => {
        const { daysInBoard, currentDay, moveDay } = this.props;

        return (
            <div className="divTable">
                <div className="divTableHeading">
                    <div className="divTableCell time-slot" width={105}><p>TIME</p></div>
                    {
                        range(daysInBoard).map(i => <div className="divTableCell" key={i}>
                            <p>
                                {daysInBoard === 1 ? currentDay : moment().day(i + 1 + moveDay).format("dd Do MMM YY")}
                            </p>
                        </div>)
                    }
                </div>
                <div className="divTableBody">
                    {hours.map((number, index) =>
                        <div className="divTableRow" key={number}>
                            <div className="divTableCell time-slot" >{number}:00</div>
                            {
                                range(daysInBoard).map(i => <div className="divTableCell" key={i}
                                style={{width: String(93/daysInBoard)+'%'}}>{}</div>)
                            }
                        </div>
                    )}
                </div>
            </div>
        );
    };

    todayEvents = currentDay => groupBy(this.props.data.filter(dataObject => {
        return moment(dataObject.startDate).format("dd Do MMM YY") === currentDay
    }), 'startDate');

    currentTimePosition = () => {
        const now = moment();
        const hours = parseFloat(now.format('HH'));
        const minutes = parseFloat(now.format('mm'));
        return hours + minutes / 60;
    };

    render() {
        const { daysInBoard, moveDay, currentDay } = this.props;

        const table = (
            <div  className="relativeTable">
                {this.getTable()}
                {
                    range(daysInBoard).map(
                        (day, index) => <DayEvents
                            key={day}
                            currentDayEvents={
                                daysInBoard > 1
                                ?
                                this.todayEvents(moment().day(day+1+moveDay).format("dd Do MMM YY"))
                                :
                                this.todayEvents(currentDay)
                            }
                            day={index}
                            daysInBoard={daysInBoard}
                        />
                    )
                }
                <hr className="currentTime" style={{top: 40 + (this.currentTimePosition() * 1440 / 24)}}/>
            </div>
        );

        return (
            <div className="main-board">
                <div className="main-container">
                    {table}
                </div>
            </div>
        );
    }

}

