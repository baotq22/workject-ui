import { useState } from 'react'

import { toast } from 'react-toastify'
import { Dialog } from '@headlessui/react'
import { getStorage, uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage'
import { Box, Button, CircularProgress, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Image } from '@mui/icons-material';

import { LISTS, PRIORIRY } from '../../utils'
import { app } from '../../utils/firebase'
import { ModalWrapper, UserList, SelectList } from '../../components'
import { useCreateTaskMutation, useUpdateTaskMutation } from '../../redux/slices/api/taskApiSlice'

import 'react-toastify/dist/ReactToastify.css';

const uploadedFileURLs = [];

export const AddTaskModal = ({ open, setOpen, task }) => {
  const todayDate = new Date().toISOString().split('T')[0];

  const defaultValues = {
    title: task?.title || "",
    date: task ? new Date(task?.date).toISOString().split('T')[0] : todayDate,
    team: [],
    stage: "",
    priority: "",
    assets: [],
  };
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });
  const [team, setTeam] = useState(task?.team || "");
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORIRY[2]
  );
  const [assets, setAssets] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const URLs = task?.assets ? [...task.assets] : [];

  const handleSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setAssets(selectedFiles);

    const imagePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(imagePreviews);
  };

  const uploadFile = async (file) => {
    const storage = getStorage(app);
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("uploading");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              uploadedFileURLs.push(downloadURL);
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  }

  const submitHandler = async (data) => {
    for (const file of assets) {
      setUploading(true);
      try {
        await uploadFile(file);
      } catch (error) {
        toast.error("Error uploading file");
        return;
      } finally {
        setUploading(false);
      }
    }

    try {
      const newData = {
        ...data,
        assets: [...URLs, ...uploadedFileURLs],
        team,
        stage,
        priority
      };

      const res = task?._id
        ? await updateTask({ ...newData, _id: task._id }).unwrap()
        : await createTask(newData).unwrap();

      toast.success(res.message);

      setTimeout(() => {
        setOpen(false);
      }, 500);
    } catch (error) {
      toast.error("Failed", error);
      console.log(error);
    }
  }

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title
          as='h2'
          className='text-base font-bold leading-6 text-gray-900 dark:text-white mb-4'
        >
          {task ? "UPDATE" : "ADD"} TASK
        </Dialog.Title>
        <Box className="mt-2 flex flex-col gap-6">
          <Box className="bg-white dark:bg-slate-700 flex flex-col">
            <TextField
              label="Task Title"
              name="title"
              error={!!errors.title}
              helperText={errors.title?.message}
              {...register('title', {
                required: 'Title is required',
                pattern: {
                  value: /^[a-zA-Z0-9\s]+$/,
                  message: 'Enter a valid title',
                },
              })}
              InputProps={{
                sx: {
                  color: 'white',
                },
              }}
              InputLabelProps={{
                sx: {
                  color: 'white',
                },
              }}
              sx={{
                '.MuiFormHelperText-root': {
                  color: 'white',
                },
              }}
            />
          </Box>
          <UserList
            setTeam={setTeam}
            team={team}
          />

          <Box className="flex gap-4">
            <SelectList
              label="List Stage"
              lists={LISTS}
              selected={stage}
              setSelected={setStage}
            />

            <SelectList
              label='Priority Level'
              lists={PRIORIRY}
              selected={priority}
              setSelected={setPriority}
            />
          </Box>

          <Box className='flex gap-4'>
            <Box className="w-full">
              <TextField
                label="Task Date"
                type="date"
                name="date"
                fullWidth
                {...register('date', {
                  required: 'Date is required!',
                })}
                error={!!errors.date}
                helperText={errors.date?.message}
                inputProps={{
                  min: todayDate,
                }}
                defaultValue={defaultValues.date}
                InputProps={{
                  sx: {
                    color: 'white',
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: 'white',
                  },
                }}
                sx={{
                  '.MuiFormHelperText-root': {
                    color: 'white',
                  },
                }}
              />
            </Box>
          </Box>

          <Box className='flex gap-4'>
            <Box className='w-72 flex items-center justify-center mt-4'>
              <label
                className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4 dark:text-white'
                htmlFor='imgUpload'
              >
                <input
                  type='file'
                  className='hidden'
                  id='imgUpload'
                  onChange={(e) => handleSelect(e)}
                  accept='.jpg, .png, .jpeg'
                  multiple={true}
                />
                <Image />
                <span>Add Assets</span>
              </label>
            </Box>
            <Box className='flex flex-wrap gap-4 mt-4'>
              {previewImages.length > 0 &&
                previewImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`preview-${index}`}
                    className='w-32 h-32 object-cover rounded'
                  />
                ))}
            </Box>
          </Box>
          <Box className="bg-gray-50 dark:bg-slate-700 dark:border-slate-800 py-6 sm:flex sm:flex-row-reverse gap-4">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={uploading}
              startIcon={uploading && <CircularProgress size={20} />}
              style={{ marginTop: '1rem' }}
            >
              {uploading ? 'Uploading assets...' : 'Submit'}
            </Button>
            <Button variant="outlined" color="error" fullWidth style={{ marginTop: '1rem' }} onClick={() => setOpen(false)}>Close</Button>
          </Box>
        </Box>
      </form>
    </ModalWrapper >
  )
}
