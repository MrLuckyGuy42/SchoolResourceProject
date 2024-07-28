const express = require('express');
const bcrypt = require('bcrypt');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(express.json());

// Initialize Supabase client with environment variables
const supabaseUrl = 'https://bggvfpgvrbyseszqzdut.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZ3ZmcGd2cmJ5c2VzenF6ZHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyMDI3MTAsImV4cCI6MjAzNzc3ODcxMH0.n1M2GrYDI5rzDUE_4L5JwhNdgsnrFPdl5s8iC-VfDH8';
const supabase = createClient(supabaseUrl, supabaseKey);

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Fetch user from database
    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();

    if (error || !user) {
        res.status(401).send('Invalid credentials');
        return;
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);

    if (match) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

