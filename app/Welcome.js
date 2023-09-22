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
  console.log(welcomeCheck)
  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 bg-white p-6">
          <Typography className='text-center text-bold text-2xl' id="keep-mounted-modal-title">
            Welcome to the college football conference map
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 1 }}>
            With the recent chaos of conference realignment, it is a good time to look back on how we got here.
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 1 }}>
            This conference map will start in YEAR before the creation of the NCAA. It will then follow along the Division I Conferences, until the 1978 Division I split and continue following the Division IA Conferences, which would later be known as the Football Bowl Subdivision. 
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 1 }}>
            Checkout the settings menu for filtering options and display settings.
          </Typography>
          <div className='flex flex-col'>
            <div>
              <FormControlLabel
                control={
                  <Checkbox checked={welcomeCheck} onChange={handleCheck} name="noWelcome" />
                }
                label="Don't show me this message again"
              />
            </div>
            <div className='flex justify-center items-center'>
              <Button className='text-white bg-black border-black' variant='outlined' onClick={handleClose}>Close</Button>
            </div>
          </div>

        </Box>
      </Modal>
    </div>
  );
}
