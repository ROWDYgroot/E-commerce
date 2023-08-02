// import React, { useState } from 'react';

// const Profile = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     // You can perform additional checks on the file if needed (e.g., file size, type)
//     setSelectedImage(file);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle image submission here, e.g., upload the image to a server or process it
//     console.log('Selected image:', selectedImage);
//   };

//   return (
//     <div>
//       <h2>Image Uploader</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="file" accept="image/*" onChange={handleImageChange} />
//         <button type="submit">Upload Image</button>
//       </form>
//     </div>
//   );
// };

// export default Profile;


import React, { useState } from 'react';

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // You can perform additional checks on the file if needed (e.g., file size, type)

    // Store the image URL in localStorage
    const imageUrl = URL.createObjectURL(file);
    localStorage.setItem('userImage', imageUrl);

    setSelectedImage(imageUrl);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle image submission here, e.g., upload the image to a server or process it
    console.log('Selected image:', selectedImage);
  };

  return (
    <div>
      <h2>Image Uploader</h2>
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Uploaded" />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Upload Image</button>
      </form>
    </div>
  );
};

export default Profile;
