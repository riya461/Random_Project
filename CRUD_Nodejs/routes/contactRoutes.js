const express = require('express');
const router = express.Router();

const { 
    getaContact, 
    getContacts, 
    createContact, 
    editContact, 
    deleteContact 
} = require('../controllers/contactController');
const validateTokenHandler = require('../middleware/validateTokenHandler');

router.use(validateTokenHandler);
// get all contacts 
router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getaContact).put(editContact).delete(deleteContact);
module.exports = router;