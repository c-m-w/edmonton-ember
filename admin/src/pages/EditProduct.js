/// EditProduct.js

import {useState, useEffect} from "react";

import {useParams, useNavigate} from "react-router-dom";

import SubHeader from "../components/SubHeader";
import makeAPIRequest from "../utils/makeAPIRequest";

export default function EditProduct() {

    const [data, setData] = useState();
    const [sizes, setSizes] = useState([]);
    const [i, setI] = useState(0);
    const [deleteCounter, setDeleteCounter] = useState(0);
    const params = useParams();
    const navigate = useNavigate();

    const getData = async () => {

        const response = await makeAPIRequest(`data/products/${params.id}`, "GET");

        if (response.success) {

            setData(response.data);
        }
    }

    useEffect(() => {(async () => {

        if (!data) {

            return;
        }

        const response = await makeAPIRequest(`data/sizes/${data.id}`, "GET");

        if (response.success) {

            setSizes(response.data);
        }
    })()}, [data, i])

    const deleteItem = async () => {

        const response = await makeAPIRequest(`data/products/${params.id}`, "DELETE");

        if (response.success) {

            navigate(-1);
        }
    }

    const incrementDeleteCounter = () => {

        setDeleteCounter(deleteCounter + 1);

        if (deleteCounter + 1 >= 5) {

            deleteItem();
        }
    }

    const changeData = (e) => {
        
        setData(oldData => ({...oldData, [e.target.name]: e.target.value}));
    }

    const addSize = async () => {

        const response = await makeAPIRequest(`data/sizes/${params.id}`, "POST");

        if (response.success) {

            setI(i + 1);
        }
    }

    const cancelEdit = () => {

        navigate(-1);
    }

    const saveSize = async (i, size) => {

        let sizeCopy = structuredClone(size)

        sizeCopy.available = typeof(sizeCopy.available) === "string" ? sizeCopy.available === "true" : sizeCopy.available

        const response = await makeAPIRequest(`data/sizes/${sizeCopy.id}`, "PUT", sizeCopy);
    }

    const saveEdit = async () => {

        const response = await makeAPIRequest(`data/products/${params.id}`, "PUT", data);

        if (response.success) {

            navigate(-1);
        }
    }

    const deleteSize = async (id) => {

        const response = await makeAPIRequest(`data/sizes/${id}`, "DELETE", data);

        if (response.success) {

            setI(i + 1);
        }
    }

    const changeSizeData = (e, i) => {

        const sizesCopy = structuredClone(sizes);

        sizesCopy[i][e.target.name] = e.target.value;
        setSizes(sizesCopy);
        saveSize(i, sizesCopy[i]);
    }

    useEffect(() => {getData()}, []);

    const sizeElements = sizes.map((size, i) => {

        return (
            <div 
                className="edit-sizes-row"
                key={i}>
                <img 
                    src="/assets/icons/trash-light.svg"
                    className="delete-size icon"
                    onClick={() => deleteSize(size.id)} />
                <input 
                    type="number"
                    name="amount"
                    id="amount-input"
                    min="0"
                    value={size.amount}
                    onChange={(e) => changeSizeData(e, i)} />
                <input 
                    type="number"
                    name="price"
                    id="price-input"
                    min="0"
                    value={size.price}
                    onChange={(e) => changeSizeData(e, i)} />
                <select
                    name="available"
                    value={size.available}
                    onChange={(e) => changeSizeData(e, i)}>
                    <option value={false}>Unavailable</option>
                    <option value={true}>Available</option>
                </select>
                <input 
                    type="number"
                    name="stock"
                    id="stock-input"
                    min="0"
                    value={size.stock}
                    onChange={(e) => changeSizeData(e, i)} />
            </div>
        );
    })

    return (
        <>
        {data && 
            <div className="product-editor">
                <SubHeader title="Edit product" showReturnArrow={false} />
                <div className="id-delete">
                    <h2>{data.id}</h2>
                    <div className="delete-product-container">
                        <img 
                            src="/assets/icons/trash-light.svg"
                            className="delete-product icon"
                            onClick={incrementDeleteCounter} />
                        {deleteCounter > 0 && <span className="delete-product-counter">{deleteCounter}</span>}
                    </div>
                </div>
                <div className="edit-values">
                    <label
                        htmlFor="name-input">Name</label>
                    <input 
                        type="text"
                        name="name"
                        id="name-input"
                        value={data.name}
                        onChange={changeData} />
                    <label
                        htmlFor="category">Category</label>
                    <select
                        name="category"
                        value={data.category}
                        onChange={changeData}>
                        <option value="peppers">Peppers</option>
                        <option value="seeds">Seeds</option>
                        <option value="cuttings">Cuttings</option>
                    </select>
                    <label
                        htmlFor="heat">Heat</label>
                    <select
                        name="heat"
                        value={data.heat}
                        onChange={changeData}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <label
                        htmlFor="preview-image">Preview image</label>
                    <input 
                        type="text"
                        name="preview_image"
                        id="preview-image"
                        value={data.preview_image}
                        onChange={changeData} />
                </div>
                <div className="edit-sizes">
                    <h2>Sizes</h2>
                    <div className="edit-sizes-row">
                        <span />
                        <span className="edit-sizes-header">Amount <span className="unit">(g)</span></span>
                        <span className="edit-sizes-header">Price <span className="unit">($)</span></span>
                        <span className="edit-sizes-header">Availability</span>
                        <span className="edit-sizes-header">Count</span>
                    </div>
                    {sizeElements}
                    <img
                        src="/assets/icons/plus-light.svg"
                        className="add-size icon"
                        onClick={() => {addSize()}} />
                </div>
                <div className="edit-actions">
                    <img 
                        src="/assets/icons/ban-light.svg"
                        className="cancel-edit icon"
                        onClick={cancelEdit} />
                    <img 
                        src="/assets/icons/save-light.svg"
                        className="save-edit icon"
                        onClick={() => saveEdit()} />
                </div>
            </div>
        }
        </>
    )
}
