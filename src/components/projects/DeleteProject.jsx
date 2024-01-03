import {Button} from "react-bootstrap";
import React from "react";

export default function DeleteProject({id,onDelete}){
  return(
      <>
        <Button onClick={()=> onDelete(id)} className="mt-4" variant="danger">Delete</Button>
      </>
  )
}
