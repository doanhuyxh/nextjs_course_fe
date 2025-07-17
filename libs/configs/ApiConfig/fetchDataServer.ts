
const API_URL_SERVER = process.env.API_URL_SERVER;
if (!API_URL_SERVER) {
    throw new Error("API_URL_SERVER is not defined in environment variables");
}

async function fetchData(url: string, accessToken: string): Promise<any> {
    try {
        const response = await fetch(`${API_URL_SERVER}/api/v1${url}`, {
            method: "GET",
            credentials: "include",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
        return {
            code: 500,
            message: 'Internal Server Error - Fetch Data Catch',
            data: ""
        }
    }
}

export default fetchData;