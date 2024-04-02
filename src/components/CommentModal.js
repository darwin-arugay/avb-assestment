import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";

import {
  closeCommentsModal,
  getViewCommentsModalOpen,
} from "store/slices/view";

import { addNewComment } from "store/slices/comment";

import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { capitalize } from "utils";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => {
  return {
    modal: {
      display: "flex",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      position: "absolute",
      width: 500,
      height: "auto",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: 5,
      display: "flex",
      flexDirection: "column",
      gap: 15,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    form: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 20,
    },
    formControl: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
    },
  };
});

const CommentModal = () => {
  const MAX_COMMENT_CHARS = 300,
    MIN_COMMENT_CHARS = 15,
    MAX_NAME_CHARS = 30,
    MIN_NAME_CHARS = 3;

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      comment: "",
    },
    mode: "onSubmit",
  });

  const isNameError = !!errors?.name;
  const nameErrMsg = errors?.name?.message;
  const isCommentError = !!errors?.comment;
  const commentErrMsg = errors?.comment?.message;

  const isOpen = useSelector(getViewCommentsModalOpen);

  const handleClose = () => dispatch(closeCommentsModal());

  const handleOpenSnaclbar = () => setOpenSnackbar(true);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const onSubmit = async (data) => {
    dispatch(addNewComment(data));
    handleClose();
    reset();
    handleOpenSnaclbar();
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper} onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.header}>
            <Typography variant="h6">Add comment</Typography>
            <Tooltip
              title="Close"
              aria-labelledby="close-modal"
              placement="left"
              arrow
            >
              <IconButton>
                <CloseIcon onClick={handleClose} />
              </IconButton>
            </Tooltip>
          </div>
          <form className={classes.form}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "This is a required field.",
                minLength: {
                  value: MIN_NAME_CHARS,
                  message: `Minimum value would be atleast ${MIN_NAME_CHARS} characters`,
                },
                maxLength: {
                  value: MAX_NAME_CHARS,
                  message: `Maximum value would be ${MAX_NAME_CHARS} characters`,
                },
              }}
              render={({ field: { onChange, ...rest } }) => {
                return (
                  <FormControl fullWidth className={classes.formControl}>
                    <FormLabel error={isNameError}>Name*</FormLabel>
                    <TextField
                      id="name"
                      {...rest}
                      onChange={(e) => {
                        const newValue = capitalize(e.target.value);
                        onChange(newValue);
                      }}
                      variant="outlined"
                      error={isNameError}
                    />
                    {isNameError && (
                      <FormHelperText error>{nameErrMsg}</FormHelperText>
                    )}
                  </FormControl>
                );
              }}
            />

            <Controller
              name="comment"
              control={control}
              rules={{
                required: "This is a required field.",
                minLength: {
                  value: MIN_COMMENT_CHARS,
                  message: `Minimum value would be atleast ${MIN_COMMENT_CHARS} characters`,
                },
                maxLength: {
                  value: MAX_COMMENT_CHARS,
                  message: `Maximum value would be ${MAX_COMMENT_CHARS} characters`,
                },
              }}
              render={({ field: { value, ...rest } }) => {
                return (
                  <FormControl fullWidth className={classes.formControl}>
                    <FormLabel error={isCommentError}>Comment*</FormLabel>
                    <TextField
                      id="comment"
                      {...rest}
                      multiline
                      rows={10}
                      variant="outlined"
                      value={value}
                      error={isCommentError}
                    />

                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      {isCommentError && (
                        <FormHelperText error>{commentErrMsg}</FormHelperText>
                      )}
                      <FormHelperText
                        style={{ marginLeft: "auto" }}
                      >{`${value.length}/${MAX_COMMENT_CHARS}`}</FormHelperText>
                    </div>
                  </FormControl>
                );
              }}
            />

            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </form>

          <Alert severity="warning" style={{ marginTop: 15 }}>
            Warning: Fields with asterisk(*) indicating that it is a required
            field.
          </Alert>
        </div>
      </Modal>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Your comment was successfully added, keep posting!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CommentModal;
