'use client'
import { useFormStatus } from "react-dom";

export default function EditButton() {
    
  const { pending } = useFormStatus();


    return (
        <button className="btn btn-success btn-block d-flex flex-column justify-content-center align-items-center" 
        type="submit">
            {
                pending ? 
                <div className="spinner-border text-success" role="status"/>
                :
                <>
                    Submit
                </>
            }
        </button>
    );
}