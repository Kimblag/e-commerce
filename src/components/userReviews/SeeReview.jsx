import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { see_ReviewIdUser } from "../../redux/actions";
import ReviewUserEdit from "./ReviewUserEdit";

const SeeReview = ({ email, productId }) => {
  const userInfo = useSelector((state) => state.reviews_user_id);
  console.log(userInfo?.data?.id);
  const dispatch = useDispatch();
  const [number, setNumber] = useState("");
  const [open, setOpen] = useState(false);
  const stateModifyReview = useSelector((state) => state.postMsjReview);

  useEffect(() => {
    dispatch(see_ReviewIdUser({ productId: productId, email: email }));
  }, []);

  useEffect(() => {
    setNumber(userInfo?.data?.rating);
  }, [userInfo]);

  useEffect(() => {
    dispatch(see_ReviewIdUser({ productId: productId, email: email }));
  }, [stateModifyReview]);

  let id = userInfo?.data?.id;

  const handleText = () => {
    switch (number ) {
      case 0:
        return "Evaluate";
      case 1:
        return "Dissatifation";
      case 2:
        return "Unsatisfied";
      case 3:
        return "Normal";
      case 4:
        return "Satisfied";
      case 5:
        return "Very Satisfied";
      default:
        return "Evaluate";
    }
  };
  
  function openComponente(e){
  setOpen(!open)
  }
  
  

  return (
    <div className="flex flex-1 flex-col m-5 border-2 rounded-md p-3">
      <h3 className="text-center text-[20px] mb-3">Thanks for your opinion</h3>
      <hr></hr>
      <div className="">
      <h3 className="text-center text-indigo-600 italic text-[20px] mb-3">{handleText()}</h3>

      <div className="flex flex-row justify-center">
            {Array(5)
              .fill()
              .map((_, index) =>
                number >= index + 1 ? (
                  <AiFillStar className=""
                    style={{ color: "orange" }}
                    // onClick={() => setNumber(1)}
                  />
                ) : (
                  <AiOutlineStar className=""
                    style={{ color: "orange" }}
                    // onClick={() => setNumber(1)}
                  />
                )
              )}
          </div>

        <h3 className="m-3 text-center">{userInfo?.data?.commentary}</h3>

        <button className="btn" onClick={(e)=>openComponente(e)}>Modification</button>

       { open && <ReviewUserEdit setOpen={setOpen}  rating={userInfo?.data?.rating} commentary={userInfo?.data?.commentary}
               email={email} producId={productId} id ={id} />}
      </div>
    </div>
  );
};

export default SeeReview;
