import {Button, Form} from "react-bootstrap";
import React from "react";

export default function SubmitBtn({handleImageSubmit,url}){
    return(
        <Form>
            <Button variant="primary" onClick={()=>handleImageSubmit(url)}>
                Submit
            </Button>
        </Form>

    )
}
