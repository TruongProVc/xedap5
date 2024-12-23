import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [productdetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specifications, setSpecifications] = useState([]);

  // Hàm gọi API chi tiết sản phẩm
  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/productdetails/${id}`);
      if (!response.ok) throw new Error('Failed to fetch product details');
      const data = await response.json();
      setProductDetails(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm gọi API thông số kỹ thuật
  const fetchSpecifications = async () => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}/specifications`);
      if (!response.ok) throw new Error('Failed to fetch specifications');
      const data = await response.json();
      setSpecifications(data.data); // Lấy mảng specifications từ API
    } catch (error) {
      setError(error.message);
    }
  };

  // Hàm thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product) => {
    try {
      let cart = JSON.parse(localStorage.getItem('cart')) || []; // Lấy giỏ hàng từ localStorage, nếu không có thì khởi tạo giỏ hàng mới
  
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingProductIndex = cart.findIndex(item => item.ProductId === product.ProductId);
  
      if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã có, tăng số lượng
        cart[existingProductIndex].Quantity += 1;
      } else {
        // Nếu sản phẩm chưa có, thêm mới
        cart.push({
          ProductId: product.ProductId,
          ProductName: product.ProductName,
          Price: product.Price,
          Quantity: 1, // Mặc định là 1
        });
      }
  
      // Lưu giỏ hàng vào localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
  
      alert('Sản phẩm đã được thêm vào giỏ hàng!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Thêm sản phẩm vào giỏ hàng thất bại');
    }
  };
  

  // useEffect để gọi API
  useEffect(() => {
    fetchProductDetails();
    fetchSpecifications();
  }, [id]);

  if (isLoading) return <p>Loading product details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="breadcrumb-section breadcrumb-bg-color--golden">
        <div className="breadcrumb-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 className="breadcrumb-title">Chi tiết sản phẩm</h3>
                <div className="breadcrumb-nav breadcrumb-nav-color--black breadcrumb-nav-hover-color--golden">
                  <nav aria-label="breadcrumb">
                    <ul>
                      <li>
                        <a href="index.html">Trang chủ - Chi tiết sản phẩm</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Breadcrumb Section */}

      {/* Start Product Details Section */}
      <div className="product-details-section ">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-6">
              <div className="product-details-gallery-area" data-aos="fade-up" data-aos-delay={0}>
                {/* Start Large Image */}
                <div className="product-large-image product-large-image-horizontal swiper-container">
                  <div className="swiper-wrapper">
                    <div className="product-image-large-image">
                      <img
                        src={`http://localhost:3000/uploads/${productdetails?.Avatar}`} // Đường dẫn ảnh
                        alt={productdetails?.ProductName}
                      />
                    </div>
                  </div>
                </div>
                {/* End Large Image */}
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <div className="product-details-content-area" data-aos="fade-up" data-aos-delay={200}>
                {/* Start Product Details Text Area*/}
                <div className="product-details-text">
                  <h4 className="title">{productdetails?.ProductName}</h4>
                  <div className="d-flex align-items-center">
                    <ul className="review-star">
                      <li className="fill">
                        <i className="ion-android-star" />
                      </li>
                      <li className="fill">
                        <i className="ion-android-star" />
                      </li>
                      <li className="fill">
                        <i className="ion-android-star" />
                      </li>
                      <li className="fill">
                        <i className="ion-android-star" />
                      </li>
                      <li className="empty">
                        <i className="ion-android-star" />
                      </li>
                    </ul>
                  </div>
                  <div className="price">
                    {Number(productdetails?.Price).toLocaleString()} VNĐ
                  </div>
                  <p>Mô tả: {productdetails?.Description}</p>
                </div>
                {/* End Product Details Text Area*/}
                {/* Start Product Variable Area */}
                <div className="product-details-variable">
                  <div className="variable-single-item">
                    <div className="product-stock">
                      <span className="product-stock-in">
                        <i className="ion-checkmark-circled" />
                      </span> 200 IN STOCK
                    </div>
                  </div>
                  {/* Product Variable Single Item */}
                  <div className="d-flex align-items-center">
                    <div className="product-add-to-cart-btn">
                    <a href="#" onClick={() => handleAddToCart(productdetails)}>
                      Add To Cart
                    </a>                    
                </div>
                  </div>
                </div>  
                {/* End Product Variable Area */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Product Details Section */}

      {/* Start Product Content Tab Section */}
      <div className="product-details-content-tab-section section-top-gap-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="product-details-content-tab-wrapper" data-aos="fade-up" data-aos-delay={0}>
                {/* Start Product Details Tab Button */}
                <ul className="nav tablist product-details-content-tab-btn d-flex justify-content-center">
                  <li>
                    <a className="nav-link active" data-bs-toggle="tab" href="#specifications">
                      Thông số kỹ thuật
                    </a>
                  </li>
                </ul>
                {/* End Product Details Tab Button */}
                {/* Start Product Details Tab Content */}
                <div className="product-details-content-tab">
                  <div className="tab-content">
                    <div className="tab-pane active show" id="specifications">
                      <div className="single-tab-content-item">
                        {/* Start Technical Specifications Table */}
                        <div className="specifications-table-wrapper">
                          <table className="table table-bordered">
                            <tbody>
                              {specifications.length > 0 ? (
                                specifications.map((spec, index) => (
                                  <tr key={index}>
                                    <th>{spec.SpecificationName}</th>
                                    <td>{spec.SpecificationContent}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="2">Không có thông số kỹ thuật nào.</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                        {/* End Technical Specifications Table */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Product Details Tab Content */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Product Content Tab Section */}ư {/* Start Product Content Tab Section */}
  <div className="product-details-content-tab-section section-top-gap-100">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div
            className="product-details-content-tab-wrapper"
            data-aos="fade-up"
            data-aos-delay={0}
          >
            {/* Start Product Details Tab Button */}
            <ul className="nav tablist product-details-content-tab-btn d-flex justify-content-center">
              <li>
                <a
                  className="nav-link active"
                  data-bs-toggle="tab"
                  href="#review"
                >
                  Reviews (1)
                </a>
              </li>
            </ul>{" "}
            {/* End Product Details Tab Button */}
            {/* Start Product Details Tab Content */}
            <div className="product-details-content-tab">
              <div className="tab-content">
                {/* Start Product Details Tab Content Singel */}
                <div className="tab-pane active show" id="review">
                  <div className="single-tab-content-item">
                    {/* Start - Review Comment */}
                    <ul className="comment">
                      {/* Start - Review Comment list*/}
                      <li className="comment-list">
                        <div className="comment-wrapper">
                          <div className="comment-content">
                            <div className="comment-content-top">
                              <div className="comment-content-left">
                                <h6 className="comment-name">Kaedyn Fraser</h6>
                                <ul className="review-star">
                                  <li className="fill">
                                    <i className="ion-android-star" />
                                  </li>
                                  <li className="fill">
                                    <i className="ion-android-star" />
                                  </li>
                                  <li className="fill">
                                    <i className="ion-android-star" />
                                  </li>
                                  <li className="fill">
                                    <i className="ion-android-star" />
                                  </li>
                                  <li className="empty">
                                    <i className="ion-android-star" />
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="para-content">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Tempora inventore dolorem a
                                unde modi iste odio amet, fugit fuga aliquam,
                                voluptatem maiores animi dolor nulla magnam ea!
                                Dignissimos aspernatur cumque nam quod sint
                                provident modi alias culpa, inventore deserunt
                                accusantium amet earum soluta consequatur quasi
                                eum eius laboriosam, maiores praesentium
                                explicabo enim dolores quaerat! Voluptas ad
                                ullam quia odio sint sunt. Ipsam officia, saepe
                                repellat.
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>{" "}
                      {/* End - Review Comment list*/}
                      {/* Start - Review Comment list*/}
                      <li className="comment-list">
                        <div className="comment-wrapper">
                          <div className="comment-content">
                            <div className="comment-content-top">
                              <div className="comment-content-left">
                                <h6 className="comment-name">Kaedyn Fraser</h6>
                                <ul className="review-star">
                                  <li className="fill">
                                    <i className="ion-android-star" />
                                  </li>
                                  <li className="fill">
                                    <i className="ion-android-star" />
                                  </li>
                                  <li className="fill">
                                    <i className="ion-android-star" />
                                  </li>
                                  <li className="fill">
                                    <i className="ion-android-star" />
                                  </li>
                                  <li className="empty">
                                    <i className="ion-android-star" />
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="para-content">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Tempora inventore dolorem a
                                unde modi iste odio amet.
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>{" "}
                      {/* End - Review Comment list*/}
                    </ul>{" "}
                    {/* End - Review Comment */}
                    <div className="review-form">
                      <div className="review-form-text-top">
                        <h5>ADD A REVIEW</h5>
                      </div>
                      <form action="#" method="post">
                        <div className="row">
                          <div className="col-12">
                            <div className="default-form-box">
                              <label htmlFor="comment-review-text">
                                Your review
                                <span>*</span>
                              </label>
                              <textarea
                                id="comment-review-text"
                                placeholder="Write a review"
                                required=""
                                defaultValue={""}
                              />
                            </div>
                          </div>
                          <div className='checkout_btn'>
                          <div className="col-12">
                            <button
                              className="btn btn-md btn-pink"
                              type="submit"
                            >
                              Gửi
                            </button>
                          </div>
                          </div>
                         
                        </div>
                      </form>
                    </div>
                  </div>
                </div>{" "}
                {/* End Product Details Tab Content Singel */}
              </div>
            </div>{" "}
            {/* End Product Details Tab Content */}
          </div>
        </div>
      </div>
    </div>
  </div>{" "}
  {/* End Product Content Tab Section */}
    </>
  );
};

export default ProductDetails;
