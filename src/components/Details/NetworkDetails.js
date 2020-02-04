import React from 'react';
import Loader from 'react-loader-spinner'
import { FaLink, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import ErrorPage from '../Others/ErrorPage';
import NetworkSlider from '../Sliders/NetworkSlider';

const Details = (props) => {
    return (
        <div className='network'>
            <div className='pl-container network-wrapper'>
                <div className='pl-row align-items-center'>
                    <div className='pl-col-sm-7 pl-col-md-5 pl-col-lg-3'>
                        {
                            props.image !== "" ?
                                <img className='network__poster' src={`https://image.tmdb.org/t/p/h100/${props.image}`} alt='poster' />
                                :
                                <img className='network__poster' src={'https://kinomaiak.ru/wp-content/uploads/2018/02/noposter.png'} alt='poster' />
                        }
                    </div>
                    <div className='pl-col-sm-5 pl-col-md-7 pl-col-lg-9'>
                        <h4 className='text-right text-bold'>{props.countShow} shows</h4>
                    </div>
                </div>
                <div className='pl-row'>
                    <div className='pl-col'>
                        <ul className='network-list'>
                            <li>
                                <FaInfoCircle className='network-list__icon' />
                                {props.details.name}
                            </li>
                            <li>
                                <FaMapMarkerAlt className='network-list__icon' />
                                {props.details.headquarters ? props.details.headquarters : props.details.origin_country}
                            </li>
                            {
                                props.details.homepage !== "" ? (
                                    <li>
                                        <FaLink className='network-list__icon' />
                                        <a href={props.details.homepage} target='_blank' rel="noopener noreferrer">Homepage</a>
                                    </li>
                                )
                                    : null
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <Network tv={props.tv} />
        </div>
    )
}

const Network = (props) => {
    return (
        <>
            {
                props.tv.length ? (
                    <div className='slider-section'>
                        <h5 className='text-bold'>Known For (TV)</h5>
                        <NetworkSlider slider={props.tv} />
                    </div>
                ) : null
            }
        </>
    );
}

class NetworkDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            image: "",
            tv: [],
            countShow: 0,
            load: false,
            error: false
        };
    }

    componentDidMount() {
        this.getDetails();
        this.getImage();
        this.getTV();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.networkId !== prevProps.match.params.networkId) {
            this.setState({
                error: false,
                load: false,
                tv: []
            });
            this.getDetails();
            this.getImage();
            this.getTV();
        }
    }

    getDetails = () => {
        const DETAILS_URL = `https://api.themoviedb.org/3/network/${this.props.match.params.networkId}?api_key=3ac9e9c4b5b41ada30de1c0b1e488050`;
        fetch(DETAILS_URL).then(response => {
            if (!response.ok) {
                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        }).then(output => {
            this.setState({
                details: output
            });
        }).catch(error => {
            this.setState({
                load: true,
                error: true
            });
        });
    }

    getImage = () => {
        const IMG_URL = `https://api.themoviedb.org/3/network/${this.props.match.params.networkId}/images?api_key=3ac9e9c4b5b41ada30de1c0b1e488050`;
        fetch(IMG_URL).then(response => {
            if (!response.ok) {
                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        }).then(output => {
            this.setState({
                image: output.logos.length ? output.logos[0].file_path : "",
                load: true
            });
        }).catch(error => {
            this.setState({
                load: true,
                error: true
            });
        });
    }

    getTV = () => {
        for (let count = 1; count <= 3; count++) {
            const PAGE_URL = `https://api.themoviedb.org/3/discover/tv?page=${count}&with_networks=${this.props.match.params.networkId}&api_key=3ac9e9c4b5b41ada30de1c0b1e488050&language=ru`;
            fetch(PAGE_URL).then(response => {
                return response.json();
            }).then(output => {
                this.setState({
                    tv: this.state.tv.concat(output.results),
                    countShow: output.total_results
                });
            });
        }
    }

    render() {
        return (
            !this.state.load ?
                <div className='content loader'>
                    <Loader type="Oval" color="#444" height={80} width={80} />
                </div>
                :
                !this.state.error ?
                    <div className='content'>
                        <Details {...this.state} />
                    </div>
                    :
                    <ErrorPage />
        );
    }
}

export default NetworkDetails;