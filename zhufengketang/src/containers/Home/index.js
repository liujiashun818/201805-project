import React,{Component,Fragment} from 'react';
import HomeHeader from './components/HomeHeader';
import HomeSwipe from './components/HomeSwipe';
import {connect} from 'react-redux';
import actions from '@/store/actions/home';
import HomeLessons from './components/HomeLessons';
import './index.less'
import {loadMore,downReferesh} from '@/utils';
//this.props= {...state.home,...actions}
@connect(state=>state.home,actions)
export default class Home extends Component{
    componentDidMount(){
        this.props.getSliders();
        this.props.getLessons();
        loadMore(this.mainContent,this.props.getLessons);
        downReferesh(this.mainContent,this.props.refreshLessons);
    }
    render(){
        let {category,changeCategory,sliders,lessons,refreshLessons} = this.props;
        return (
            <Fragment>
                <HomeHeader
                   category={category}
                   changeCategory={changeCategory}
                   refreshLessons={refreshLessons}
                />
                <div className="main-content" ref={ref=>this.mainContent=ref}>
                  <HomeSwipe
                    sliders={sliders}
                  />
                  <HomeLessons
                    lessons={lessons}
                    getLessons={this.props.getLessons}
                  />
                </div>
            </Fragment>
        )
    }
}
//export default connect(state=>state.home,actions)(Home)