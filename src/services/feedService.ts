import axios from 'axios';

const FEED_URL = 'https://auxilioebd.blogspot.com/feeds/posts/default?alt=json';

export const fetchBlogFeed = async () => {
    try {
        const response = await axios.get(FEED_URL);
        console.log('Blog feed fetched successfully:', response.data);
        return response.data.feed.entry || [];
    } catch (error) {
        console.error('Error fetching blog feed:', error);
        throw error;
    }
};