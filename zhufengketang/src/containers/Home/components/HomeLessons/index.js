import React,{Component} from 'react';
import './index.less';
import Loading from '@/components/Loading';
import {Link} from 'react-router-dom';
export default class HomeLessons extends Component{
    render(){
        let {list,hasMore,loading} = this.props.lessons;
        return (
            <div className="home-lessons">
                <div className="all-lessons">
                    <i className="iconfont icon-kecheng-copy"></i>
                    <span>全部课程</span>
                </div>
                {
                    list.length>0?list.map((item,index)=>(
                        <Link key={index} to={{pathname:`/detail/${item.id}`,state:item}}>
                            <div key={index} className="lesson">
                                <img src={item.poster}/>
                                <p>{item.title}</p>
                                <p>{item.price}</p>
                            </div>
                        </Link>
                    )):<div className="no-data">暂无数据</div>
                }
                {
                    loading?<Loading/>:(!hasMore&& <div className="loading-more" >到底了</div>)
                }
            </div>
        )
    }
}