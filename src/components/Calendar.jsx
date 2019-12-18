import React from 'react';
import DayPicker from 'react-day-picker';
import image from '../img/tv.png';
import Header from './Header';


// Calendar
export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this); 
  }

  Navbar({
    onPreviousClick,
    onNextClick,
    className,
    localeUtils,
    month
  }) {
    const months = localeUtils.getMonths(); 
    const currentMonth = months[month.getMonth()];
    
    return (
    <>
      <Header />
      <div className ='HiBlock'>
        <img className='HiBlock-img' src={image} />
        <p className='text'>For a list of TV shows, please select the desired month and day.</p>
      </div>
      <div className={className}>        
        <div className='Arow rightrArow' onClick={() => onPreviousClick()}>
          {<i className="fas fa-angle-left"></i>}
        </div>
        <div className='calendarHeader'>{currentMonth}</div>
        <div className='Arow leftrArow' onClick={() => onNextClick()}>
          {<i className="fas fa-angle-right"></i>}
        </div>
      </div>
    </>
    );
  }

  handleDayClick(day) {
    let yearInFormat = day.getFullYear();
    let monthInFormat = (day.getMonth() < 10 ? '0' : '') + (+day.getMonth()+1);
    let dateInFormat = (day.getDate() < 10 ? '0' : '') + day.getDate();
    let fullDateInFormat = `${yearInFormat}-${monthInFormat}-${dateInFormat}`;
    window.location.assign(window.location.origin + '/list/'+ fullDateInFormat );    
  }

  render() {   
    return (
      <div>
        <DayPicker 
          onDayClick={this.handleDayClick}  
          navbarElement={this.Navbar}  
          captionElement = {<></>}
          weekdayElement =  {<></>}
          showOutsideDays
        />
      </div>
    );
  }
}



