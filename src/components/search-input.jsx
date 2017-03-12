import React, { Component } from 'react'
import {render} from 'react-dom'
import $ from 'jquery'

import LogoSelect from './logo-select'

class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            showList: [],
            listIndex: 0,
            searchSrcs: ['https://www.so.com/s?ie=utf-8&shb=1&src=360sou_newhome&q=', 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=', 'https://www.sogou.com/web?query='],
            searchSrc: 'https://www.so.com/s?ie=utf-8&shb=1&src=360sou_newhome&q='
        }
    }

    //处理输入
    handleInput(ev) {
        var _this = this;
        _this.setState({
            keyword: ev.target.value
        }, function () {
            //jsonp获取数据
            $.ajax({
                url: 'https://sug.so.360.cn/suggest?word=' + this.state.keyword + '&encodein=utf-8&encodeout=utf-8',
                type: 'get',
                dataType: "jsonp"
            }).done(function (data) {
                var list = data.s;
                _this.setState({
                    showList: list
                })
            })
        })
    }

    //处理鼠标hover
    handleMouseSelect(ev) {
        var index = ev.target.getAttribute('data-index');
        this.setState({
            listIndex: parseInt(index)
        })
    }

    //处理点击列表
    handleSelectClick(ev) {
        this.setState({
            keyword: ev.target.innerText
        }, function () {
            this.refs.input.value = this.state.keyword;
            setTimeout(()=> {
                this.handleSearch();
            }, 50);
        })
    }

    //处理点击清除按钮
    handleClearClick() {
        this.setState({
            keyword: '',
            showList: []
        });
        this.refs.input.value = '';
    }

    //处理搜索
    handleSearch() {
        var _state = this.state;
        window.location.href = _state.searchSrc + _state.keyword;
    }

    //处理Enter键
    handleKeyEnter(ev) {
        var keyCode = ev.keyCode;
        switch (keyCode) {
            case 13:
                this.handleSearch();
                break;
            case 38:
                this.selectUpAndDown(ev, keyCode);
                break;
            case 40:
                this.selectUpAndDown(ev, keyCode);
                break;

        }
    }

    //上下键选择列表项
    selectUpAndDown(ev, keycode) {
        ev.preventDefault();
        var _state = this.state;

        var stateCb = function () {
            this.setState({
                keyword: this.state.showList[this.state.listIndex]
            }, function () {
                this.refs.input.value = this.state.keyword;
            });
        };


        if (keycode === 38) {
            this.setState({
                listIndex: _state.listIndex == 0 ? 9 : --_state.listIndex
            }, stateCb);
        } else if (keycode === 40) {
            this.setState({
                listIndex: _state.listIndex == 9 ? 0 : ++_state.listIndex
            }, stateCb);
        }
    }

    //logo选择与父组件通信
    onLogoChange(index) {
        this.setState({
            searchSrc: this.state.searchSrcs[index]
        })
    }

    render() {
        var _this = this;
        var _state = this.state;

        const Li = _state.showList.map((value, index)=>
            <li key={ index }
                data-index={ index }
                className={ this.state.listIndex == index? 'is-select' : '' }
                onMouseOver={ this.handleMouseSelect.bind(_this) }
                onClick={ this.handleSelectClick.bind(_this) }>
                { value }
            </li>
        );

        return (
            <div className="search">

                <LogoSelect onLogoChange={this.onLogoChange.bind(this)}/>

                <div className="search-panel">
                    <input type="text" className="search-input"
                           onChange={this.handleInput.bind(_this)}
                           onKeyDown={this.handleKeyEnter.bind(_this)}
                           ref="input"
                    />
                    <span className="search-clearinput" onClick={ this.handleClearClick.bind(_this) }>&times;</span>
                    <button className="search-btn" onClick={ this.handleSearch.bind(_this)}>搜一下</button>
                </div>

                <div className="search-list">
                    <ul>{
                        Li
                    }</ul>
                </div>

            </div>
        )
    }
}

export default SearchInput;
