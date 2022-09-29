import { useState, useEffect, FormEvent } from 'react'
import * as k from './App.styles'
import * as Photos from './services/photos'
import {photo} from './types/photo'
import PhotoItem from './components/PhotoItem'

function App() {

    const [loading, setLoading] = useState<boolean>(false)
    const [photos, setPhotos] = useState<photo[]>([])
    const [uploading, setUploading] = useState(false)

    useEffect(()=>{
        const getPhotos = async ()=>{
            setLoading(true);
            setPhotos( await Photos.getAll())
            setLoading(false);
        }
        getPhotos();
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const file = formData.get('image') as File;
        if (file && file.size > 0){
            setUploading(true);
            let result = await Photos.insert(file);
            setUploading(false);

            if( result instanceof Error){
                alert(`${result.name} - ${result.message}`)
            } else {
                let newPhotoList = [...photos];
                newPhotoList.push(result);
                setPhotos(newPhotoList);
            }
        }
    };

  return (
  <k.Container>
    <k.Area>
        <k.Header>PHOTO GALLERY</k.Header>

        <k.Upload method='POST' onSubmit={handleSubmit}>
            <input type="file" name='image' />
            <input type="submit" value='Upload' />
            {uploading && 'Uploading...'}
        </k.Upload>

        {loading && <k.ScreenWarning>
            Loading ...
            </k.ScreenWarning>}

            {!loading && photos.length > 0 && 
            <k.PhotoList>
                {photos.map((item,index)=>(
                <PhotoItem key={index} url={item.url} name={item.name}/>
                ))}    
            </k.PhotoList>}

            {!loading && photos.length === 0 &&
            <k.ScreenWarning>
            There isn't photos.
            </k.ScreenWarning>
            }
    </k.Area>
  </k.Container>
  )
}

export default App;
