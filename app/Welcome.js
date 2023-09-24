import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default  function Welcome({options, setOptions}){
  const [open, setOpen] = useState(true);
  const [welcomeCheck, setWelcomeCheck] = useState(false)
  const handleClose = () =>{
    setOpen(false);
    setOptions({...options, showWelcome: !welcomeCheck})
  }

  const handleCheck = (e) => {
    setWelcomeCheck(e.target.checked)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] bg-black border-4 border-white border-opacity-90 bg-opacity-80 p-6 rounded">
          <Typography className='text-center font-bold text-xl text-white' id="keep-mounted-modal-title">
            WECLOME TO THE COLLEGE FOOTBALL CONFERENCE HISTORY MAP
          </Typography>
          <Typography className="text-center mt-5 font-normal text-white">
            With the recent chaos of conference realignment, it is a good time to look back on how we got here.
          </Typography>
          <Typography className="text-center mt-5 font-normal text-white">
            This conference map will start in 1894 before the creation of the NCAA. It will then follow along the Division I Conferences, until the 1978 Division I split and continue following the Division IA Conferences, which would later be known as the Football Bowl Subdivision. 
          </Typography>
          <Typography className="text-center mt-5 font-normal text-white">
            You can use the left and right arrows on your keyboard to change years.
          </Typography>
          <Typography className="text-center mt-5 font-normal text-white">
            Checkout the settings menu for filtering options and display settings.
          </Typography>
          <div className='flex flex-col'>
            <div className='text-center'>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={welcomeCheck}
                  onChange={handleCheck}
                  name="noWelcome"
                  sx={{
                    color: 'white',
                    '&.Mui-checked': {
                      color: "white", // Change color when checked
                    },
                    '&:hover': {
                      color: "black", // Change color on hover (optional)
                    },
                  }}
                />
              }
              className='text-white mt-5'
              label="Don't show me this message again"
            />

            </div>
            <div className='flex justify-center items-center mt-5'>
              <Button className='text-black font-bold bg-white border-white hover:bg-black hover:text-white hover:border-white' variant='outlined' onClick={handleClose}>Close</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
