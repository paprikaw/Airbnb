import React from 'react';
import ImageUploading from 'react-images-uploading';
import { Button } from '@mui/material';
import { StoreContext } from '../utils/store';

function UploadThumbnailButton ({ ButtonText = 'Click or drop here', thumbnail = '' }) {
  const context = React.useContext(StoreContext);
  const setThumbnail = context.thumbnail[1];
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  React.useEffect(() => {
    if (thumbnail !== '' && thumbnail !== null) {
      setImages([thumbnail]);
    }
  }, [])

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    const image = imageList.length !== 0 ? imageList[0].data_url : '';
    setImages(imageList);
    setThumbnail(image);
  };

  return (
    <React.Fragment>
        <ImageUploading
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <Button
                style={isDragging ? { color: 'red' } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                  {ButtonText}
              </Button>
              &nbsp;
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.data_url} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <Button onClick={() => onImageRemove(index)}>Remove</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
    </React.Fragment>
  );
}
export default UploadThumbnailButton;
