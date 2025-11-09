import './MyPhotos.css';

//Return to: tried to refactor to make a W3Schools' HTML gallery work in React, but am currently stumped
function MyPhotosCV(props) {

    return (
        <div>
            <h3>Photos</h3>
            <div className='gallery'>
            {props.inputData.map((photo, index) => (
                <figure key={index}>
                    <img src={photo.img} alt={photo.alt} className="photo-box" />
                    <p>{photo.title}</p>
                </figure>
             ))}    
            </div>    
        </div>
    );
}

export default MyPhotosCV;
