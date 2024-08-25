// @desc    POST Data
// @route   /api/bfhl
// @access  Public

const processData = async (req, res) => {
    try {
        const { name,  dob, data, collegeEmailId, collegeRollNumber } = req.body;

        // Validate required fields
        if (!name || !dob || !data || !collegeEmailId || !collegeRollNumber) {
            return res.status(400).json({ is_success: false, message: 'All fields are required.' });
        }

        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: 'Data should be an array.' });
        }

        const [day, month, year] = dob.split('-').map(Number);
        

        // Separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));

        // Find the highest lowercase alphabet
        const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
        const highestLowercaseAlphabet = lowercaseAlphabets.length > 0
            ? [lowercaseAlphabets.sort().pop()]
            : [];

        // Format the user_id
        const formattedDOB = `${day.toString().padStart(2, '0')}${month.toString().padStart(2, '0')}${year}`;
        const userId = `${name.split(' ').join('_').toLowerCase()}_${formattedDOB}`;

        // Prepare the response
        const response = {
            is_success: true,
            user_id: userId,
            collegeEmailId: collegeEmailId,
            roll_number: collegeRollNumber,
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet
        };

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ is_success: false, message: error.message });
    }
};

// @desc    GET Data
// @route   /api/bfhl
// @access  Public

const getBFHL = (req, res) => {
    // Send the hardcoded JSON response
    res.status(200).json({ operation_code: 1 });
};

module.exports = { processData,getBFHL };
