import React from 'react'

import './Video.scss'

const Video = ({ video }) => {
    return (
        <div className='video'>
            <h4 className='text-bold text-center'>Трейлер:</h4>
            <iframe
                width="100%" height="526"
                title="trailer"
                src={`https://www.youtube.com/embed/${video}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}

export default Video;