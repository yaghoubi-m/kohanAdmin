import React, {useEffect} from "react";

export default function DisplayImage({imgUrl, uploadedImage, onLoadUrl, url}) {

  useEffect(() => {
    onLoadUrl(url)
    // console.log(imgUrl[0])
  }, [])
  return (
      <>
        {uploadedImage ?
            (<img
                className='p-4'
                src={uploadedImage}
                alt="Uploaded"
                style={{width: '300px', height: '180px', borderRadius: '', objectFit: "fill"}}
            />) : imgUrl && (<img
                className="p-4"
                src={imgUrl}
                alt="Uploaded"
                style={{width: '300px', height: '180px', borderRadius: '', objectFit: "fill"}}
            />
        )
        }
      </>
  )
}
