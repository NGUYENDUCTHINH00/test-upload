// src/Index.js
import React, { useEffect, useState } from "react";
import { imageDB } from './ConfigFB';
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Index() {
    const [img, setImg] = useState('');
    const [imgUrl, setImgUrl] = useState([]);
    const [editorData, setEditorData] = useState('');

    const handleImageUpload = () => {
        if (img) {
            const imgRef = ref(imageDB, `files/${uuidv4()}`);
            uploadBytes(imgRef, img).then(snapshot => {
                console.log('Image uploaded successfully', snapshot);
                getDownloadURL(snapshot.ref).then(url => {
                    setImgUrl(data => [...data, url]);
                    setEditorData(data => `${data}<img src="${url}" alt="Uploaded image"/>`);
                });
            });
        }
    };

    useEffect(() => {
        listAll(ref(imageDB, "files")).then(result => {
            result.items.forEach(itemRef => {
                getDownloadURL(itemRef).then(url => {
                    setImgUrl(data => [...data, url]);
                });
            });
        });
    }, []);

    return (
        <div className="App">
            <input type="file" onChange={(e) => setImg(e.target.files[0])} />
            <button onClick={handleImageUpload}>Upload Image</button>
            <br />

            {/* CKEditor with rich text editing and linking functionality */}
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorData(data);
                }}
                config={{
                    toolbar: [
                        'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|', 
                        'insertTable', 'mediaEmbed', '|', 'undo', 'redo'
                    ],
                    link: {
                        addTargetToExternalLinks: true,
                    },
                }}
            />

            <br />
            <div>
                <h2>Uploaded Images:</h2>
                {imgUrl.map((url, index) => (
                    <div key={index}>
                        <img src={url} alt="Uploaded" height="200px" width="200px" />
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Index;
