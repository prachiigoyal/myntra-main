import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions";
import Layout from "../../components/Layout";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiShoppingBag } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { MaterialButton } from "../../components/MaterialUI";
import "./style.css";
import { addToCart } from "../../actions";
import { IoIosSearch } from "react-icons/io";
import { FaShuttleVan } from "react-icons/fa";

/**
 * @author
 * @function ProductDetailsPage
 **/

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    const { productId } = props.match.params;
    console.log(props);
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsById(payload));
  }, []);

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }

  return (
    <Layout>
      {/* <div>{product.productDetails.name}</div> */}
      <div className="productDescriptionContainer">
        <div className="flexRow">
          <div className="verticalImageStack">
            {product.productDetails.productPictures.map((thumb, index) => (
              <div className="thumbnail">
                <img src={thumb.img} alt={thumb.img} />
              </div>
            ))}
          </div>
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <img
                src={product.productDetails.productPictures[0].img}
                alt={`${product.productDetails.productPictures[0].img}`}
              />
            </div>

          </div>
        </div>
        <div>
          <div className="breed">
            <ul>
              <li>
                <a href="#">Home</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">Clothing</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">{product.productDetails.name}</a>
              </li>
            </ul>
          </div>
          {/* product description */}
          <div className="productDetails">
            <p className="productTitle">{product.productDetails.name}</p>
            <span className="ratingNumbersReviews">
              72,234 Ratings & 8,140 Reviews
            </span>
            <hr style={{height:"2px",borderWidth:"0",color:"#EAEAEC",backgroundColor:"#EAEAEC"}}></hr>
            {/* <div>
              <span className="ratingCount">
                4.3 <IoIosStar />
              </span>
            </div> */}
            {/* <div className="extraOffer">
              Extra <BiRupee />
              4500 off{" "}
            </div> */}
            <div className="flexRow priceContainer">
              <span className="price">
                Rs. {product.productDetails.price}
              </span>
              <span className="price" style={{ margin: "0 10px" ,color:"#FF905A", fontSize:"20px" }}>
                (22% OFF)
              </span>
            </div>
            <div>
              <p
                style={{
                  color: "#03a685",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >inclusive of all taxes
              </p>
              <div className="flexRow">
              <MaterialButton
                title="ADD TO BAG"
                bgColor="#FF527B"
                textColor="#ffffff"
                style={{
                  marginRight: "5px"
                }}
                icon={<BiShoppingBag/>}
                onClick={() => {
                  const { _id, name, price } = product.productDetails;
                  const img = product.productDetails.productPictures[0].img;
                  dispatch(addToCart({ _id, name, price, img }));
                  props.history.push(`/cart`);
                }}
              />
              <MaterialButton
                title="WISHLIST"
                bgColor="#ffffff"
                textColor="#000000"
                className="wishlistBtn"
                icon={<AiFillThunderbolt />}
              />
              </div>
              <br></br>
              
              <br></br>
              <span className="price">
                DELIVERY OPTIONS 
                <FaShuttleVan
                  style={{
                    marginLeft:"25px"
                  }}
                />
              </span>
              {/* search component */}
        <div
          style={{
            padding: "0 10px",
          }}
        >
          <div className="searchInputPin">
            
            <input
              className="searchInput"
              placeholder={110025}
            />
            <div className="searchIconContainer">
              <a href="https://hackerramp-myntra-locator.herokuapp.com" style={{textDecoration:"none"}}>CHECK</a>   
            </div>
          </div>
        </div>
        {/* search component ends here */}
        <p style={{ display: "flex",
                    fontSize: "12px",
                    color: "#878787",}}>
                      Please enter PIN code to check delivery time & Pay on Delivery Availability or to check Availability in nearby Myntra Store</p>
              <p style={{ display: "flex" }}>
                <span
                  style={{
                    width: "100px",
                    fontSize: "12px",
                    color: "#878787",
                    fontWeight: "600",
                    marginRight: "20px",
                  }}
                >
                  Description
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#212121",
                  }}
                >
                  {product.productDetails.description}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;

