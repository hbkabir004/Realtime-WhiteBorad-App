import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DrawingBoard from '../components/DrawingBoard';
import LoadingSpin from '../components/LoadingSpin.jsx';
import { fetchDrawingById } from '../utils/api.js';

const SingleDrawing = () => {
    const { id } = useParams();
    const [drawing, setDrawing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return <LoadingSpin />;
    }

    if (error) {
        return <div className="text-red-500 flex justify-center items-center my-10">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">{drawing?.title}</h1>
            <DrawingBoard initialData={drawing} />
        </div>
    );
};

export default SingleDrawing;
