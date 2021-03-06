import React from 'react';

const BackArrow = () => {
    return <div>
        <svg xmlns="http://www.w3.org/2000/svg" style={{
            position: "fixed",
            width: "25px",
            height: "25px",
            cursor: "pointer",
            color: "gray",
        }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
    </div>;
};

export default BackArrow;
