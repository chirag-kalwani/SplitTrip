import React from 'react';

interface ProfileWithIdProps {
    params: any;
}

function ProfileWithId({params}: ProfileWithIdProps) {
    const id = params['id'];
    return (
        <h1>
            Profile with id: {id}
        </h1>
    );
}

export default ProfileWithId;