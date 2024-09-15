import { Link } from 'react-router-dom';

const DrawingList = ({ drawings }) => {
    return (
        <div className="flex flex-col space-y-4">
            {drawings.map((drawing) => (
                <Link
                    key={drawing._id}
                    to={`/drawing/${drawing._id}`}
                    className="p-4 border rounded-md hover:bg-gray-100"
                >
                    <h3 className="text-lg font-semibold">{drawing.title}</h3>
                </Link>
            ))}
        </div>
    );
};

export default DrawingList;
