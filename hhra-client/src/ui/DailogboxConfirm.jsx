import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialogBox(props) {
  const handleClose = () => {
    props.onSetOpenDailog();
  };

  return (
    <Dialog
      open={props.openDailog}
      TransitionComponent={Transition}
      keepMounted
      // onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        <div style={{ width: "200px" }}>
          {<h5 style={{ fontSize: "15px", fontWeight: "bold" }}> {props.title}</h5>}
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {props.isLoading ? (
            <i
              className="fas fa-spinner fa-pulse fa-2x"
              style={{ position: "relative", top: "0%", left: "40%" }}
            ></i>
          ) : (
            <div style={{ fontSize: "14px" }}>{props.des}</div>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {props.isLoading ? null : (
          <div>
            <button
              style={{
                borderRadius: "10px",
                padding: "5px 10px",
                fontSize: "13px",
                marginRight: "10px",
              }}
              type="button"
              className="btn btn-success"
              onClick={() => props.handleConfirmOkBtn()}
            >
              Ok
            </button>
            <button
              style={{
                borderRadius: "10px",
                fontSize: "13px",
                padding: "5px 10px",
              }}
              onClick={handleClose}
              type="button"
              className="btn btn-danger"
            >
              Close
            </button>
          </div>
        )}
      </DialogActions>
    </Dialog>
  );
}
