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

    // TODO
    getTable = () => {
        const { daysInBoard, currentDay, week, moveDay } = this.props;

        return (
            <div className="divTable">
                <div className="divTableHeading">
                    <div className="divTableCell time-slot" width={105}><p>TIME</p></div>
                    {
                        range(daysInBoard).map(i => <div className="divTableCell" key={i}>
                            <p>
                                {daysInBoard === 1 ? currentDay : moment().day(i + 1 + week + moveDay).format("dd Do MMM YY")}
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

    currentTimePosition = () => {
        const hours = parseFloat(moment().format('HH'));
        const minutes = parseFloat(moment().format('mm'));
        return hours + minutes / 60;
    };

    render() {
        const { data, daysInBoard, week, moveDay } = this.props;

        let todayEvents = (currentDay) => groupBy(data.filter(dataObject => {
            return moment(dataObject.startDate).format("dd Do MMM YY") === currentDay
        }), 'startDate');

        // Get rid of hardcore
        const Table = <div  className="relativeTable">
            {this.getTable()}
            {
                range(daysInBoard).map(
                    (day, index) => <DayEvents
                        key={day}
                        currentDayEvents={
                            this.props.daysInBoard > 1
                            ?
                            todayEvents(moment().day(day+1+week+moveDay).format("dd Do MMM YY"))
                            :
                            todayEvents(this.props.currentDay)
                        }
                        day={index}
                        daysInBoard={this.props.daysInBoard}
                    />
                )
            }
            <hr className="currentTime" style={{top: 40 + (this.currentTimePosition() * 1440 / 24)}}/>
        </div>;

        return (
            <div className="main-board">
                <div className="main-container">

                    {Table}
                </div>
            </div>
        );
    }

}

