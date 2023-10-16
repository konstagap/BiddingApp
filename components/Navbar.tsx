import { auth } from '@/app/api/auth/[...nextauth]/route'
import { cn } from '@/lib/tw-merge'
import Link from 'next/link'
import RoleSwitch from './RoleSwitch'
import LogOutButton from './LogOutButton'

type Props = {}

async function Navbar({}: Props) {
  const session = await auth()
  const user = session?.user

  return (
    <div className='navbar bg-base-300 sticky z-50 top-0 w-full'>
      <div className='flex-1'>
        <Link href='/' className='btn btn-ghost normal-case text-xl'>
          B💰dding App
        </Link>
      </div>

      <div className='flex-none'>
        {!user ? null : (
          <div className='dropdown dropdown-end mr-5'>
            <label tabIndex={0} className='btn btn-ghost btn-circle'>
              <div className='indicator'>
                <button className='text-accent'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                    />
                  </svg>
                </button>
              </div>
            </label>
            <div tabIndex={0} className='mt-3 z-[1] card card-compact dropdown-content w-52 bg-slate-600 shadow'>
              <div className='card-body'>
                <span className='font-bold text-lg'>TODO:</span>
                <span className='text-info'>Keep notifications here</span>
              </div>
            </div>
          </div>
        )}

        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle avatar '>
            <div
              className={cn('w-10 rounded-full ring  ring-offset-base-100 ring-offset-2', {
                'ring-teal-200': !!user,
                'ring-slate-400': !user
              })}>
              <img
                src={cn({
                  'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg': user,
                  'https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg': !user
                })}
                alt={'avatar'}
              />
            </div>
          </label>

          <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-600 rounded-box w-52'>
            {!user ? (
              <li>
                <Link href='/login'>Login</Link>
              </li>
            ) : (
              <>
                <p className='flex w-full justify-center p-3'>
                  <span className='badge badge-accent badge-outline'>Change role</span>
                </p>
                <RoleSwitch />
                <li>
                  <LogOutButton />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
