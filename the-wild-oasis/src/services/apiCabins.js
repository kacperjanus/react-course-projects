import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error("Cabins could not be loaded");
        throw new Error("Cabins could not be loaded");
    }

    return data;
}

export async function createCabin(newCabin) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );

    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    // 1. Create cabin
    const { data, error } = await supabase
        .from("cabins")
        .insert([{ ...newCabin, image: imagePath }])
        .select();

    if (error) {
        console.error(error);
        throw new Error("Cabin couldn't be added");
    }

    // 2. Upload image
    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image, {
            cacheControl: "3600",
            upsert: false,
        });

    // 3. Delete cabin if there was an error while uploading the image
    if (storageError) {
        deleteCabin(data.id);
        console.error(storageError);
        throw new Error("Cabin image couldn't be uploaded");
    }
}

export async function deleteCabin(id) {
    const { error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabin couldn't be deleted");
    }
}
