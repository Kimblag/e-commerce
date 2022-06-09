import React, { useState,useEffect } from "react";
import { useSelector,useDispatch} from "react-redux";
import { ModificationReview } from "../../redux/actions";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "react-toastify";

import '../../styles/reviewUser.css'

const ReviewUserEdit = ({ setOpen, id }) => {
    const dispatch = useDispatch()

    const [number, setNumber] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);
  
    const [input, setInput] = useState({
      rating: Number(""),
      commentary: "",
      id: id,
    });
  console.log(input)
  
  useEffect(() => {
    setInput({
      ...input,
      id:id,
    })
  }, [number])
  useEffect(() => {
    setInput({
      ...input,
      rating: number
    })
  }, [number])
  
    function handleChange(e) {
      e.preventDefault();
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  
    function handleSubmit(e) {
      e.preventDefault()
  
      if (input.rating === "" || input.commentary === "") {
        return  toast.warning("Complete the category!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      } else {
        dispatch(ModificationReview(input))
        toast("Thank you for leaving your opinion!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setInput({
          rating: "",
          commentary: "",
         
        });
        setOpen(false)
      }
    }
  
    const handleText = () => {
      switch (number || hoverStar) {
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
  
    const handlePlaceHolder = () => {
      switch (number || hoverStar) {
        case 0:
          return "Comment here...";
        case 1:
        case 2:
        case 3:
        case 4:
          return "What is your problem?";
        case 5:
          return "Why do you like the product?";
        default:
          return "Comment here...";
      }
    };
  return (
    <div style={{maxWidth: "500px"}} className="flex flex-1 flex-col m-5 border-2 rounded-md p-3">
    <form className="review_form " onSubmit={(e) => handleSubmit(e)}>
      <div className="review_inner_container">
        <h3 className="text-center text-[20px] mb-3" >What do you think about your product?</h3>
        <h3 className="text-center text-indigo-600 italic text-[20px] mb-3">{handleText()}</h3>
        <div className="flex flex-row justify-center ">
          {Array(5)
            .fill()
            .map((_, index) =>
              number >= index + 1 || hoverStar >= index + 1 ? (
                <AiFillStar
                  className="items-center"
                  onMouseOver={() => !number && setHoverStar(index + 1)}
                  onMouseLeave={() => setHoverStar(undefined)}
                  style={{ color: "orange" }}
                  onClick={() => setNumber(index + 1)}
                />
              ) : (
                <AiOutlineStar
                  className="text-center text-xl"
                  onMouseOver={() => !number && setHoverStar(index + 1)}
                  onMouseLeave={() => setHoverStar(undefined)}
                  style={{ color: "orange" }}
                  onClick={() => setNumber(index + 1)}
                />
              )
            )}
        </div>
      </div>
      <div className="flex flex-col m-3 items-center">
        <label>
          <h3 className="m-3 text-center"> Tell to other people about your product</h3>
          <input
            className="m-3  p-3 border-2 w-full rounded-md"
            type="text"
            name="commentary"
            value={input.commentary}
            placeholder={handlePlaceHolder()}
            onChange={(e) => handleChange(e)}
          />
        </label>

        <button className="btn" type="submit"> Send</button>
      </div>
    </form>

  </div>
  )
}

export default ReviewUserEdit