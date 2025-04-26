"use client"

import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { useUser } from '@stackframe/stack'
import { useMutation } from 'convex/react';
import React, { useEffect, useState } from 'react'

function Provider({children}) {

    const user = useUser();
    const createNewUserMutation = useMutation(api.users.CreateNewUser)
    const [ userDetail, setUserDetail ] = useState();
    
    useEffect(() => {
        if (user && user.displayName) {
            CreateUser();
        }
    }, [user])
    
    const CreateUser = async () => {
        if (!user?.displayName) {
            console.log("User display name is missing");
            return;
        }
        
        const data = {
            name: user.displayName,
            email: user.primaryEmail || "",
            picture: user.profileImageUrl || ""
        }
        
        try {
            const result = await createNewUserMutation({
                ...data
            });
            console.log(result);
            setUserDetail(result);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }

  return (
    <div>
        <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
            {children}
        </UserDetailContext.Provider>
    </div>
  )
}

export default Provider