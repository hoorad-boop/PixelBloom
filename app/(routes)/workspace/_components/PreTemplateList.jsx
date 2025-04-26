"use client"

import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

function PreTemplateList() {

    const templateList = useQuery(api.templates.GetAllTemplates);
    const createNewDesignFromTemplate = useMutation(api.designs.CreateDesignFromTemplate);
    const {userDetail} = useContext(UserDetailContext);
    const router = useRouter();

    const onTemplateSelect = async (template) => {
        // Save to design table with uid
        const id = await createNewDesignFromTemplate({
            imagePreview: template?.imagePreview,
            jsonTemplate: template?.jsonData,
            name: template?.name,
            uid: userDetail?._id
        })

        console.log(id);
        router.push('/design/' + id);
    }

  return (
    <div>
        <div className='mt-5 grid grid-cols-2 md: grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
            {templateList?.map((template, index) => (
                <div key={index} className='bg-secondary rounded-lg'
                    onClick={() => onTemplateSelect(template)}>
                <img src={template?.imagePreview} alt={template?.name} 
                width={300}
                height={300}
                className='w-full cursor-pointer h-[200px] object-contain rounded-lg'/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PreTemplateList