import {ClipLoader} from "react-spinners";
import React from "react";

export default function Spinner({loading}) {
    return (
        <>
            {
                loading &&
                <div>
                    <ClipLoader color="#36D7B7" loading={loading} size={50}/>
                </div>
            }
        </>
    )
}
