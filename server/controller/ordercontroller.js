import Order from "../models/Orders.js";
import PickupPartner from "../models/Pickupartner.js";
import fetch from "node-fetch";

// ✅ Create Order


  export const createOrder = async (req, res) => {
    try {
      const { orderId, customerName, address, amount, assignedTo } = req.body;
  
      const order = new Order({
        orderId,
        customerName,
        address,
        amount,
        assignedTo: assignedTo || null,
        createdBy: req.user._id,
      });
  
      // 🔍 Geocode pickup location from address
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${process.env.GEOCODE_API_KEY}`
      );
      const data = await response.json();
  
      if (data.results[0]) {
        const { lat, lng } = data.results[0].geometry;
        const pickupLocation = {
        
          type: "Point",
          coordinates: [lng, lat],
        };
  
        order.pickupLocation = pickupLocation;
  console.log(pickupLocation);
        // 🔄 Auto-assign nearest pickup partner if not already assigned
        if (!assignedTo) {
          const nearestPartner = await PickupPartner.findOne({
            status: "Active",
            location: {
              $near: {
                $geometry: pickupLocation,
                $maxDistance: 100000000 // meters (adjustable)
              },
            },
          });
  
          if (nearestPartner) {
            order.assignedTo = nearestPartner._id;
          }
          console.log("Nearest Partner:", nearestPartner);
        }
      }
  
  
      await order.save();
      res.status(201).json({ message: "Order created", order ,success:true});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to create order", error: err.message ,success:false});
    }
  };
  
// ✅ Get All Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ createdBy: req.user._id })
      .populate("assignedTo", "name phone status")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to get orders" });
  }
};

// ✅ Update Order
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order || order.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized or not found" });
    }

    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Order updated", updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order" });
  }
};

// ✅ Delete Order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order || order.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized or not found" });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete order" });
  }
};

// ✅ Optional: Auto-Assign Nearest Partner
export const autoAssignPartner = async (req, res) => {
  try {
    const { address, orderId, customerName, amount } = req.body;

    // Geocode order pickup location
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${process.env.GEOCODE_API_KEY}`
    );
    const data = await response.json();
    if (!data.results[0]) return res.status(400).json({ message: "Invalid address" });

    const { lat, lng } = data.results[0].geometry;

    // Find nearest active pickup partner
    const nearestPartner = await PickupPartner.findOne({
      status: "Active",
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: 5000,
        },
      },
    });

    if (!nearestPartner) {
      return res.status(404).json({ message: "No nearby partner found" });
    }

    const order = await Order.create({
      orderId,
      customerName,
      address,
      amount,
      pickupLocation: { type: "Point", coordinates: [lng, lat] },
      assignedTo: nearestPartner._id,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: "Order auto-assigned", order });
  } catch (err) {
    res.status(500).json({ message: "Auto-assign failed", error: err.message });
  }
};
