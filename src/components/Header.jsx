import React from "react";

export default class Header extends React.Component {

    render(){
        if(window.location.pathname != '/') {
            return(
                <div className='header'>
                    <div className='backhome'>
                        <a href= {window.location.origin + '/'}>
                            <i className="fas fa-chevron-left"></i>
                        </a>
                    </div>
                    <div className='header-title'>Super Film</div>
                </div>
            );
        } else {
                return(
                    <div className='header'>
                        <div className='header-title'>Super Film</div>
                    </div>
                );
        }
    }
}
