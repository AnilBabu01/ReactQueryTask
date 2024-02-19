import React, { useState } from "react";
import styles from "./AddNote.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backendApiUrl } from "../Config/Config";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
const Add = (note) => {
  return () =>
    fetch(`${backendApiUrl}note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note: note }),
    });
};

const AddNote = () => {
  const queryClient = useQueryClient();
  const [note, setnote] = useState("");

  const { mutate, isLoading, isError } = useMutation(Add(note), {
    onSuccess: () => {
      console.log("Success");
      queryClient.invalidateQueries(["notes"]);
      setnote("");
      toast.success("Note Added Successfully", {
        autoClose: 1000,
      });
    },
    onError: (error) => {
      console.log("Error");
      toast.error("Something Went Wrong", { autoClose: 1000 });
    },
  });

  return (
    <>
      <div className={styles.maindiv}>
        <div>
          <p>Add Your Note</p>
          <div className={styles.formdiv}>
            <label>Note</label>
            <textarea
              placeholder="Enter Your Note"
              value={note}
              onChange={(e) => setnote(e.target.value)}
            />
            <button onClick={(e) => mutate()}>
              {isLoading ? <CircularProgress /> : "Add Note"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNote;
