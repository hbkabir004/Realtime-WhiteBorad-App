const API_BASE_URL = 'https://whiteboard-app-server.vercel.app/api/drawings';

// Helper function to handle responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  return await response.json();
};

// Fetch all drawings
export const fetchDrawings = async () => {
  const response = await fetch(`${API_BASE_URL}`);
  return handleResponse(response);
};

// Fetch a specific drawing by ID
export const fetchDrawingById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  return handleResponse(response);
};

// Create a new drawing
export const createDrawing = async (drawingData) => {
  const response = await fetch(`${API_BASE_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(drawingData),
  });
  return handleResponse(response);
};

// Update a drawing by ID
export const updateDrawing = async (id, drawingData) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(drawingData),
  });
  return handleResponse(response);
};

// Delete a drawing by ID
export const deleteDrawing = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};
