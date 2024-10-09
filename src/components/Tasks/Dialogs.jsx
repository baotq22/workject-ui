import { Dialog } from "@headlessui/react";
import { ModalWrapper } from "../../components";
import { QuestionMark } from '@mui/icons-material';
import clsx from "clsx";
import { Button } from "@mui/material";

export const ConfirmationDialog = ({
  open,
  setOpen,
  msg,
  setMsg = () => { },
  onClick = () => { },
  type = "delete",
  setType = () => { },
}) => {
  const closeDialog = () => {
    setType("delete");
    setMsg(null);
    setOpen(false);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={closeDialog}>
        <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
          <Dialog.Title as='h3' className=''>
            <p
              className={clsx(
                "p-3 rounded-full ",
                type === "restore" || type === "restoreAll"
                  ? "text-yellow-600 bg-yellow-100"
                  : "text-red-600 bg-red-200"
              )}
            >
              <QuestionMark size={60} />
            </p>
          </Dialog.Title>

          <p className='text-center text-gray-500'>
            {msg ?? "Are you sure you want to delete the selected record?"}
          </p>

          <div className='bg-gray-50 dark:bg-slate-700 dark:border-slate-800 py-3 sm:flex sm:flex-row-reverse gap-4'>
            <Button
              variant="contained"
              color={type === "restore" || type === "restoreAll" ? "success" : "error"}
              onClick={onClick}
              style={{ marginTop: '1rem' }}
            >{type === "restoreAll" ? "Restore" : "Delete"}</Button>

            <Button variant="contained" color="info" fullWidth style={{ marginTop: '1rem' }} onClick={() => closeDialog()}>Cancel</Button>

          </div>
        </div>
      </ModalWrapper>
    </>
  );
}

export function UserAction({ open, setOpen, onClick = () => { } }) {
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={closeDialog}>
        <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
          <Dialog.Title as='h3' className=''>
            <p className={clsx("p-3 rounded-full ", "text-red-600 bg-red-200")}>
              <QuestionMark size={60} />
            </p>
          </Dialog.Title>

          <p className='text-center text-gray-500'>
            {"Are you sure you want to activate or deactive this account?"}
          </p>

          <div className='bg-gray-50 dark:bg-slate-700 py-3 sm:flex sm:flex-row-reverse gap-4'>
            <Button
              type='button'
              variant="contained"
              color="error"
              className='bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto border hover:bg-red-400'
              onClick={() => closeDialog()}
            >No</Button>
            <Button
              type='button'
              variant="contained"
              color="success"
              className={clsx(
                " px-8 text-sm font-semibold text-white sm:w-auto",
                "hover:bg-green-500"
              )}
              onClick={onClick}
            >Yes</Button>

            
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}