import React, { useRef, useEffect, useState } from 'react';
import { CloseIcon } from '../constants';
import { useTheme } from './ThemeContext';

interface ChatCanvasProps {
    onClose: () => void;
    onSend: (imageData: string) => void;
}

const ChatCanvas: React.FC<ChatCanvasProps> = ({ onClose, onSend }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(5);
    const { getThemeClasses } = useTheme();
    const themeClasses = getThemeClasses();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Adjust for device pixel ratio for sharper drawing
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        const context = canvas.getContext('2d');
        if (!context) return;

        context.scale(dpr, dpr);
        context.lineCap = 'round';
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        contextRef.current = context;
    }, []);
    
    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.strokeStyle = color;
            contextRef.current.lineWidth = lineWidth;
        }
    }, [color, lineWidth]);
    
    const getCoords = (event: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0};

        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;

        if ('touches' in event) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        return {
            x: clientX - rect.left,
            y: clientY - rect.top,
        };
    };

    const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
        if (!contextRef.current) return;
        const { x, y } = getCoords(event);
        contextRef.current.beginPath();
        contextRef.current.moveTo(x, y);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        if (!contextRef.current) return;
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = (event: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || !contextRef.current) return;
        const { x, y } = getCoords(event);
        contextRef.current.lineTo(x, y);
        contextRef.current.stroke();
    };

    const handleSend = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const dataUrl = canvas.toDataURL('image/png');
            onSend(dataUrl);
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        if (canvas && context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    const colors = ['#000000', '#EF4444', '#3B82F6', '#22C55E', '#F97316', '#A855F7'];

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="font-semibold">Chat Canvas</h2>
                    <div className="flex items-center space-x-2">
                        {colors.map(c => (
                            <button key={c} onClick={() => setColor(c)} style={{ backgroundColor: c }} className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-blue-500' : 'border-transparent'}`}></button>
                        ))}
                        <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-8 h-8 p-0 border-none bg-transparent" />
                        <button onClick={clearCanvas} className="text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-600">Clear</button>
                    </div>
                    <button onClick={onClose}><CloseIcon className="w-6 h-6" /></button>
                </header>
                <div className="flex-grow bg-gray-100 dark:bg-gray-700">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full cursor-crosshair"
                        onMouseDown={startDrawing}
                        onMouseUp={finishDrawing}
                        onMouseMove={draw}
                        onMouseLeave={finishDrawing}
                        onTouchStart={startDrawing}
                        onTouchEnd={finishDrawing}
                        onTouchMove={draw}
                    />
                </div>
                 <footer className="p-3 bg-gray-50 dark:bg-gray-900/50 flex justify-end">
                    <button 
                        onClick={handleSend} 
                        className={`px-4 py-2 rounded text-white ${themeClasses.bg} ${themeClasses.hoverBg}`}
                        style={themeClasses.style}
                    >
                        Send Drawing
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ChatCanvas;