import React from 'react';
import error from '../../img/error.png';

const ErrorPage = () => (
    <div className='content'>
        <div className='pl-container'>
            <div className='error'>
                <div className='error-wrapper'>
                    <img className='error-wrapper__img' src={error} alt="error" />
                    <h2 className='error-wrapper__name'>Ошибка!</h2>
                </div>
            </div>
        </div>
    </div>
)

export default ErrorPage;