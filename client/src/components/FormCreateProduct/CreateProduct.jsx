import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { PostPhone, getBrands, getCapacity,getColores } from "../../redux/actions/index.js";
import axios from "axios";
import swal from "sweetalert2";
import SideBar from "../../views/Dashboard/SideBar/SideBar.jsx";

export const CreateProduct = () => {
  const dispatch = useDispatch();

  const brands = useSelector((state) => state.Brands);
  const phones = useSelector((state) => state.Phones);
  const colors = useSelector((state) => state.Color);
  const capacity = useSelector((state) => state.Capacity);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    year: "",
  
   // image:""
  });
  const [image, setImage] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState("");
  ////*upload image

  const handleImage = async (e) => {
    try {
      const file = e.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "store_phones"); //carpeta donde se guardan las imagenes
      await axios
        .post(`https://api.cloudinary.com/v1_1/dwfhsitwe/image/upload`, data)
        .then((response) => setImage(response.data.secure_url) );
      
    } catch (error) {
      console.log(error.message)
    }
  };
  /////////
  const [errors, setErrors] = useState({});
  //* validaciones : ///////////////////////////////////////////////

  const validateInput = (form) => {
    let errors = {};
    if (form.name.trim().length > 0) {
      let productExist = phones.filter(
        (e) => e.name.toLowerCase() === form.name.toLowerCase()
      );
      if (productExist.length > 0) errors.name = "The title already exists";
    }
    //
    if (!form.name.trim()) {
      errors.name = "Name is required";
    }
    if (!form.description.trim()) {
      errors.description = "Description is required";
    }
    if (!form.year.trim()) {
      errors.year = "Description is required";
    }

     if (!image.length) {
      errors.image = "Image is required";
    } 
    if (!form.price.trim()) {
      errors.price = "Price is required";
    }
    if (!form.stock.trim()) {
      errors.stock = "Stock is required";
    }
   if (!selectedBrand.trim()) {
      errors.brand = "Brand is required";
    }
    if (!selectedColor.trim()) {
      errors.color = "Color is required";
    }  
    if (!selectedCapacity.trim()) {
      errors.capacity = "Capacity is required";
    } 
    return errors;
  };

  const handleBlur = () => {
    setErrors(validateInput(form));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length || !form.name|| !form.description|| !form.price|| !form.stock|| !form.year ||!image.length||!selectedBrand.length||!selectedCapacity.length|| !selectedColor.length) {
      swal.fire({
        title: "Error",
        text: "You must complete all fields",
        icon: "warning",
        buttons: "Ok",
      });
    } else {
      const updatedFormData = {
        ...form,
        brandid: selectedBrand,
        colorId: selectedColor, 
        storageCapacityId: selectedCapacity,
        image: image,
      };

      dispatch(PostPhone(updatedFormData));
      setForm({
       name:"",
       description:"",
       stock:"",
       price:"",
     
       year:""
      })
      setSelectedBrand({selectedBrand:""})
      setSelectedCapacity({selectedCapacity:""})
      setSelectedColor({selectedColor:""})
      setImage({image:""})
      console.log(updatedFormData);
      swal.fire({
        title: "Success",
        text: "A new product has been created!",
        icon: "success",
        buttons: "Ok",
      });
      // goBack();
    }
  };

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCapacity());
    dispatch(getColores());
  }, [dispatch]);

  return (
      <div class='grid grid-cols-6 min-h-screen overflow-y-hidden'>

            <div class='col-span-1 bg-slate-400 text-center w-full'>
                 <SideBar/>
            </div>  

            <div className="col-span-5 items-center relative m-20 px-40">

            <div className="flex flex-col  rounded-none p-6 w-full mx-1  objet-cover m-20">
     
                    <form  className="p-10 rounded-lg shadow-md bg-blue-200 flex flex-col  h-full space-y-1"  onSubmit={handleSubmit}>
                        <div class='grid grid-cols-1 lg:grid-cols-2 lg:gap-3'>
                  
                        <div>
                        <label className="letas font-bold" htmlFor="name">
                          Name
                        </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={form.name}
                          />
                          {errors.name && (
                            <p style={{ color: "blue", fontWeight: "bold" }}>{errors.name}</p>
                          )}
                        </div>


                        <div>
                          <label className="letas font-bold" htmlFor="description">
                            Description
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={form.description}
                          />
                          {errors.description && (
                            <p style={{ color: "blue", fontWeight: "bold" }}>
                              {errors.description}
                            </p>
                          )}
                        </div>

                        <div>
                        <label className="letas font-extrabold" htmlFor="price">
                          Price
                        </label>

                          <input
                            type="number"
                            id="price"
                            name="price"
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={form.price}
                          />
                          {errors.price && (
                            <p style={{ color: "blue", fontWeight: "bold" }}>{errors.price}</p>
                          )}
                        </div>

                        <div>
                        <label className="letas font-bold" htmlFor="image">
                          Image
                        </label>

                          <input
                            type="file"
                            name="file"
                            onBlur={handleBlur}
                            onChange={handleImage}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                          {errors.image && (
                            <p style={{ color: "blue", fontWeight: "bold" }}>{errors.image}</p>
                          )}
                        </div>

                        <div>
                        <label className="letas font-bold" htmlFor="stock">
                          Stock
                        </label>

                          <input
                            type="number"
                            id="stock"
                            name="stock"
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleChange}
                            value={form.stock}
                            onBlur={handleBlur}
                            min="1"
                            pattern="^[0-9]+"
                          />
                          {errors.stock && (
                            <p style={{ color: "blue", fontWeight: "bold" }}>{errors.stock}</p>
                          )}
                        </div>

                        <div>
                        <label className="letas font-bold" htmlFor="year">
                          Year
                        </label>
                          <input
                            type="number"
                            id="year"
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="year"
                            onChange={handleChange}
                            value={form.year}
                            onBlur={handleBlur}
                            min="1"
                            pattern="^[0-9]+"
                          />
                          {errors.year && (
                            <p style={{ color: "blue", fontWeight: "bold" }}>{errors.year}</p>
                          )}
                        </div>

                        <div className="selects-check">
                        <label htmlFor="brand" className="letas font-bold">
                          Brand{" "}
                        </label>

                        <select className="appearance-none border rounded w-full p-1" onChange={(e) => setSelectedBrand(e.target.value)}>
                        <option hidden>choose a brand</option>
                          {brands?.map((b) => (
                          
                            <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                            </select>
                            {errors.brand && (
                            <p style={{ color: "blue", fontWeight: "bold" }}>{errors.brand}</p>
                          )}
                        </div>

                        <div>
                        <label htmlFor="color" className="letas font-bold">
                          Color{" "}
                        </label>
                        <select className="appearance-none border rounded w-full p-1" onChange={(e) => setSelectedColor(e.target.value)}>
                        <option hidden>choose a color</option>
                          {colors?.map((c) => (
                          
                            <option key={c.id} value={c.id}>{c.color}</option>
                            ))}
                            </select>
                            {errors.color && (
                            <p style={{ color: "blue", fontWeight: "bold" }}>{errors.color}</p>
                          )}
                        </div>

                        <div>
                        <label htmlFor="capacity" className="letas font-bold">
                          Capacity{" "}
                        </label>
                        <select className="appearance-none border rounded w-full p-1" onChange={(e) => setSelectedCapacity(e.target.value)}>
                          <option hidden>choose a capacity</option>
                          {capacity?.map((c) => (
                          
                            <option key={c.id} value={c.id}>{c.capacity}</option>
                            ))}
                            </select>
                            {errors.capacity && (
                            <p style={{ color: "blue", fontWeight: "bold" }}>{errors.capacity}</p>
                          )}
                        </div>
                          { Object.values(errors).length ===0  &&  <button className="bg-gradient-to-r from-red-500 to-blue-900 text-white font-bold py-2 px-4 rounded mt-6" type="submit"  >
                          Submit 
                        </button>}
                        </div>
                    </form>
                </div>
            </div>
      </div>
  );
};
