import React,{Component} from 'react';
import './index.less';
import {withRouter} from 'react-router-dom';
class NavHeader extends Component{
    render(){
        return (
            <div className="navheader">
              <i 
              onClick={()=>this.props.history.goBack()}
              className="iconfont icon-fanhui"></i>
                {this.props.title}
            </div>
        )
    }
}
export default withRouter(NavHeader);