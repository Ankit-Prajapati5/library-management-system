const Membership = require("../models/Membership");
const generateMembershipId = require("../utils/generateMembershipId");

// Add Membership
exports.addMembership = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      contactNo,
      address,
      aadhaarNo,
      startDate,
      membershipType
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !contactNo ||
      !address ||
      !aadhaarNo ||
      !startDate ||
      !membershipType
    ) {
      return res.status(400).json({ message: "All fields required" });
    }

    let months = 6;
    if (membershipType === "1year") months = 12;
    if (membershipType === "2years") months = 24;

    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + months);

    const membershipId = await generateMembershipId();

    const membership = await Membership.create({
      membershipId,
      firstName,
      lastName,
      contactNo,
      address,
      aadhaarNo,
      startDate,
      endDate
    });

    res.status(201).json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Membership
exports.updateMembership = async (req, res) => {
  try {
    const { membershipId, action } = req.body;

    if (!membershipId) {
      return res.status(400).json({ message: "Membership ID required" });
    }

    const membership = await Membership.findOne({ membershipId });

    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }

    if (action === "cancel") {
      membership.status = "inactive";
    }

    if (action === "extend") {
      const newEnd = new Date(membership.endDate);
      newEnd.setMonth(newEnd.getMonth() + 6);
      membership.endDate = newEnd;
    }

    await membership.save();

    res.json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
