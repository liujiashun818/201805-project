import React, { Component } from 'react';
import './index.less';
import logo from '@/images/logo.png';
import {TransitionGroup,CSSTransition} from 'react-transition-group';
export default class HomeHeader extends Component {
    state = {
        menuShow: false
    }
    changeCategory = (event)=>{
        event.target.getAttribute('data-category');//{cateogry:'react'}
        let category = event.target.dataset.category;
        this.props.changeCategory(category);
        this.setState({menuShow:false},()=>this.props.refreshLessons());
        
    }
    render() {
        let { menuShow } = this.state;
        return (
            <div className="home-header">
                <div className="home-logo">
                    <img src={logo} />
                    <div onClick={() => this.setState({ menuShow: !menuShow })}>
                        {
                            menuShow ? <i className="iconfont icon-guanbi"></i> : <i className="iconfont icon-uilist"></i>
                        }
                    </div>
                </div>
                <TransitionGroup>
                    {
                        menuShow && (
                            <CSSTransition
                                timeout={500}
                                classNames="fade"
                            >
                                <ul className="home-menus" onClick={this.changeCategory}>
                                    <li data-category="react" className={this.props.category=='react'?'active':''}>react</li>
                                    <li data-category="vue"  className={this.props.category=='vue'?'active':''}>vue</li>
                                </ul>
                            </CSSTransition>
                        )
                    }
                </TransitionGroup>
                
            </div>
        )
    }
}