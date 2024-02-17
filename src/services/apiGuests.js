import supabase from "./superbase";
import axios from "axios"

export async function getGuests() {
    const { data, error } = await supabase
        .from('guests')
        .select('id,fullName');
    if (error) {
        console.log(error);
        throw new Error('Guests get failed');
    }
    return data;
}

export async function createGuest(newGuest) {
    console.log(newGuest);
    const { data, error } = await supabase
        .from('guests')
        .insert([{ ...newGuest }])
    if (error) {
        console.log(error);
        throw new Error('Guest create Failed')
    }

    return data;
}

export const getCountries = async () => {
    const { data } = await axios.get("https://restcountries.com/v2/all")
    return data;
}