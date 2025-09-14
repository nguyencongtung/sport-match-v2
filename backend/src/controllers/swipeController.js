const Swipe = require('../models/Swipe');
const User = require('../models/User');

exports.createSwipe = async (req, res) => {
  const { swipedId, direction } = req.body;
  const swiperId = req.user.id; // Assuming user ID is available from auth middleware

  try {
    // Check if the swiped user exists
    const swipedUser = await User.findById(swipedId);
    if (!swipedUser) {
      return res.status(404).json({ msg: 'Swiped user not found' });
    }

    // Prevent self-swiping
    if (swiperId === swipedId) {
      return res.status(400).json({ msg: 'Cannot swipe on yourself' });
    }

    // Check if a swipe already exists from swiper to swiped
    let existingSwipe = await Swipe.findOne({ swiper: swiperId, swiped: swipedId });

    if (existingSwipe) {
      // Update existing swipe
      existingSwipe.direction = direction;
      await existingSwipe.save();
      return res.json(existingSwipe);
    } else {
      // Create new swipe
      const newSwipe = new Swipe({
        swiper: swiperId,
        swiped: swipedId,
        direction,
      });
      await newSwipe.save();

      // Check for a match (if both users swiped right on each other)
      if (direction === 'right') {
        const reciprocalSwipe = await Swipe.findOne({ swiper: swipedId, swiped: swiperId, direction: 'right' });
        if (reciprocalSwipe) {
          // This is where you would create a chat or a match entry
          // For MVP, we'll just return a match status
          return res.json({ newSwipe, match: true, matchedUser: swipedUser });
        }
      }
      return res.json({ newSwipe, match: false });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getSwipes = async (req, res) => {
  try {
    const swipes = await Swipe.find({ swiper: req.user.id }).populate('swiped', ['username', 'profile.profilePicture']);
    res.json(swipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
