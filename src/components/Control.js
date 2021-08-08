import React, { Component } from 'react';
import Search from './Search'
import Sort from './Sort'

class Control extends Component {
    render() {
        return(
            <div className="search_sort mt-15">
                < Search />
                < Sort />
            </div>
        )
    }
}
export default Control ; 