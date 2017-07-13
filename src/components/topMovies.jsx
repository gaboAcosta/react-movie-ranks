
import React from 'react'
import { Thumbnail, Row, Col, Pagination, DropdownButton, MenuItem } from 'react-bootstrap';
import request from 'superagent'
import { API_KEY } from '../config'

class TopMovies extends React.Component {
    constructor(props) {
        const currentYear = parseInt(new Date().getFullYear(), 10)
        super(props)
        this.moviesUrl = 'https://api.themoviedb.org/3/discover/movie'
        this.genreUrl = 'https://api.themoviedb.org/3/genre/movie/list'
        this.apiKey = API_KEY
        this.years = this.getYears()
        this.language = 'en-US'
        this.sort = 'popularity.desc'
        this.state = {
            movies: [],
            page: 1,
            totalPages: 0,
            genre: 35,
            genres: [],
            year: currentYear,
        }
        this.like = this.like.bind(this)
        this.changePage = this.changePage.bind(this)
        this.changeGenre = this.changeGenre.bind(this)
        this.changeYear = this.changeYear.bind(this)
    }

    getYears(){
        const years = []
        const currentYear = parseInt(new Date().getFullYear(), 10)
        const attempts = 0
        for(let i = currentYear; i >= 1960; i--) {
            years.push(i)
            if(attempts > 100) return;
        }
        return years
    }

    componentWillMount(){
        const { year } = this.state
        const { page } = this.state
        const { genre } = this.state

        return this.fetchGenres()
            .then(({ genres }) => {

                return this.fetchMovies({ page, genre, year })
                    .then(({ movies, totalPages}) => {

                        return this.setState({
                            movies,
                            totalPages,
                            genres,
                        })

                    })
            })
    }

    like() {

        this.setState({
            likes: this.state.likes + 1
        })

    }

    fetchGenres(){
        return request
            .get(this.genreUrl)
            .query({
                api_key: this.apiKey,
            })
            .then((res) => {
                const response = res.body
                const { genres } = response
                return {
                    genres,
                }
            }, (err)=> console.log(err))
    }

    fetchMovies({ page, genre, year }){
        return request
            .get(this.moviesUrl)
            .query({
                api_key: this.apiKey,
                language: this.language,
                sort_by: this.sort,
                page,
                with_genres: genre,
                year,
            })
            .then((res) => {
                const response = res.body
                return {
                    movies: response.results,
                    totalPages: response.total_pages,
                }
            }, (err)=> console.log(err))
    }

    changePage(page) {
        const { genre } = this.state
        const { year } = this.state
        return this.fetchMovies({ page, genre, year })
            .then(({ movies, totalPages}) => {
                return this.setState({
                    page,
                    movies,
                    totalPages
                })
            })
    }

    changeGenre(genre){

        const { page } = this.state
        const { year } = this.state

        return this.fetchMovies({ page, genre, year })
            .then(({ movies, totalPages}) => {
                return this.setState({
                    movies,
                    totalPages,
                    genre,
                })
            })
    }

    changeYear(year){

        const { page } = this.state
        const { genre } = this.state

        return this.fetchMovies({ page, genre, year })
            .then(({ movies, totalPages}) => {
                return this.setState({
                    movies,
                    totalPages,
                    year,
                })
            })
    }

    render() {
        const { movies } = this.state
        const { genres } = this.state
        const { years } = this

        const items = this.state.totalPages
        const currentPage = this.state.page

        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <Pagination
                            bsSize="small"
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            items={items}
                            maxButtons={5}
                            activePage={currentPage}
                            onSelect={this.changePage} />
                        <DropdownButton title={'Genre'} key={'genre-drop'} id={'genre-select'} onSelect={this.changeGenre}>
                            {
                                genres.map((genre, index) => {
                                    return (
                                        <MenuItem key={index} eventKey={genre.id}>{genre.name}</MenuItem>
                                    )
                                })
                            }
                        </DropdownButton>

                        <DropdownButton title={'Year'} key={'year-drop'} id={'year-select'} onSelect={this.changeYear}>
                            {
                                years.map((year, index) => {
                                    return (
                                        <MenuItem key={index} eventKey={year}>{year}</MenuItem>
                                    )
                                })
                            }
                        </DropdownButton>
                    </Col>
                </Row>
                <Row>
                    {
                        movies.map((movie, index) => {
                            const imageSource = `http://image.tmdb.org/t/p/w92/${movie.poster_path}`
                            const title = movie.original_title
                            const searchTerm = encodeURI(title)
                            return (
                                <Col xs={12} md={4} key={index}>
                                    <a href={`https://thepiratebay.org/search/${searchTerm}/0/99/0`} target="_blank">
                                        <Thumbnail src={imageSource} alt="242x200">
                                            <div style={{width: '100%', textAlign: 'center'}}>
                                                {title}
                                            </div>
                                        </Thumbnail>
                                    </a>
                                </Col>
                            )
                        })
                    }

                </Row>
                <Row>
                    <Col xs={12}>
                        <Pagination
                            bsSize="small"
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            items={items}
                            maxButtons={5}
                            activePage={currentPage}
                            onSelect={this.changePage} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default TopMovies