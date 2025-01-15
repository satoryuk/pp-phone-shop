import React from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                borderRadius: "50%",
                padding: "1px",
                zIndex: 1,
            }}
            onClick={onClick}
        >
            <span style={{ color: "black", fontSize: "22px" }}><IoMdArrowDropleft /></span>
        </div>
    );
};

const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",

                borderRadius: "50%",
                padding: "1px",
                zIndex: 1,
            }}
            onClick={onClick}
        >
            <span style={{ color: "black", fontSize: "22px" }}><IoMdArrowDropright /></span>
        </div>
    );
};

export { CustomPrevArrow, CustomNextArrow };
