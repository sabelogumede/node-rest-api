const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

// Getting all
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
// we are using a middleware at the bottom
router.get("/:id", getSubscriber, (req, res) => {
  res.json(res.subscriber);
});

// Creating One
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch("/:id", getSubscriber, async (req, res) => {
  // check if req-body sent is not empty
  if (req.body.name != null) {
    // set it to subscriber.name key
    res.subscriber.name = req.body.name;
  }
  // if subscribedToChannel past in
  if (req.body.subscribedToChannel != null) {
    // set it
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  }
  //
  try {
    const updatedSubscriber = await res.subscriber.save();
    // send back json update
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "Deleted Subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// middleware async function { to be used in the above routes }
async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.subscriber = subscriber;
  next();
}

// exporting our routes
module.exports = router;
