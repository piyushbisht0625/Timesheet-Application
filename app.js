const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors_proxy = require('cors-anywhere');

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = 'mongodb://localhost:27017/timesheet';

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Employee Model
const Employee = mongoose.model('Employee', {
    
    timesheets: [{
        date: { type: Date, required: true },
        hours: { type: Number, required: true },
        rating: { type: Number, default: 0 }
    }]
});

// Define Timesheet Model
const Timesheet = mongoose.model('Timesheet', {
    date: { type: Date, required: true },
    hours: { type: Number, required: true },
    rating: { type: Number, default: 0 } 
    
});

// Submit timesheet route for employees
app.post('/employees/submitTimesheet', async (req, res) => {
    try {
        console.log('Request received');
        const { date, hours, rating } = req.body;

        const employee = await Employee.findById(employeeId);

         const newTimesheet = new Timesheet({ date, hours, rating });
        await newTimesheet.save();
        employee.timesheets.push({ date, hours, rating });
        console.log('Timesheet added to employee:', employee.timesheets);

        await employee.save();
        console.log('Employee saved:', employee);

        res.status(201).json({ message: 'Timesheet submitted successfully' });
        console.log('Response sent');
    } catch (error) {
        console.error('Error submitting timesheet', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Fetch timesheets route for managers
app.get('/managers/:managerId/timesheets', async (req, res) => {
    try {
        const managerId = req.params.managerId;
        const timesheets = await Timesheet.find({ });
        res.status(200).json({ timesheets });
    } catch (error) {
        console.error('Error fetching timesheets:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


