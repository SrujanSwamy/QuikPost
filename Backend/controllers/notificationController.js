import { db } from "../database.js";


export const getNotificationsForUser = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const [notifications] = await db.execute(
        `SELECT n.*, u.username AS source_username
         FROM Notifications n
         LEFT JOIN Users u ON n.source_user_id = u.user_id
         WHERE n.user_id = ?
         ORDER BY n.timestamp DESC`,
        [userId]
      );
  
      res.status(200).json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  