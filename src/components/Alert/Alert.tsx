import React from 'react';
import CloseButton from "@/components/Buttons/CloseButton";

function Alert({err, closeFunction}: any) {
    const {is, msg} = err;
    return (
        <div>
            {
                is &&
                <div className="flex justify-evenly items-center">
                    <p className="text-red-500">{msg} </p>
                    <div onClick={() => closeFunction({is: false, msg: ""})}>
                        <CloseButton/>
                    </div>
                </div>
            }
        </div>
    );
}

export default Alert;