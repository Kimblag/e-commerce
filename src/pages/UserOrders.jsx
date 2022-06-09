import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button, TablePagination } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { DataGrid } from "@material-ui/data-grid";

import "../styles/userOrders.css";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const UserOrders = () => {
  const classes = useStyles();
  const userInfo = useSelector((state) => state.userInfo);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getOrders = useCallback(async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/shoppingcart/History`,
        { email: userInfo.email }
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [userInfo.email]);

  console.log(data);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "email",
      headerName: "Customer",
      width: 200,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 200,
      editable: false,
    },
    {
      field: "Details",
      headerName: "Details",
      width: 140,
      height: 300,
      renderCell: (params) => {
        return (
          <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<MoreHorizIcon />}
                  >
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/order-detail/${params.row.id}`}
                    >
                      Details
                    </Link>
                  </Button>
        );
      },
    },
  ];
  

  return (
    <>
      {data.length > 0 ? (
        <>
          <div style={{ margin: "20px", height: 400, width: "100%", maxWidth: "1000px" }}>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={5}
              disableSelectionOnClick
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col w-[100%] p-52 items-center">
          <p className="text-center text-2xl font-bold">
            Oops! It seems you have no orders
          </p>

          <p className="mt-4">
            <SentimentVeryDissatisfiedIcon />
          </p>
          <button
            onClick={() => navigate("/catalogue")}
            className="btn w-[200px] mt-5"
          >
            Go to Shopping
          </button>
        </div>
      )}
    </>
  );
};

export default UserOrders;
