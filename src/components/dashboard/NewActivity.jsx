import React from 'react';
import Card from '../shared/Card';

const NewActivity = ({ newActivity, setNewActivity, tagInput, setTagInput, onSubmit }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity, [name]: value });
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setNewActivity({
        ...newActivity,
        tags: [...newActivity.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setNewActivity({
      ...newActivity,
      tags: newActivity.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <Card className="mt-8">
      <h3 className="text-lg font-medium text-[#283618] mb-4">Log New Activity</h3>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#606C38] mb-1">
              Activity Name
            </label>
            <input
              type="text"
              name="name"
              value={newActivity.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-[#DDA15E] rounded-md focus:ring-[#D4A373] focus:border-[#D4A373] bg-[#FEFAE0]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#606C38] mb-1">
              Timeframe
            </label>
            <select
              name="timeframe"
              value={newActivity.timeframe}
              onChange={handleInputChange}
              className="w-full p-2 border border-[#DDA15E] rounded-md focus:ring-[#D4A373] focus:border-[#D4A373] bg-[#FEFAE0]"
            >
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#606C38] mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={newActivity.date}
              onChange={handleInputChange}
              className="w-full p-2 border border-[#DDA15E] rounded-md focus:ring-[#D4A373] focus:border-[#D4A373] bg-[#FEFAE0]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#606C38] mb-1">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={newActivity.startTime}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-[#DDA15E] rounded-md focus:ring-[#D4A373] focus:border-[#D4A373] bg-[#FEFAE0]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#606C38] mb-1">
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              value={newActivity.endTime}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-[#DDA15E] rounded-md focus:ring-[#D4A373] focus:border-[#D4A373] bg-[#FEFAE0]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#606C38] mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={newActivity.priority}
              onChange={handleInputChange}
              className="w-full p-2 border border-[#DDA15E] rounded-md focus:ring-[#D4A373] focus:border-[#D4A373] bg-[#FEFAE0]"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#606C38] mb-1">
              Tags (press Enter to add)
            </label>
            <div className="flex items-center border border-[#DDA15E] rounded-md focus-within:ring-1 focus-within:ring-[#D4A373] focus-within:border-[#D4A373] p-1 bg-[#FEFAE0]">
              <div className="flex flex-wrap gap-1 mr-2">
                {newActivity.tags.map(tag => (
                  <span key={tag} className="bg-[#D4A373] text-[#FEFAE0] text-xs px-2 py-1 rounded-full flex items-center">
                    {tag}
                    <button 
                      type="button" 
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-[#FAEDCD]"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="flex-1 p-1 outline-none bg-transparent"
                placeholder="Add tags..."
              />
            </div>
          </div>
          
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-[#606C38] mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={newActivity.notes}
              onChange={handleInputChange}
              rows="2"
              className="w-full p-2 border border-[#DDA15E] rounded-md focus:ring-[#D4A373] focus:border-[#D4A373] bg-[#FEFAE0]"
            ></textarea>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            className="jp-button"
          >
            Log Activity
          </button>
        </div>
      </form>
    </Card>
  );
};

export default NewActivity; 