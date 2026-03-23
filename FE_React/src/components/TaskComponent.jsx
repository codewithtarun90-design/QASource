import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import API from '../api';
import NotificationManager from '../NotificationManager';

const TaskComponent = ({ task, comments }) => {
  const [status, setStatus] = useState(task.status);
  const [commentText, setCommentText] = useState('');
  const history = useHistory();

  const toggleTaskStatus = async (taskId, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      await API.put(`/api/tasks/${taskId}/status`, { status: newStatus });
      NotificationManager.show('Task status updated!', 'success');
      setStatus(newStatus);
    } catch (error) {
      NotificationManager.show('Failed to update status', 'error');
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await API.put(`/api/tasks/${taskId}/status`, { status: newStatus });
      NotificationManager.show('Task status updated!', 'success');
      setStatus(newStatus);
    } catch (error) {
      NotificationManager.show('Failed to update status', 'error');
    }
  };

  const addComment = async (taskId) => {
    if (!commentText.trim()) {
      NotificationManager.show('Please enter a comment', 'warning');
      return;
    }
    try {
      await API.post(`/api/tasks/${taskId}/comments`, { content: commentText });
      NotificationManager.show('Comment added!', 'success');
      setCommentText('');
      history.go(0);
    } catch (error) {
      NotificationManager.show('Failed to add comment', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Task Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <input
                type="checkbox"
                checked={status === 'completed'}
                className="w-6 h-6 text-primary border-gray-300 rounded focus:ring-primary"
                onChange={() => toggleTaskStatus(task.id, status)}
              />
              <h1
                className={`text-3xl font-bold text-gray-800 ${status === 'completed' ? 'line-through text-gray-500' : ''}`}
              >
                {task.title}
              </h1>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>
                <i className="fas fa-folder mr-1"></i>
                {task.project_name}
              </span>
              {task.created_at && (
                <span>
                  <i className="fas fa-clock mr-1"></i>Created {task.created_at_formatted}
                </span>
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => history.push(`/tasks/${task.id}/edit`)}
              className="btn bg-primary text-white px-4 py-2 rounded-lg"
            >
              <i className="fas fa-edit mr-2"></i>Edit
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="btn bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              <i className="fas fa-trash mr-2"></i>Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
          <div>
            <p className="text-sm text-gray-600 mb-1">Status</p>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={status}
              onChange={(e) => updateTaskStatus(task.id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Priority</p>
            {task.priority === 'high' && (
              <span className="inline-flex items-center px-3 py-2 bg-red-100 text-red-700 text-sm font-semibold rounded-lg">
                <i className="fas fa-exclamation-circle mr-2"></i>High Priority
              </span>
            )}
            {task.priority === 'medium' && (
              <span className="inline-flex items-center px-3 py-2 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-lg">
                <i className="fas fa-minus-circle mr-2"></i>Medium Priority
              </span>
            )}
            {task.priority === 'low' && (
              <span className="inline-flex items-center px-3 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-lg">
                <i className="fas fa-arrow-down mr-2"></i>Low Priority
              </span>
            )}
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Assigned To</p>
            {task.assigned_to ? (
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold mr-2">
                  {task.assigned_to_name[0].toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-800">{task.assigned_to_name}</span>
              </div>
            ) : (
              <span className="text-sm text-gray-500">Unassigned</span>
            )}
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Due Date</p>
            {task.due_date ? (
              <p className={`text-sm font-medium text-gray-800 ${task.is_overdue ? 'text-red-600' : ''}`}>
                <i className="fas fa-calendar mr-1"></i>{task.due_date_formatted}
              </p>
            ) : (
              <span className="text-sm text-gray-500">No due date</span>
            )}
          </div>
        </div>
      </div>

      {/* Task Description */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          <i className="fas fa-align-left mr-2 text-primary"></i>Description
        </h2>
        {task.description ? (
          <div className="prose max-w-none text-gray-700">
            {task.description}
          </div>
        ) : (
          <p className="text-gray-500 italic">No description provided</p>
        )}
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          <i className="fas fa-comments mr-2 text-primary"></i>Comments
        </h2>

        {/* Add Comment Form */}
        <div className="mb-6">
          <textarea
            id="comment-text"
            rows="3"
            placeholder="Add a comment..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <button
            onClick={() => addComment(task.id)}
            className="mt-2 btn bg-primary text-white px-6 py-2 rounded-lg"
          >
            <i className="fas fa-paper-plane mr-2"></i>Post Comment
          </button>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex items-start p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {comment.user_name[0].toUpperCase()}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-800">{comment.user_name}</span>
                    <span className="text-xs text-gray-500">{comment.time_ago}</span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;
