import React, { useState } from 'react';
import { FaTrash } from "react-icons/fa";
import Navigation from '../components/Navigation';
import NavigationSide from '../components/NavigationSide';
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

interface NotificationItem {
  id: number;
  type: string;
  message: string;
  time: string;
}

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 1, type: 'comment', message: 'John Doe commented on your post', time: '2 hours ago' },
    { id: 2, type: 'follow', message: 'Jane Smith started following you', time: '4 hours ago' },
    { id: 3, type: 'mention', message: 'You were mentioned in a post by Alice', time: '1 day ago' },
    { id: 1, type: 'comment', message: 'John Doe commented on your post', time: '2 hours ago' },
    { id: 2, type: 'follow', message: 'Jane Smith started following you', time: '4 hours ago' },
    { id: 3, type: 'mention', message: 'You were mentioned in a post by Alice', time: '1 day ago' },
    { id: 1, type: 'comment', message: 'John Doe commented on your post', time: '2 hours ago' },
    { id: 2, type: 'follow', message: 'Jane Smith started following you', time: '4 hours ago' },
    { id: 3, type: 'mention', message: 'You were mentioned in a post by Alice', time: '1 day ago' },
    { id: 1, type: 'comment', message: 'John Doe commented on your post', time: '2 hours ago' },
    { id: 2, type: 'follow', message: 'Jane Smith started following you', time: '4 hours ago' },
    { id: 3, type: 'mention', message: 'You were mentioned in a post by Alice', time: '1 day ago' },
  ]);

  const [pushEnabled, setPushEnabled] = useState<boolean>(false);

  const togglePushNotification = () => {
    setPushEnabled(prevState => !prevState);
  };

  const clearNotification = (id: number) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="hidden sm:block">
        <Navigation />
      </div>
      <div className="block sm:hidden">
        <NavigationSide />
        <br />
        <br />
        <br />
      </div>
      <div className="flex flex-col w-3/4">
        <h1 className="relative my-5 text-5xl dark:text-white">Notifications</h1>
        <div className="absolute top-32 right-32">
            <button
              className={`px-4 py-2 rounded-lg shadow-lg  ${
                pushEnabled ? 'bg-gray-400 text-white' : 'bg-green-500 text-white'
              }`}
              onClick={togglePushNotification}
            >
              {pushEnabled ? <FaToggleOff/> : <FaToggleOn/>}
            </button>
          </div>
        {notifications.length > 0 ? (
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li key={notification.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-start space-x-4">
                  <div className="flex-1">
                    <span className="font-bold capitalize dark:text-white">{notification.type}</span>: <p className='dark:text-white'>{notification.message}</p> <span className="text-gray-500 dark:font-bold">({notification.time})</span>
                  </div>
                  <button
                    onClick={() => clearNotification(notification.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg dark:text-white">No notifications to display.</p>
          )}
          
        </div>
        <br /><br />
      </div>
   
  );
}

export default Notification;
