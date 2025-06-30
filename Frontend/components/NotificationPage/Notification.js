"use client";
import React, { useState, useEffect } from "react";
import Sidenav from "@/components/navigation/Sidenav";
import axios from "axios";

function NotificationsPage() {
  const [userId, setUserId] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/notifications/${storedUserId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (storedUserId) {
      fetchNotifications();
    }
  }, []);

  return (
    <div className="flex bg-white min-h-screen">
      <div className="relative flex-shrink-0 w-1/5">
        <Sidenav />
      </div>
      <div className="flex-grow p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Notifications</h1>
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div
                key={notif.notification_id}
                className="bg-gray-100 p-4 rounded-lg shadow-sm border hover:shadow-md transition"
              >
                <p className="text-gray-700">
                  <span className="font-semibold">{notif.source_username || "Someone"}</span>{" "}
                  {notif.type === "like"
                    ? "liked your post"
                    : notif.type === "comment"
                    ? "commented on your post"
                    : "started following you"}
                </p>
                <p className="text-sm text-gray-500">{new Date(notif.timestamp).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No notifications found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
