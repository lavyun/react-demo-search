import React,{Component} from 'react'
import {render} from 'react-dom'

class LogoSelect extends Component{
    constructor(props){
        super(props);
        this.state = {
            logos: [require('../assets/images/360_logo.png'),require('../assets/images/baidu_logo.png'),require('../assets/images/sougou_logo.png')],
            selectIndex: 0,
            showLogo: false
        }
    }

    //处理logo选择
    handleLogoSelect(ev){
        var index = parseInt(ev.target.getAttribute('data-index'));
        this.setState({
            selectIndex: index,
            showLogo: false
        },function(){
            this.props.onLogoChange(index)
        })
    }

    //显示logo列表
    showLogoList(){
        this.setState({
            showLogo: true
        })
    }

    render() {
        var _state = this.state,
            logos = _state.logos;

        const Li= this.state.logos.map((logo, index)=>{
            return (
                <div className="logo-list-item"
                     key={index}>

                    <img src={logo} onClick={this.handleLogoSelect.bind(this)} data-index={index}/>
                </div>
            )
        });

        return (
            <div className="logo-panel">
                <div className="logo-display">
                    <img src={logos[this.state.selectIndex]}/>
                </div>
                <span className="logo-select-arrow" onClick={this.showLogoList.bind(this)}></span>
                <div className="logo-list" style={{display: this.state.showLogo? 'block': 'none'}}>
                    {Li}
                </div>
            </div>
        )
    }
}

export default LogoSelect
