import React from "react";
import ReactLoading from 'react-loading';

const Loading = ({height, width}) => {
    return (
        <ReactLoading type={'bubbles'} color={'#a97af9'} height={height || '5%'} width={width || '5%'} />
    )
}

export default Loading;
