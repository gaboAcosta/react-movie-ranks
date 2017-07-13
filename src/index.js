
import React from 'react'
import ReactDom from 'react-dom'
import TopMovies from './components/topMovies.jsx'
import TopBar from './components/topBar.jsx'

class Main extends React.Component {
    render() {
        return (
            <div>
                <TopBar/>
                <div className="container">
                    <TopMovies/>
                </div>
                <div>
                    All data provided by: <a href="https://www.themoviedb.org" target="_blank">The Movie Database</a>
                </div>
            </div>
        )
    }
}

ReactDom.render(<Main/>, document.getElementById('app'))