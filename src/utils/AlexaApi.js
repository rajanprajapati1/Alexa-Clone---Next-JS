
const AlexApi = async (message) => {
    try {
        const res = await fetch('/api/alexa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });
        const data = await res.json();
        return data.content;
    } catch (error) {
        return error;
    }
};



export default AlexApi;