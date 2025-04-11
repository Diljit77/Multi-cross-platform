import Notification from "../models/Notification..js";

// ✅ Get all notifications for current user
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

// ✅ Mark a single notification as read
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.read = true;
    await notification.save();

    res.json({ message: "Marked as read", notification });
  } catch (err) {
    res.status(500).json({ message: "Failed to mark as read" });
  }
};

// ✅ (Optional) Create a notification manually (for admin or testing)
export const createNotification = async (req, res) => {
  try {
    const { title, message } = req.body;

    const notif = await Notification.create({
      userId: req.user._id,
      title,
      message,
    });

    res.status(201).json({ message: "Notification created", notif });
  } catch (err) {
    res.status(500).json({ message: "Failed to create notification" });
  }
};
