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

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents page reload
    
        console.log('Post created with:', name, description, image, price, category, location);
    
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        if (!token) {
            alert('No authorization token found. Please log in.');
            return;
        }
    
        let data = {
            name: name,
            description: description,
            image: image,
            price: parseInt(price),
            category: category,
            location: location
        };
    
        try {
            const response = await axios.post(
                "https://linky-backend-uk3y.onrender.com/admin/product", 
                data, 
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    withCredentials: true // Ensures cookies are included if needed
                }
            );
    
            console.log("Product created:", response.data);
            alert("Product posted successfully!");
    
            // Clear input fields after successful submission
            setname('');
            setdescription('');
            setimage('');
            setprice('');
            setcategory('');
            setlocation('');
        } catch (error) {
            console.error("Error creating product:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to create product");
        }
    };
    
    

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
                <div>
                    <label htmlFor="category">Choose a category:</label>

                    <select className='form-control btn-primary mb-3' name="category" id="category" value={category} onChange={(e) => setcategory(e.target.value)}>
                    <option value="laptops" >Laptop</option>
                    <option value="clothes">clothes</option>
                    <option value="home">home</option>
                    <option value="car-accessories">car-accessories</option>
                    <option value="phones">phones and accessories</option>
                    </select>
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