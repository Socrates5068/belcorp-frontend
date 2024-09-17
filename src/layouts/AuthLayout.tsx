import Logo from '@/components/Logo'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export default function AuthLayout() {
    return (
      <>
        <div className='min-h-screen bg-gray-800'>
          <div className='py-8 mx-auto w-[450px]'>
            <div className='flex justify-center'>
              <Logo width={320} />
            </div>
            <div className='mt-5'>
              <Outlet />
            </div>
          </div>
        </div>
        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
      </>
    )
  }
  
