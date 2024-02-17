import supabase, { supabaseUrl } from "./superbase";

export async function getCabins() {
    const { data, error } = await supabase
        .from('cabins')
        .select('*');
    if (error) {
        console.log(error);
        throw new Error('Cabins get Failed')
    }
    return data;
}

export async function createCabin(newCabin) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...newCabin, image: imagePath }])
    if (error) {
        console.log(error);
        throw new Error('Cabins create Failed')
    }

    if (hasImagePath) {
        console.log('work');
        return data;
    }

    const { error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)
    if (storageError) {
        await supabase.from('cabins').delete().eq("id", data.id)
            .upload(imageName, newCabin.image)
        console.log(storageError);
        throw new Error('Cabins image upload failed')
    }

    return data;
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    const { data, error } = await supabase
        .from('cabins')
        .update({ ...newCabin, image: imagePath })
        .eq("id", id)
        .select()
    if (error) {
        console.log(error);
        throw new Error('Cabins create Failed')
    }

    if (hasImagePath) {
        console.log('work');
        return data;
    }

    const { error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)

    if (storageError) {
        await supabase.from('cabins').delete().eq("id", data.id)
            .upload(imageName, newCabin.image)
        console.log(storageError);
        throw new Error('Cabins image upload failed')
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);

    if (error) {
        console.log(error);
        throw new Error('Cabins delete Failed')
    }
    return data;
}