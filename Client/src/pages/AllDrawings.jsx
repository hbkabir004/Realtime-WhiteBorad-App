import { useEffect, useState } from 'react';
import DrawingList from '../components/DrawingList';
import LoadingSpin from '../components/LoadingSpin.jsx';
import { fetchDrawings } from '../utils/api.js'; // Import API function

const AllDrawings = () => {
    const [drawings, setDrawings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch drawings on component mount
    useEffect(() => {
        const loadDrawings = async () => {
            try {
                const data = await fetchDrawings();
                setDrawings(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadDrawings();
    }, []);

    if (loading) {
        return <LoadingSpin />;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">All Drawings</h1>
            {drawings.length > 0 ? (
                <DrawingList drawings={drawings} />
            ) : (
                <p>No drawings available</p>
            )}
        </div>
    );
};

export default AllDrawings;
