import { photo } from "../types/photo";
import { storage} from '../libs/firebase'
import { ref, listAll, getDownloadURL, uploadBytes} from 'firebase/storage'
import {v4 } from 'uuid'

export const getAll = async ()=>{
    let list:photo[] = [];

    const imagesFolder = ref(storage, 'photos') // 2 parametros: storage e a pasta ou arquivo do storage
    const photoList = await listAll(imagesFolder);

    for( let i in photoList.items){
        let photoUrl = await getDownloadURL(photoList.items[i]);

        list.push({
            name: photoList.items[i].name, 
            url: photoUrl
        })
    }

    return list;
}

export const insert = async (file: File) =>{
    if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)){
        let randomName=v4();
        let newFile = ref(storage, `photos/${randomName}`)
        let upload = await uploadBytes(newFile, file)
        let photoUrl = await getDownloadURL(upload.ref)

        return {
            name: upload.ref.name, url: photoUrl
        } as photo;

    } else {
        return new Error('Upload only image files')
    }
}