import React from 'react';
import './popupStyle.css';
class Popup extends React.Component {   
    constructor(props) {
        super(props);
        this.state = {
            status  : 0,
            link    :"/",
            type   :false,
        }         
     };
     
     componentDidMount(){
         this.setState({
             type:this.props.type
         })
        
     }
    render() {
       const popupStyle = {
           
                width: this.props.width + "px",
                height: this.props.height + "px"
        }
        
        // console.log(this.state.status)
        return(
          
            // popup outer container
            <div className="popup-container">
                {/* popup inner container */}
                <div className="popup-inner-div" style={popupStyle}>
                    {/* popup title div */}
                    <div className = "popup-title">
                        <p id="popup-title"> {this.props.title}</p>
                    </div>
                    {/* popup body */}
                    <div className ="popup-body">
                        {this.props.body}
                    </div>
                    {
                    // this.props.status == 1 ?
                    this.props.type === 'normal'  ? null
                    :this.props.type === 'confirmation'  ?
                        <div className = "popup-btn">
                            <button className="btn cancel-btn" onClick={this.props.cancel} >NO</button>
                            <button className="btn yes-btn" onClick={this.props.yes}>YES</button>
                        </div>
                    : this.props.type === 'Alert'  ?
                        <div className = "popup-btn">
                            <button className="btn yes-btn" onClick={this.props.yes}>x</button>
                        </div>
                    : this.props.type === "Submit" ?
                        <div className = "popup-btn">
                        <button className="btn yes-btn" onClick={this.props.yes}>Submit</button>
                        </div> : null }
                </div>
               
            </div>
        )
    }
}

export default Popup;