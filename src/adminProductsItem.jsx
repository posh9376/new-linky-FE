/* eslint-disable react/prop-types */


function AdminProductItems({image,name,description,price,location,handleDelete}) {
   
    return (
        <div className="card">
            <img src={image} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text">Ksh. {price}</p>
                <p className="card-text">{location}</p>
                <div className="d-flex gap-2">
                <button className="btn btn-primary">change details</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete </button>
                </div>
                
            </div>
        </div>
    );
}

export default AdminProductItems