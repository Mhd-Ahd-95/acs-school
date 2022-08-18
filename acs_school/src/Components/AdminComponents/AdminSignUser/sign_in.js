import React from 'react';
import { useParams } from "react-router-dom";
import { CreateUser } from './sign_in_user';
import {CreateTeacher} from './sign_in_teacher';
import {CreateCoordinator} from './sign_in_coordinator';
import {CreateSupervisor} from './sign_in_supervisor';

export function CreateAccounts() {

    const params = useParams();

    return (
        <>
            {
                params.type === 'user' ?
                <CreateUser type={params}/>
                :
                params.type === 'teacher' ?
                <CreateTeacher type={params}/>
                :

                params.type === 'coordinator' ?
                <CreateCoordinator type={params}/>
                :

                params.type === 'supervisor' ?
                <CreateSupervisor type={params}/>
                :
                null
                        
                }
        </>
    )
}