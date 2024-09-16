import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DrawingList from '../components/DrawingList';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingSpin from '../components/LoadingSpin.jsx';
import { deleteDrawingById, fetchDrawings } from '../utils/api.js';

const AllDrawings = () => {
    const [drawings, setDrawings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch drawings on component mount
    useEffect(() => {
        const loadDrawings = async () => {
            try {
                const data = await fetchDrawings();
                console.log("ALL DATA", data);

                setDrawings(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadDrawings();
    }, []);

    // Delete drawing by id
    const deleteDrawing = async (id) => {
        if (window.confirm('Are you sure you want to delete this drawing?')) {
            try {
                await deleteDrawingById(id);
                // Remove the drawing from the state
                setDrawings(drawings.filter(drawing => drawing._id !== id));
            } catch (error) {
                console.error('Error deleting drawing:', error);
                setError('Failed to delete drawing.');
            }
        }
    };

    if (loading) {
        return <LoadingSpin />;
    }

    if (error) {
        return <ErrorMessage error={error} />
    }


    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">All Drawings</h1>

            {drawings.length > 0 ? (
                <DrawingList drawings={drawings} onDelete={deleteDrawing} />
            ) : (
                <p>No drawings available</p>
            )}

            {/* New Drawing Button */}
            <Link to="/new-drawing">
                <button className="my-8 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    New Drawing
                </button>
            </Link>
        </div>
    );
};

export default AllDrawings;
