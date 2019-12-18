import React from "react";
import { render } from 'react-dom';
import Header from "./Header";

export default class List extends React.Component {
  
  constructor(props) {
      super(props);
      this.changeClick = this.changeClick.bind(this); 
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        firstTwoitems: [],
        date: this.props.match.params.date,
        click: false
      };
    }
  
    componentDidMount() {
     fetch("http://api.tvmaze.com/schedule?country=US&date=" + this.state.date)
        .then(res => res.json())        
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result,
              firstTwoitems: result.slice(0,2)
            });

          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
    
    currentDate (){
      let date = this.state.date;
      let formatdates = date.split('-');
      let currentyear = formatdates[0];
      let currentmonth = formatdates[1];
      let currentday = formatdates[2];

      let months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ].map((el, index) => {
        if((index) == currentmonth-1) return el;
      });

      return (
      <>
        {currentday} {months} {currentyear}  
      </>
      );
    }

    changeClick() {
      const { click } = this.state;
      if(!click) {
        this.setState({click: true});
      } else if(click) {
        this.setState({click: false});
      }
    }

    showItems() {
      const { firstTwoitems, items } = this.state;
      let numberRemainItems = items.length -2;
      if(!this.state.click) {
        return (
          <>
            { 
              firstTwoitems.map((item,index) => (           
                <div className="item" key={index}>
                    {item.show.image? <img  className="item-image" src={item.show.image.medium} /> : 
                      <img  className="item-image" src="http://static.tvmaze.com/uploads/images/medium_portrait/6/15080.jpg" /> }   
                    <div className="item-body">
                        <div className="item-body-header">
                          <h5 className="item-title">{item.show.name}</h5>
                          <div className="item-year">{item.show.premiered.split('-')[0]}</div>
                        </div>
                        <div className="sub-info-item">
                            <div className="sub-info-item-list">Season: {item.season}</div>
                            <div className="sub-info-item-list">Epizod: {item.number}</div>
                        </div>
                    </div>
                </div>                    
              ))                          
            }
            <div className="showitem">
              <button className='showitemButton' onClick={this.changeClick}>{numberRemainItems} more entries <i className="fas fa-chevron-down"></i></button>
            </div>            
          </>
        );
      } else if(this.state.click) {
        return (
          <>
            { 
              items.map((item,index) => (           
                <div className="item" key={index}>
                    {item.show.image? <img  className="item-image" src={item.show.image.medium} /> : 
                      <img  className="item-image" src="http://static.tvmaze.com/uploads/images/medium_portrait/6/15080.jpg" /> }   
                    <div className="item-body">
                        <div className="item-body-header">
                          <h5 className="item-title">{item.show.name}</h5>
                          <div className="item-year">{item.show.premiered.split('-')[0]}</div>
                        </div>
                        <div className="sub-info-item">
                            <div className="sub-info-item-list">Season: {item.season}</div>
                            <div className="sub-info-item-list">Epizod: {item.number}</div>
                        </div>
                    </div>
                </div>                    
              ))                          
            }
            <div className="showitem">
              <button className='showitemButton' onClick={this.changeClick}>Show main <i className="fas fa-chevron-up"></i></button>
            </div>
          </>          
        );
      }
    }

    render() {      
      const { error, isLoaded, items } = this.state;      
      if (error) {
        return <div>Ошибка: {error.message}</div>;
      } else if (!isLoaded) {
        return (
          <>
            <Header />
            <div className='dateBlock'>
                {this.currentDate()}
            </div>
            <div className='main'>Is loading...</div>
          </>
        )
      } else if(items.length == 0) {
        return (
          <>
            <Header />
            <div className='dateBlock'>
              {this.currentDate()}
            </div>
            <div className='noItems'>
              Ops, it seems there are no movies or TV shows on the current date. <br />
              Please choose a different date. 
            </div>
          </>
        )
      }else {
        return (
          <> 
            <Header />
              <div className='dateBlock'>
                {this.currentDate()}
              </div>
              {this.showItems()}
          </>
        );
      }
    }
  }
  
