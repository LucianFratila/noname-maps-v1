import React,{useState} from 'react'

function UploadImage(){
    const [image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");
    const uploadImage = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "geoportal")
    data.append("cloud_name","sirtitish")
    fetch("https://api.cloudinary.com/v1_1/sirtitish/image/upload",{
    method:"post",
    body: data
    })
    .then(resp => resp.json())
    .then(data => {
    console.log(data);
    setUrl(data.url)
    })
    .catch(err => console.log(err))
    }
    return (
        <div>
            <div>
                <input type="file" onChange= {(e)=> setImage(e.target.files[0])}></input>
                <button onClick={uploadImage}>Upload</button>
            </div>
            <div>
                <h1>Uploaded image will be displayed here</h1>
                <img alt='poza' src={url}/>
            </div>
        </div>
    )

}

export default UploadImage