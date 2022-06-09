import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import { Divider } from "@material-ui/core";

const ReviewProductDetail = ({ number, arrayCommentary, totalLength }) => {
  return (
    <div className="flex flex-col items-center justify-center m-5">
      <h2 className="text-4xl mb-3 border-b-2">Customer Reviews</h2>
      <div>
        {number === 0 || number === "NaN" ? null : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="">
              <div className="flex flex-row items-center justify-around">
                <h3 className="text-[30px] text-center bold">{number}</h3>
                {Array(5)
                  .fill()
                  .map((_, index) =>
                    number >= index + 1 ? (
                      <AiFillStar className="" style={{ color: "orange" }} />
                    ) : (
                      <AiOutlineStar className="" style={{ color: "orange" }} />
                    )
                  )}
              </div>
              <p className="m-5">
                Average between <b>{totalLength}</b> opinions
              </p>
              <Divider />
            </div>
            <hr />
            <div className="flex flex-col m-3">
              {arrayCommentary?.map((e, index) => (
                  <div className="flex flex-row items-center justify-between" key={index}>
                    <ModeCommentIcon style={{fontSize: "20px", margin:"2"}} />
                  {Array(5)
                    .fill()
                    .map((_, index) =>
                      e.rating >= index + 1 ? (
                        <AiFillStar className="m-1" style={{ color: "orange" }} />
                      ) : (
                        <AiOutlineStar
                          className="m-1"
                          style={{ color: "orange" }}
                        />
                      )
                    )}

                  <h4 className="m-1 text-center text-xl"> {e.commentary} </h4>
                </div>
              ))}
            </div>
            <hr />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewProductDetail;
