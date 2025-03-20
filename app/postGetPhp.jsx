import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';

const API_URL = "http://localhost/api.php"; // Replace with your actual server URL

const ApiInteraction = () =>
{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // Function to make GET request
    const fetchData = async () =>
    {
        setLoading(true);
        try
        {
            const response = await fetch(API_URL);
            const json = await response.json();
            setData(json);
        } catch (error)
        {
            console.error("Error fetching data:", error);
            alert("Failed to fetch data.");
        } finally
        {
            setLoading(false);
        }
    };

    // Function to make POST request
    const sendData = async () =>
    {
        setLoading(true);
        try
        {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email }),
            });

            const json = await response.json();
            setData(json);
        } catch (error)
        {
            console.error("Error sending data:", error);
            alert("Failed to send data.");
        } finally
        {
            setLoading(false);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>📥 Fetch Data from PHP (GET)</Text>
            <Button title="Fetch Data" onPress={fetchData} />

            <Text>📤 Send Data to PHP (POST)</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter Name"
                style={{ borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 }}
            />
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter Email"
                keyboardType="email-address"
                style={{ borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 }}
            />
            <Button title="Send Data" onPress={sendData} />

            {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />}

            {data && (
                <View style={{ marginTop: 20 }}>
                    <Text>📝 Response:</Text>
                    <Text>{JSON.stringify(data, null, 2)}</Text>
                </View>
            )}
        </View>
    );
};

export default ApiInteraction;
