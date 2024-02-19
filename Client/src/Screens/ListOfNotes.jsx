import React, { useState } from "react";
import styles from "./ListOfNotes.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import UpdateNote from "../Components/UpdateNote";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { backendApiUrl } from "../Config/Config";
import { toast } from "react-toastify";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const fetchNote = async () => {
  const response = await fetch(`${backendApiUrl}note`);
  const data = await response.json();
  return data.data;
};

const deletenote = (deleteid) => {
  return () =>
    fetch(`${backendApiUrl}note`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: deleteid,
      }),
    });
};
const ListOfNotes = () => {
  const queryClient = useQueryClient();
  const [openalert, setOpenalert] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteid, setdeleteid] = useState("");
  const [updatedata, setupdatedata] = useState("");

  const handleOpen = (data) => {
    setOpen(true);
    setupdatedata(data);
  };

  const handleClose = () => setOpen(false);

  const ClickOpendelete = (id) => {
    setOpenalert(true);
    setdeleteid(id);
  };

  const handleClosedelete = () => {
    setOpenalert(false);
  };
  const UpdateNoteMutation = useMutation(deletenote(deleteid), {
    onSuccess: () => {
      console.log("Success");
      queryClient.invalidateQueries(["notes"]);
      setOpenalert(false);
      toast.success('Note Deleted Successfully', {
        autoClose: 1000,
      });
    },
    onError: (error) => {
      console.log("Error");
      toast.error('Something Went Wrong', { autoClose: 1000 });
    },
  });
  const handledelete = () => {
    UpdateNoteMutation.mutate();
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNote, // staleTime: 10000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Dialog
        open={openalert}
        onClose={handleClosedelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            After delete you cannot get again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosedelete}>Disagree</Button>
          <Button onClick={handledelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateNote updatedata={updatedata} setOpen={setOpen} />
        </Box>
      </Modal>

      <div className={styles.maincard}>
        {data &&
          data?.map((item, index) => {
            return (
              <div key={index} className={styles.innearcard}>
                <p>{item?.note}</p>
                <div>
                  <IconButton onClick={() => ClickOpendelete()}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpen(item)}>
                    <BorderColorIcon />
                  </IconButton>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ListOfNotes;
