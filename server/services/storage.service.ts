import { supabase } from "@/server/supabase"

export async function image(params: {image: File, filePath?: string}) {

    const {image, filePath = Math.random().toString()} = params

    const { data, error } = await supabase.storage
        .from('locardora')
        .upload(filePath, image)

        if(error) throw error

        // Retorna a url
        const {data: {publicUrl}} = supabase.storage
        .from('locardora')
        .getPublicUrl(filePath)

        return publicUrl
}

const storageServices = {
    image
}

export default storageServices