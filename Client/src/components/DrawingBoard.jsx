import React, { useEffect, useRef, useState } from 'react';

const DrawingBoard = ({ initialData }) => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);
    const [drawMode, setDrawMode] = useState('pen'); // 'pen', 'line', 'rectangle', 'text'
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [text, setText] = useState('');
    const [isTextMode, setIsTextMode] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctxRef.current = ctx;
    }, []);

    const handleMouseDown = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        setStartPoint({ x: offsetX, y: offsetY });
        setIsDrawing(true);

        if (drawMode === 'text') {
            setIsTextMode(true);
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);

        if (drawMode === 'line' || drawMode === 'rectangle') {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctxRef.current = ctx;
        }
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;

        const { offsetX, offsetY } = e.nativeEvent;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (drawMode === 'pen') {
            ctx.lineTo(offsetX, offsetY);
            ctx.stroke();
        } else if (drawMode === 'line') {
            drawLine(ctx, startPoint.x, startPoint.y, offsetX, offsetY);
        } else if (drawMode === 'rectangle') {
            drawRectangle(ctx, startPoint.x, startPoint.y, offsetX, offsetY);
        }
    };

    const drawLine = (ctx, x1, y1, x2, y2) => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas for better drawing
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    };

    const drawRectangle = (ctx, x1, y1, x2, y2) => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas
        ctx.beginPath();
        ctx.rect(x1, y1, x2 - x1, y2 - y1);
        ctx.stroke();
        ctx.closePath();
    };

    const handleTextSubmit = (e) => {
        e.preventDefault();
        if (isTextMode) {
            const { x, y } = startPoint;
            const ctx = ctxRef.current;
            ctx.fillStyle = 'black';
            ctx.font = '16px Arial';
            ctx.fillText(text, x, y);
            setText('');
            setIsTextMode(false);
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div className="container mx-auto py-4">
            <div className="flex items-center space-x-4 mb-4">
                <button onClick={() => setDrawMode('pen')} className={`btn ${drawMode === 'pen' && 'btn-active'}`}>
                    Pen
                </button>
                <button onClick={() => setDrawMode('line')} className={`btn ${drawMode === 'line' && 'btn-active'}`}>
                    Line
                </button>
                <button onClick={() => setDrawMode('rectangle')} className={`btn ${drawMode === 'rectangle' && 'btn-active'}`}>
                    Rectangle
                </button>
                <button onClick={() => setDrawMode('text')} className={`btn ${drawMode === 'text' && 'btn-active'}`}>
                    Text
                </button>
                <button onClick={clearCanvas} className="btn">
                    Clear
                </button>
            </div>

            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="border border-gray-500"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            />

            {isTextMode && (
                <form onSubmit={handleTextSubmit} className="mt-2">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text"
                        className="input"
                    />
                    <button type="submit" className="btn ml-2">
                        Add Text
                    </button>
                </form>
            )}
        </div>
    );
};

export default DrawingBoard;
