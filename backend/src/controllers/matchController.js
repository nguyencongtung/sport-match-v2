const Match = require('../models/Match');
const User = require('../models/User');

exports.createMatch = async (req, res) => {
  const { title, sport, description, location, date, maxParticipants, skillLevel } = req.body;
  const organizer = req.user.id; // Assuming user ID is available from auth middleware

  try {
    const newMatch = new Match({
      title,
      sport,
      description,
      location,
      date,
      organizer,
      participants: [organizer], // Organizer is automatically a participant
      maxParticipants,
      skillLevel,
    });

    await newMatch.save();
    res.status(201).json(newMatch);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getMatches = async (req, res) => {
  try {
    const matches = await Match.find().populate('organizer', ['username', 'profile.profilePicture']);
    res.json(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('organizer', ['username', 'profile.profilePicture'])
      .populate('participants', ['username', 'profile.profilePicture']);
    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }
    res.json(match);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.joinMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }

    // Check if user is already a participant
    if (match.participants.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Already joined this match' });
    }

    // Check if match is full
    if (match.participants.length >= match.maxParticipants) {
      return res.status(400).json({ msg: 'Match is full' });
    }

    match.participants.push(req.user.id);
    await match.save();

    res.json(match);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.leaveMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }

    // Check if user is a participant
    if (!match.participants.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Not a participant in this match' });
    }

    // Prevent organizer from leaving their own match (or handle transfer of ownership)
    if (match.organizer.toString() === req.user.id.toString()) {
      return res.status(400).json({ msg: 'Organizer cannot leave their own match' });
    }

    match.participants = match.participants.filter(
      (participant) => participant.toString() !== req.user.id.toString()
    );
    await match.save();

    res.json(match);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
