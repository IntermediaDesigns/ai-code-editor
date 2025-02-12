// functions/analyze_code/src/index.js
import axios from 'axios';

module.exports = async function(req, res) {
    const { message, code } = JSON.parse(req.payload);

    try {
        // Call Deepseek API
        const response = await axios.post('https://api.deepseek.com/v1/analyze', {
            prompt: message,
            code: code,
            model: 'deepseek-r1:free'
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Process and return the response
        res.json({
            message: response.data.message,
            suggestions: response.data.suggestions,
            fixes: response.data.fixes
        });
    } catch (error) {
        console.error('Error:', error);
        res.json({
            message: 'Sorry, I encountered an error. Please try again.',
            error: error.message
        }, 500);
    }
};