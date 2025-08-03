"use client"
import {signIn,signOut, useSession} from 'next-auth/react'
const page = () => {
  const session = useSession();
  return (
    <div>
      <button onClick={()=>signIn()}>SignIn</button>
      <button onClick={()=>signOut()}>Signout</button>
      <div>{JSON.stringify(session)}</div>
    </div>
  )
}

export default page;