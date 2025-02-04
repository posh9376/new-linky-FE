import AnimateStart from './animatedStart'
import { useState } from 'react'
import axios from 'axios'

function CreatePost(){
    const [name,setname] = useState('')
    const [description,setdescription] = useState('')
    const [image,setimage] = useState(null)
    const [price,setprice] = useState('')
    const [category,setcategory] = useState('')
    const [location,setlocation] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault(); // Prevents page reload
        console.log('post created with :', name,description,image,price,category,location);
        let data = {
            name : name,
            description : description,
            image : image,
            price : parseInt(price),
            category: category,
            location : location
        }
        axios.post("https://linky-backend-uk3y.onrender.com/admin/product", data, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true // Ensures cookies are included if needed
        })
        .then((response) => {
            console.log(response.data);
            
        })
        .catch((error) => {
            console.error("signup error:", error.response.data);
            const errorMessage = error.response.data.message;
           
            alert(errorMessage);
        });
        setname('');
        setdescription('');
        setimage('');
        setprice('');
        setcategory('');
        setlocation('');
    }

    return(
        <AnimateStart>
            <form >
                <div className="form-floating mb-2">
                    <input  type="name" value={name} onChange={(e) => setname(e.target.value)} className="form-control" id="floatingInput" placeholder="product name"/>
                    <label htmlFor="floatingInput">product name</label>
                </div>
                <div className="form-floating mb-2">
                    <input  type="description" value={description} onChange={(e) => setdescription(e.target.value)} className="form-control" id="floatingInput" placeholder="product description"/>
                    <label htmlFor="floatingInput">product description</label>
                </div>
                <div className="form-floating mb-2">
                    <input  value={image} onChange={(e) => setimage(e.target.value)} className="form-control" id="floatingInput" placeholder="product image"/>
                    <label htmlFor="floatingInput">Select an image</label>
                </div>
                <div className="form-floating mb-2">
                    <input  type="price" value={price} onChange={(e) => setprice(e.target.value)} className="form-control" id="floatingInput" placeholder="product price"/>
                    <label htmlFor="floatingInput">product price</label>
                </div>
                <div className="form-floating mb-2">
                    <input  type="category" value={category} onChange={(e) => setcategory(e.target.value)} className="form-control" id="floatingInput" placeholder="product category"/>
                    <label htmlFor="floatingInput">product category</label>
                </div>
                <div className="form-floating mb-2">
                    <input  type="location" value={location} onChange={(e) => setlocation(e.target.value)} className="form-control" id="floatingInput" placeholder="product location"/>
                    <label htmlFor="floatingInput">product location</label>
                </div>
                <button className="btn  btn-primary w-100 py-2 mb-2 " onClick={handleSubmit}>Post</button>
            </form>
        </AnimateStart>
        
    )
}

export default CreatePost