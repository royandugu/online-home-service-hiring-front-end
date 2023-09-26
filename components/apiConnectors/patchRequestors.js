import { serverUrl } from "../globals/globals";
export const setSettled = async (id) => {
    console.log(id);
    const url = `${serverUrl}/api/V1/hire/settled/${id}`;

    const requestOptions = {
        method: 'PATCH',
    };

    try {
        const response = await fetch(url, requestOptions);
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error:', error);
    }
}