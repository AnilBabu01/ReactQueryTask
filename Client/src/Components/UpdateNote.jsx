import React, { useState, useEffect } from "react";
import styles from "./UpdateNote.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backendApiUrl } from "../Config/Config";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
const update = (note, updatedata) => {
  return () =>
    fetch(`${backendApiUrl}note`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: updatedata?.id,
        note: note,
      }),
    });
};

const UpdateNote = ({ updatedata, setOpen }) => {
  const queryClient = useQueryClient();
  const [note, setnote] = useState("");

  const { mutate, isLoading, isError } = useMutation(update(note, updatedata), {
    onSuccess: () => {
      console.log("Success");
      queryClient.invalidateQueries(["notes"]);
      setOpen(false);
      toast.success("Note Updated Successfully", {
        autoClose: 1000,
      });
    },
    onError: (error) => {
      console.log("Error");
      toast.error("Something Went Wrong", { autoClose: 1000 });
    },
  });

  useEffect(() => {
    if (updatedata) {
      setnote(updatedata?.note);
    }
  }, []);

  return (
    <>
      <div className={styles.maindiv}>
        <div>
          <p>Update Your Note</p>
          <div className={styles.formdiv}>
            <label>Note</label>
            <textarea
              placeholder="Enter Your Note"
              value={note}
              onChange={(e) => setnote(e.target.value)}
            />
            <button onClick={(e) => mutate()}>
              {isLoading ? <CircularProgress /> : "Edit Note"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateNote;
