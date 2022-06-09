import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import NewsLetter from "../components/newsletter/Newsletter";
import { getAllProducts, getAllRewies, getEmailReview, getProductById } from "../redux/actions";
import BreadCrumbs from "../components/breadcrumb/BreadCrumbs";
import ReviewUser from "../components/userReviews/ReviewUser";
import SeeReview from "../components/userReviews/SeeReview";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const OrderDetail = () => {
  const classes = useStyles();
  var { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const products = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [idSend, setIdSend] = useState("");
  const stateReview = useSelector((state) => state.All_Review);
  const stateModifyReview = useSelector((state) => state.postMsjReview);
  const userEmail_review = useSelector((state) => state.email_reviews);


  const getOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/shoppingcart/allhistory`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (idSend) {
      dispatch(getAllRewies(idSend));
    }
  }, [idSend]);

  useEffect(() => {
    getOrders();
    dispatch(getAllProducts());
    dispatch(getAllRewies(idSend));
    if (userInfo) {
      dispatch(getEmailReview(userInfo.email));
    }
  }, [stateModifyReview]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getEmailReview(userInfo.email));
    }
  }, []);

  function abrirComponente(e) {
    setOpen(!open);
    setIdSend(e.target.value);
  }

  let verifyInfoUser = userEmail_review?.data?.map((e) => e.productId);

  const location = useLocation();
  const { pathname } = location;
  var idAsc = 1;

  return (
    <>
      <Navbar />
      <BreadCrumbs pathname={pathname} />
      <div
        style={{
          margin: "20px",
          width: "1250px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          maxWidth: "1250px",
        }}
      >
        <Paper style={{ padding: "20px" }}>
          <h1>Order Detail</h1>
          <hr />
          {data && data?.map((item) =>
            item.id === parseInt(id) ? (
              <main key={idAsc++}>
                <p>
                  <b>Order N°: </b> {item.id}
                </p>
                <p>
                  <b>Customer: </b> {item.email}
                </p>
                <p>
                  <b>Date: </b> {item.createdAt}
                </p>
                <p>
                  <b>Status: </b>{" "}
                  {item.statusOpen === false ? "Closed" : "Open"}
                </p>
                <br />
                <br />
                {item?.orders?.map((order) => (
                  <List key={idAsc++}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          style={{
                            width: "150px",
                            height: "150px",
                            boxShadow: "10px 10px 20px -8px rgba(0,0,0,0.75)",
                            margin: "10px",
                          }}
                          alt="shoes"
                          src={String(
                            products
                              .filter(
                                (product) => product.id === order.productId
                              )
                              .map((img) => img.image)
                          )}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        style={{ marginLeft: "10px" }}
                        primary={products
                          .filter((product) => product.id === order.productId)
                          .map((img) => (
                            <Link
                              key={order.productId}
                              style={{ textDecoration: "none", color: "black" }}
                              to={`/details/${order.productId}`}
                              onClick={() =>
                                dispatch(getProductById(order.productId))
                              }
                            >
                              {img.model}
                            </Link>
                          ))}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              <b>Product Id: </b> {order.productId}
                            </Typography>
                            <br />
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              <b>Product Size: </b> {order.sizeId}
                            </Typography>
                            <br />
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              <b>Quantity: </b> {order.quantity}
                            </Typography>
                            <br />
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              <b>Total: </b>{" "}
                              {order.quantity *
                                products
                                  .filter(
                                    (product) => product.id === order.productId
                                  )
                                  .map((img) => img.price)}
                            </Typography>
                          </>
                        }
                      ></ListItemText>
                      <br />
                    </ListItem>

                    <Divider />
                    <button
                    className="btn m-3"
                      value={order.productId}
                      onClick={(e) => abrirComponente(e)}
                    >
                      Comment on the product
                    </button>

                    {open && !verifyInfoUser.includes(order.productId) && (
                      <ReviewUser
                        email={item.email}
                        producId={order.productId}
                        setOpen={setOpen}
                      />
                    )}

                    {open && verifyInfoUser.includes(order.productId) && (
                      <SeeReview
                        email={item.email}
                        productId={order.productId}
                      />
                    )}
                  </List>
                ))}
              </main>
            ) : null
          )}
        </Paper>
      </div>
      <NewsLetter />
      <Footer />
    </>
  );
};

export default OrderDetail;
