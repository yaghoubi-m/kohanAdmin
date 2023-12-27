import Dropzone from "react-dropzone";
import React from "react";

export default function DropZone({onDrop,title}){
    return(
        <>
            <div style={{width: "200px"}} className="">
                {title} :
            </div>
            <Dropzone onDrop={onDrop}>
                {({getRootProps, getInputProps}) => (
                    <div className='border-1 border p-5 w-25 text-center' {...getRootProps()}
                         style={{cursor: 'pointer'}}>
                        <input {...getInputProps()} />
                        <p>Click or drag an image here to upload</p>
                    </div>)}
            </Dropzone>
        </>
    )
}
