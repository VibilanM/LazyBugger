import client from "./src/db/supabase.js";

async function testConnection() {
    try {
        const { data, error } = await client.from('challenges').select('*');
        if (error) {
            console.error("Supabase Error:", error);
        } else {
            console.log("Supabase Data:", data);
        }
    } catch (err) {
        console.error("Unexpected Error:", err);
    }
}

testConnection();
