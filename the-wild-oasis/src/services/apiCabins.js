import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error("Cabins could not be loaded");
        throw new Error("Cabins could not be loaded");
    }

    return data;
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );

    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    // 1. Create/edit cabin
    let query = supabase.from("cabins");
    console.log(id);
    // A) Create
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // B) Edit
    if (id)
        query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error("Cabin couldn't be added");
    }

    if (!hasImagePath) {
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
}

export async function deleteCabin(id) {
    const { error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabin couldn't be deleted");
    }
}
