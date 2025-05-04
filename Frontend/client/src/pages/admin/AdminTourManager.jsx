import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Trash2, Pencil } from 'lucide-react';

const AdminTourManager = () => {
  const [tours, setTours] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [editingTourId, setEditingTourId] = useState(null);
  const [newTour, setNewTour] = useState({
    name: '',
    description: '',
    durationDays: '',
    priceLKR: '',
    region: '',
    category: '',
    imageUrls: [],
    stops: [],
  });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tours');
      setTours(res.data);
    } catch (err) {
      console.error('Error fetching tours:', err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const imageUrl = res.data.imageUrl;
      setNewTour((prev) => ({ ...prev, imageUrls: [imageUrl] }));
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('❌ Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTourId) {
        await axios.put(`http://localhost:5000/api/tours/${editingTourId}`, newTour);
        alert('✅ Tour updated!');
      } else {
        await axios.post('http://localhost:5000/api/tours', newTour);
        alert('✅ Tour added!');
      }

      resetForm();
      fetchTours();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to submit tour');
    }
  };

  const resetForm = () => {
    setNewTour({
      name: '',
      description: '',
      durationDays: '',
      priceLKR: '',
      region: '',
      category: '',
      imageUrls: [],
      stops: [],
    });
    setEditingTourId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tour?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/tours/${id}`);
      setTours(tours.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete tour');
    }
  };

  const handleEdit = (tour) => {
    setNewTour({ ...tour });
    setEditingTourId(tour._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🧳 Tour Package Manager</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-lg mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Tour Name" className="border rounded-lg p-2 w-full"
            value={newTour.name}
            onChange={(e) => setNewTour({ ...newTour, name: e.target.value })} required
          />
          <input type="number" placeholder="Duration (days)" className="border rounded-lg p-2 w-full"
            value={newTour.durationDays}
            onChange={(e) => setNewTour({ ...newTour, durationDays: e.target.value })} required
          />
          <input type="number" placeholder="Price (LKR)" className="border rounded-lg p-2 w-full"
            value={newTour.priceLKR}
            onChange={(e) => setNewTour({ ...newTour, priceLKR: e.target.value })} required
          />
          <input type="text" placeholder="Region" className="border rounded-lg p-2 w-full"
            value={newTour.region}
            onChange={(e) => setNewTour({ ...newTour, region: e.target.value })} />
          <input type="text" placeholder="Category" className="border rounded-lg p-2 w-full"
            value={newTour.category}
            onChange={(e) => setNewTour({ ...newTour, category: e.target.value })} />
          <div className="flex flex-col">
            <label className="mb-1 text-sm">Upload Image</label>
            <input type="file" accept="image/*" className="border rounded-lg p-2 w-full"
              onChange={handleImageUpload}
            />
            {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
            {newTour.imageUrls[0] && (
              <img
                src={`http://localhost:5000${newTour.imageUrls[0]}`}
                alt="Preview"
                className="mt-2 h-32 object-cover rounded-lg border"
              />
            )}
          </div>
        </div>

        <textarea placeholder="Description" className="w-full border rounded-lg p-2"
          rows={3}
          value={newTour.description}
          onChange={(e) => setNewTour({ ...newTour, description: e.target.value })}
        ></textarea>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            {editingTourId ? <><Pencil className="mr-2" size={18} /> Update Tour</> :
              <><Plus className="mr-2" size={18} /> Add Tour</>}
          </button>
          {editingTourId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="grid md:grid-cols-2 gap-6">
        {tours.map((tour) => (
          <div key={tour._id} className="bg-gray-100 p-4 rounded-lg shadow flex flex-col justify-between">
            {tour.imageUrls?.[0] ? (
              <img
                src={`http://localhost:5000${tour.imageUrls[0]}`}
                alt={tour.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 text-center flex items-center justify-center rounded-lg mb-3">
                No image available
              </div>
            )}
            <h3 className="font-semibold text-lg mb-1">{tour.name}</h3>
            <p className="text-sm text-gray-600 mb-1">
              {tour.durationDays} days • LKR {Number(tour.priceLKR).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mb-3">{tour.region} • {tour.category}</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(tour)}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Pencil className="mr-1" size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(tour._id)}
                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 flex items-center"
              >
                <Trash2 className="mr-1" size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTourManager;