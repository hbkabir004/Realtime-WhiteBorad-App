import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DrawingBoard from '../components/DrawingBoard';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingSpin from '../components/LoadingSpin.jsx';
import { deleteDrawingById, fetchDrawingById } from '../utils/api.js';

const SingleDrawing = () => {
    const { id } = useParams();
    const [drawing, setDrawing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // For navigation

    // Fetch the specific drawing on component mount
    useEffect(() => {
        const loadDrawing = async () => {
            try {
                const data = await fetchDrawingById(id);
                console.log('API Data', data);
                setDrawing(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadDrawing();
    }, [id]);

    // Handle Delete Action
    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this drawing?");
        if (confirmed) {
            try {
                await deleteDrawingById(id); // Assuming deleteDrawingById is implemented in the API utils
                alert("Drawing deleted successfully!");
                navigate('/drawings'); // Redirect to drawings list after deletion
            } catch (error) {
                alert("Failed to delete the drawing. Try again.");
            }
        }
    };

    // Handle Update Action
    const handleUpdate = () => {
        navigate(`/updateDrawings/${id}`); // Redirect to the update route
    };

    if (loading) {
        return <LoadingSpin />;
    }

    if (error) {
        return <ErrorMessage error={error} />;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">{drawing?.title}</h1>

            <DrawingBoard initialData={drawing} />

            {/* Buttons for Update and Delete */}
            <div className="mt-6 flex justify-center space-x-4">
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    onClick={handleDelete}>
                    Delete
                </button>

                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={handleUpdate}>
                    Update
                </button>
            </div>
        </div>
    );
};

export default SingleDrawing;
