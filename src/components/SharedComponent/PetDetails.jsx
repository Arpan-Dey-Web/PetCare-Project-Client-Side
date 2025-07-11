import React from 'react';
import { useParams } from 'react-router';

const PetDetails = () => {
    const params = useParams()
    console.log(params);
    return (
        <div>
            <h1>single pet</h1>
        </div>
    );
};

export default PetDetails;