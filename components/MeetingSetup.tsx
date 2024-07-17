'use client'

import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({setIsSetUpComplete}:{
    setIsSetUpComplete : (value:boolean) =>void
}) => {
    const [isMicCamToggledOn,setIsMicCamToggaledOn]=useState(false);

    const call =useCall();

    if(!call){
        throw new Error('UseCall must be use with in streamcall component');
    }

    useEffect(()=>{
        if(isMicCamToggledOn){
            call?.camera.disable();
            call?.microphone.disable();
        }else{
            call?.camera.enable();
            call?.microphone.enable();
        }

    },[isMicCamToggledOn, call?.camera ,call?.microphone])
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>

        <h1 className='text-2xl font-bold'>SetUp</h1>
        <VideoPreview/>
         
         <div className='flex h-16 items-center justify-center gap-3'>
           <label className='flex items-center justify-center gap-2 font-medium'>
            <input
            type='checkbox'
            checked={isMicCamToggledOn}
            onChange={(e)=>setIsMicCamToggaledOn(e.target.checked)}
            
            />
                Join with mic and camera off

           </label>

           <DeviceSettings  />

         </div>

         <Button className='rounded-lg bg-blue-500 px-4 py-2.5 border-2'

          onClick={()=>{
            
            call.join();

            setIsSetUpComplete(true)


          }}
         >
                     
                     Join Meeting
 
         </Button>

      
    </div>
  )
}

export default MeetingSetup
