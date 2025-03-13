import React from 'react';

const ActivityItem = ({ activity, calculateDuration }) => {
  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-[#283618]">{activity.name}</div>
        {activity.notes && (
          <div className="text-sm text-[#606C38]">{activity.notes}</div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-[#283618]">{activity.date}</div>
        <div className="text-sm text-[#606C38]">
          {activity.startTime} - {activity.endTime}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-[#283618]">
          {calculateDuration(activity.startTime, activity.endTime).toFixed(1)} hrs
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-wrap gap-1">
          {activity.tags.map(tag => (
            <span 
              key={tag} 
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#D4A373] text-[#FEFAE0]"
            >
              {tag}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span 
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityStyles(activity.priority)}`}
        >
          {activity.priority}
        </span>
      </td>
    </tr>
  );
};

export default ActivityItem; 