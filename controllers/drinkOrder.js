const DrinkOrder = require("../models/drinkOrder");

const drinkOrderController = {
  // addDrinkOrder: async (req, res) => {
  //   try {
  //     const newDrinkOrder = new DrinkOrder(req.body);
  //     const savedDrinkOrder = await newDrinkOrder.save();

  //     console.log("drink: " + newDrinkOrder);
  //     res.status(200).json({
  //       success: true,
  //       message: "add success drink order !",
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       success: false,
  //       message: "add fail drink order !",
  //       error: error.message,
  //     });
  //   }
  // },
  addDrinkOrder: async (req, res) => {
    try {
      const drink = await DrinkOrder.insertMany(req.body);

      //console.log("drink: " + newDrinkOrder);
      res.status(200).json({
        success: true,
        message: "add success drink order !",
        data: drink,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "add fail drink order !",
        error: error.message,
      });
    }
  },

  getAllDrinkOrder: async (req, res) => {
    try {
      const drinks = await DrinkOrder.find()
        .populate("drink")
        .populate("table");
      res.status(200).json({
        success: true,
        message: "read successful drinks",
        data: drinks,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },

  getAllDrinkOrderDecrease: async (req, res) => {
    try {
      const drinks = await DrinkOrder.find()
        .sort({ createdAt: -1 })
        .populate("drink")
        .populate("table");
      res.status(200).json({
        success: true,
        message: "read successful drinks",
        data: drinks,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error.message,
      });
    }
  },

  updateDrinkOrder: async (req, res) => {
    try {
      const order = await DrinkOrder.findById(req.params.id);

      console.log(order);
      await order.updateOne({
        $set: {
          qty: req.body.qty,
        },
      });
      res.status(200).json({
        success: true,
        message: "update successful drink order",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },

  deleteDrinkOrder: async (req, res) => {
    try {
      await DrinkOrder.deleteMany({ _id: req.params.id });
      res.status(200).json({
        success: true,
        message: "delete successful drink order",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },
};

module.exports = drinkOrderController;
