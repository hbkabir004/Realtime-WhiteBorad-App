import React, { useEffect, useRef, useState } from 'react';

const DrawingBoard = () => {
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

    // Mouse event handlers
    const handleMouseDown = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        startDrawing(offsetX, offsetY);
    };

    const handleMouseMove = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        if (isDrawing && drawMode !== 'text') draw(offsetX, offsetY);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    // Touch event handlers (for mobile devices)
    const handleTouchStart = (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const { left, top } = canvasRef.current.getBoundingClientRect();
        startDrawing(touch.clientX - left, touch.clientY - top);
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const { left, top } = canvasRef.current.getBoundingClientRect();
        if (isDrawing && drawMode !== 'text') draw(touch.clientX - left, touch.clientY - top);
    };

    const handleTouchEnd = () => {
        setIsDrawing(false);
    };

    const startDrawing = (x, y) => {
        if (drawMode === 'text' && text.trim()) {
            addText(x, y, text);
            setText('');
            setIsTextMode(false);
            return;
        }
        setIsDrawing(true);
        setStartPoint({ x, y });
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(x, y);
    };

    const draw = (x, y) => {
        if (!isDrawing) return;

        if (drawMode === 'pen') {
            ctxRef.current.lineTo(x, y);
            ctxRef.current.stroke();
        } else if (drawMode === 'line') {
            drawLine(startPoint.x, startPoint.y, x, y);
        } else if (drawMode === 'rectangle') {
            drawRectangle(startPoint.x, startPoint.y, x, y);
        }
    };

    const drawLine = (x1, y1, x2, y2) => {
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas for better drawing
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(x1, y1);
        ctxRef.current.lineTo(x2, y2);
        ctxRef.current.stroke();
        ctxRef.current.closePath();
    };

    const drawRectangle = (x1, y1, x2, y2) => {
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas
        ctxRef.current.beginPath();
        ctxRef.current.rect(x1, y1, x2 - x1, y2 - y1);
        ctxRef.current.stroke();
        ctxRef.current.closePath();
    };

    const addText = (x, y, inputText) => {
        ctxRef.current.font = '20px Arial';
        ctxRef.current.fillStyle = 'black';
        ctxRef.current.fillText(inputText, x, y);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div className="container mx-auto py-4 px-4">
            <div className="flex flex-wrap items-center justify-center space-x-4 space-y-2 sm:space-y-0 mb-4">
                <button onClick={() => setDrawMode('pen')} className={`btn bg-black ${drawMode === 'pen' && 'btn-active'} sm:px-4 px-2`}>
                    Pen
                </button>
                <button onClick={() => setDrawMode('line')} className={`btn bg-blue-500 hover:bg-blue-700 ${drawMode === 'line' && 'btn-active'} sm:px-4 px-2`}>
                    Line
                </button>
                <button
                    onClick={() => setDrawMode('rectangle')}
                    className={`btn bg-purple-700 hover:bg-purple-900 ${drawMode === 'rectangle' && 'btn-active'} sm:px-4 px-2`}
                >
                    Rectangle
                </button>
                <button
                    onClick={() => {
                        setDrawMode('text');
                        setIsTextMode(true);
                    }}
                    className={`btn bg-gray-600 hover:bg-gray-800 ${drawMode === 'text' && 'btn-active'} sm:px-4 px-2`}
                >
                    Text
                </button>
                <button onClick={clearCanvas} className="btn bg-red-500 hover:bg-red-700 sm:px-4 px-2">
                    Clear
                </button>
            </div>

            {isTextMode && (
                <div className="my-10 flex justify-center">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text to add"
                        className="border p-2 rounded w-full max-w-xs"
                    />
                </div>
            )}

            <div className="flex justify-center">
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    className="border border-gray-500 w-full sm:w-[600px] h-[400px] sm:h-[450px] md:w-[800px] md:h-[600px]"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                />
            </div>
        </div>
    );
};

export default DrawingBoard;
