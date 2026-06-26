/**
 * Contact API Routes
 * POST /api/contact — Submit contact form
 * GET  /api/contact — Retrieve all messages (admin)
 */

const express = require('express');
const mongoose = require('mongoose');
const Contact = require('../models/Contact');

const router = express.Router();

/**
 * POST /api/contact
 * Save a new contact form submission
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, email, subject, message'
      });
    }

    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database unavailable. Please try again later.'
      });
    }

    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      data: { id: contact._id }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }

    console.error('Contact submission error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
});

/**
 * GET /api/contact
 * Retrieve all contact messages (for admin use)
 */
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database unavailable'
      });
    }

    const messages = await Contact.find()
      .sort({ createdAt: -1 })
      .select('-__v')
      .limit(50);

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    console.error('Fetch messages error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to retrieve messages' });
  }
});

module.exports = router;
