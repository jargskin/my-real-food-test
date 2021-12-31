import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = () => (
    <div className="row justify-content-center">
        <ReactLoading type={'spinningBubbles'} color={'#ffffff'} height={'20%'} width={'20%'} />
    </div>
);
export default Loading;