import { serverUrl } from "../globals/globals";

export const loginAdmin = async (data) => {
    const url = `${serverUrl}/api/V1/admin/login`;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(url, requestOptions);
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error:', error);
    }
}
