import React, {Fragment, useEffect, useState} from 'react';
import PresentationDataService from '../services/presentation.services';
import {setRessources, getRessources, unsetRessource} from '../DBConfig';
import { Link } from 'react-router-dom';
import {useOnlineStatus} from '../context/useOnlineStatus';

const PresentationList = () => {
    const [presentations, setPresentations] = useState([]);
    const [presentationsLocal, setPresentationsLocal] = useState([]);
    const [loading, setLoading] = useState(true);
    const isOnline = useOnlineStatus();

    useEffect(() => {
        if(isOnline){
            getPresentations();
            setRessources(presentations);
        }else {
            getRessources().then(data => {
                setPresentations(data);
                setLoading(false);
            });
        }
    }, []);

    useEffect(() => {
        setRessources(presentations);
    }, [presentations]);

    useEffect(() => {
        if (isOnline) {
            getRessources().then(data => {
                setPresentationsLocal(data);
            });
            presentationsLocal.forEach(presentation => {
                if (!presentations.find(p => p.id === presentation.id)) {
                    const save = presentation;
                    const deletePresentation = presentation.id;
                    console.log(deletePresentation);
                    delete save.id;
                    unsetRessource(deletePresentation);
                    PresentationDataService.addPresentations(save);
                }
            });
        }
    }, [isOnline]);

    const getPresentations = async () => {
        const data = await PresentationDataService.getAllPresentations();
        setPresentations(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
    };

    const deletePresentation = async (id) => {
        await PresentationDataService.deletePresentation(id);
        unsetRessource(id);
        getPresentations();
    }

  return (
    <Fragment>
        {loading === false ? 
            <div className="m-8 relative">
                {presentations.map((presentation, index) => {
                    return (
                        <div key={index} className="w-full flex space-x-4 m-4 shadow-md rounded-md">
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <span className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{presentation.title}</span>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">nombre de slides: {presentation.slides.length}</p>
                                <div className="flex items-right">
                                    <Link to={`/edit-presentation/${presentation.id}`} className="m-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Edit</Link>
                                    <Link to={`/view-presentation/${presentation.id}`} className="m-2 bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full">Voir</Link>
                                    <button className="m-2 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full" onClick={() => deletePresentation(presentation.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div> 
        : 
        <div className="m-8 relative">
            <div className="animate-pulse w-full flex space-x-4 shadow-md rounded-md m-4 p-4">
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-5 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    </div>
                    <button className="rounded-full bg-slate-200 py-2 px-4"></button>
                    <button className="rounded-full bg-slate-200 py-2 px-4"></button>
                    </div>
                </div>
            </div>
            <div className="animate-pulse w-full flex space-x-4 shadow-md rounded-md m-4 p-4">
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-5 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    </div>
                    <button className="rounded-full bg-slate-200 py-2 px-4"></button>
                    <button className="rounded-full bg-slate-200 py-2 px-4"></button>
                    </div>
                </div>
            </div>
            <div className="animate-pulse w-full flex space-x-4 shadow-md rounded-md m-4 p-4">
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-5 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    </div>
                    <button className="rounded-full bg-slate-200 py-2 px-4"></button>
                    <button className="rounded-full bg-slate-200 py-2 px-4"></button>
                    </div>
                </div>
            </div>
            <div className="animate-pulse w-full flex space-x-4 shadow-md rounded-md m-4 p-4">
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-5 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    </div>
                    <button className="rounded-full bg-slate-200 py-2 px-4"></button>
                    <button className="rounded-full bg-slate-200 py-2 px-4"></button>
                    </div>
                </div>
            </div>
        </div>
        }
    </Fragment>
  );
};

export default PresentationList;
