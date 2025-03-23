// utils.js
export const fetchCoordinates = async (postalCode) =>
{
    const url = `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&format=json&addressdetails=1&limit=1`;

    try
    {
        const response = await fetch(url);
        const data = await response.json();
        const location = data[0];
        if (location)
        {
            return { lat: parseFloat(location.lat), lng: parseFloat(location.lon) };
        }
    } catch (error)
    {
        console.error("Error getting coordinates:", error);
    }
    return null;
};
