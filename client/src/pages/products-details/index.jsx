import React, { useState } from "react";
import "./products-details.css";
import { useParams } from "react-router-dom";
import MySecurity from "../../api/mySecurity";
import { ClientAPI, endPoint } from "../../api/clientAPI";

export const ProductsDetails = () => {
  let { productID } = useParams();
  const [selectedSize, setSelectedSize] = useState("");  
  const [productData, setProductData] = useState(null);

  useEffect(async () => {    
    // let fetch data
    try {
      const data = {
        productID: productID,
      };
      const respond = await ClientAPI.post("getProductDetail", data);
      console.log("From ProductDetail.jsx: ", respond);
      setProductData(MySecurity.decryptedData(respond));     
    }
    catch (err) {
      console.log("From ProductDetail.jsx: ", err);
    }

  }, []);
  // product not found
  const navigate = useNavigate();
  if (productData == null) {
    return navigate.push(`/products?page=1`);
  }

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault(); 
    // let post data
    try {
      const data = {
        productID: productID,        
        size: (selectedSize==""?productData.size.split(",")[0]:selectedSize),
      };
      const respond = await ClientAPI.post("addCart", data);
      console.log("From ProductDetail_AddCart.jsx: ", respond);
    }
    catch (err) {
      console.log("From ProductDetail_AddCart.jsx: ", err);
    }
    window.dispatchEvent(new Event("cartUpdated"));
  };
  
  return (
    <>
      <div id="product-template">
        <div class="product-detail">
          <div class="product-info">
            <img src={endPoint+productData.image} alt={productData.name}></img>
            <div className="product-display">
              <h1 class="font-weight-bold">{productData.name}</h1>

              <div class="product-price-wrap">
                <span class="product-price font-weight-bold">${productData.price}</span>
              </div>

              <div class="product-desc">
                <p></p>
                <p>
                  <span style={{ fontSize: "15px" }}>
                    <strong>OVERSIZED FIT&nbsp;</strong>
                  </span>
                </p>
                <p>
                  <span style={{ fontSize: "14px" }}>
                    <strong>Features:</strong>
                  </span>
                </p>
                {productData.features.split("\n").map((feature, index) => (
                  <p key={index}>
                    <span style={{ fontSize: "14px" }}> • {feature}</span>
                  </p>
                ))}
                <p></p>
                <p></p>
              </div>

              <hr class="product-info-break" />

              <input
                type="hidden"
                id="selected-variant-1050687980"
                value="1113887328"
              />
              <div class="product-options product-options-1050687980">
                <div class="option option-size option-1 d-flex align-items-center">
                  <span
                    class="text-uppercase font-weight-bold"
                    style={{
                      paddingRight: "10px",
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "var(--menu-color)",
                    }}
                  >
                    size:
                  </span>
                  <div className="product-options">
                    <div className="option-values">
                      {productData.size.split(",").map((size) => (
                        <label key={size} className={`size-label ${size === selectedSize ? 'active' : ''}`}>
                          <input
                            type="radio"
                            name="size"
                            value={size}
                            checked={size === selectedSize}
                            onChange={() => handleSizeChange(size)}
                          />
                          {size}
                        </label>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
              <div className="products-policy">
                <a
                  href="#"
                  data-toggle="modal"
                  data-target="#product-sizechart-modal"
                  class="product-size-chart text-uppercase font-weight-bold"
                >
                  Size guide
                </a>
                <div class="policy_pro">
                  <a
                    href="/pages/chinh-sach-doi-tra"
                    class="product-size-chart text-uppercase font-weight-bold"
                  >
                    RETURN POLICY
                  </a>
                </div>

                <a
                  href="#"
                  class="product-add-cart text-uppercase font-weight-bold"
                  onClick={(e) => handleAddToCart(e)}
                >
                  ADD TO CART{" "}
                  <img
                    src="https://file.hstatic.net/200000377411/file/bag_1be0c2089cc348b48ba2ce2672c0e056.png"
                    style={{
                      width: "20px",
                      height: "auto",
                      transform: "translateY(-3px)",
                    }}
                  />
                </a>

                <div class="bh-logo mt-4">
                  <img
                    width="150"
                    height="63"
                    src="/logo.webp"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
