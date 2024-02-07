import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { changeOption } from '../../redux/features/optionsSlices';

export default  function Welcome(){
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const [welcomeCheck, setWelcomeCheck] = useState(false);
  const handleClose = () =>{
    setOpen(false);
    if(welcomeCheck){
      dispatch(changeOption({ option: 'showWelcome', value: false }));
    }
  }

  const handleCheck = (e) => {
    setWelcomeCheck(e.target.checked);
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-h-full overflow-y-auto max-w-[700px] bg-black bg-opacity-80 p-6 rounded">
          <Typography className='text-center font-bold text-[12px] sm:text-[14px] md:text-[18px] text-white' id="keep-mounted-modal-title">
            WECLOME TO THE COLLEGE FOOTBALL CONFERENCE HISTORY MAP
          </Typography>
          <Typography className="text-center pt-2 lg:pt-5 font-normal text-[12px] sm:text-[12px] md:text-[16px] text-white">
            With the recent chaos of conference realignment, it is a good time to look back on how we got here.
          </Typography>
          <Typography className="text-center pt-2 lg:pt-5 font-normal text-[12px] sm:text-[12px] md:text-[16px] text-white">
            This conference map will start in 1892 before the creation of the NCAA. It will then follow along the Division I Conferences, until the 1978 Division I split and continue following the Division IA Conferences, which would later be known as the Football Bowl Subdivision. 
          </Typography>
          <Typography className="text-center pt-2 lg:pt-5 font-normal text-[12px] sm:text-[12px] md:text-[16px] text-white">
            Use the left and right arrows on your keyboard to change years.
          </Typography>
          <Typography className="text-center pt-2 lg:pt-5 font-normal text-[12px] sm:text-[12px] md:text-[16px] text-white">
            Checkout the settings menu for filtering options and display settings.
          </Typography>
          <div className='flex justify-center pt-2 lg:pt-5'>
            <input type="checkbox" checked={welcomeCheck} value="welcomeCheck" onChange={handleCheck} />
            <label className='pl-2 text-white font-normal text-[12px] sm:text-[12px] md:text-[16px]'>Don&apos;t show me this message again</label>
          </div>
            <div className='flex justify-center items-center pt-2 lg:pt-5'>
              <button className='text-black text-[10px] sm:text-[12px] md:text-[14px] font-semibold bg-white border border-white hover:bg-black hover:text-white hover:border-white p-1 sm:p-2 rounded-sm' onClick={handleClose}>Close</button>
            </div>
        </Box>
      </Modal>
    </div>
  );
}
