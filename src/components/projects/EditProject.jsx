import {Button} from "react-bootstrap";
import React from "react";

export default function EditProject({handleToggleModal, onEdit, data}) {
  // console.log('EditProject',data)
  return (
      <>
        <Button onClick={() => {
          handleToggleModal()
          onEdit(data)
        }} className="mt-4" variant="warning">Edit</Button>
      </>
  )
}
