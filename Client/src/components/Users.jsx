import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Users = () => {
    const users = useLoaderData();
    const handleDelete = _id => {
        console.log('Delete', _id);
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert('Deleted Successfully')
                }
            })
    }

    return (
        <div>
            <h1>User Collections</h1>
            <div>
                <h2>Total Users: {users.length}</h2>
                {
                    users.map(user => <p key={user._id}>{user.name}: {user.email}{`\t`}
                        <button onClick={() => handleDelete(user._id)}>x</button>
                    </p>)
                }
            </div>
        </div >
    );
};

export default Users;