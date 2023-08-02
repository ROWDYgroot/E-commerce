// import React, { useState } from 'react'
// import { firestore, storage } from '../../firebase';

// export const AddProducts = () => {

//     const [productName, setProductName] = useState('');
//     const [productPrice, setProductPrice] = useState(0);
//     const [productImg, setProductImg] = useState(null);
//     const [error, setError] = useState('');

//     const types = ['image/png', 'image/jpeg']; // image types

//     const productImgHandler = (e) => {
//         let selectedFile = e.target.files[0];
//         if (selectedFile && types.includes(selectedFile.type)) {
//             setProductImg(selectedFile);
//             setError('')
//         }
//         else {
//             setProductImg(null);
//             setError('Please select a valid image type (jpg or png)');
//         }
//     }

//     // add product
//     const addProduct = (e) => {
//         e.preventDefault();
//         const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
//         uploadTask.on('state_changed', snapshot => {
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log(progress);
//         }, err => setError(err.message)
//             , () => {
//                 storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
//                     firestore.collection('Products').add({
//                         ProductName: productName,
//                         ProductPrice: Number(productPrice),
//                         ProductImg: url
//                     }).then(() => {
//                         setProductName('');
//                         setProductPrice(0)
//                         setProductImg('');
//                         setError('');
//                         document.getElementById('file').value = '';
//                     }).catch(err => setError(err.message))
//                 })
//             })
//     }

//     return (
//         <div className='container'>
//             <br />
//             <h2>ADD PRODUCTS</h2>
//             <hr />
//             <form autoComplete="off" className='form-group' onSubmit={addProduct}>
//                 <label htmlFor="product-name">Product Name</label>
//                 <input type="text" className='form-control' required
//                     onChange={(e) => setProductName(e.target.value)} value={productName} />
//                 <br />
//                 <label htmlFor="product-price">Product Price</label>
//                 <input type="number" className='form-control' required
//                     onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
//                 <br />
//                 <label htmlFor="product-img">Product Image</label>
//                 <input type="file" className='form-control' id="file" required
//                     onChange={productImgHandler} />
//                 <br />
//                 <button type="submit" className='btn btn-success btn-md mybtn'>ADD</button>
//             </form>
//             {error && <span className='error-msg'>{error}</span>}
//         </div>
//     )
// }

import React, { useState } from 'react';
import { firestore } from '../../firebase';

const AddProducts = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    firestore.collection('products').add({
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
    });
    // Clear form fields after submission
    setProductName('');
    setProductDescription('');
    setProductPrice('');
  };

  return (
    <div>
      <h2>Add Products</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProducts;
