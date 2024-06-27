// @desc Get al contacts
// @route GET /api/contacts
// @access Public

const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModels');

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({
        user_id: req.user.id
    });

    res.status(200).json({
        message: `GET all contacts`,
        data: contacts
    });
});

const getaContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found');
    }
    res.status(200).json({
        message: `GET a contact for ${req.params.id}`,
        data: contact
    });
    
});

const createContact = asyncHandler( async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error('Please provide name, email and phone');
    } 
    
    const contact = await Contact.create({
        name,
        email,
        phone
    });


    res.status(201).json({
        message: `Created a contact`,
        data: contact
    });
});

const editContact = asyncHandler( async (req, res) => {

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found');
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    )
    res.status(200).json({
        message: `Update a contact for ${req.params.id}`,
        data: updatedContact
    });
})

const deleteContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found');
    }
    await Contact.deleteOne({ _id: req.params.id });

    res.status(200).json({
        message: `Delete a contact for ${req.params.id}`
    });
});


module.exports = { 
    getContacts, 
    getaContact, 
    createContact, 
    editContact, 
    deleteContact};