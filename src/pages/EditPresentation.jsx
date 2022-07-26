import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PresentationDataService from '../services/presentation.services';
import { useQuill } from 'react-quilljs';
import parse from 'html-react-parser';
import {getRessource} from '../DBConfig';

import 'quill/dist/quill.snow.css';

const EditPresentation = () => {
  const currentPresentationId = window.location.pathname.split('/')[2];
  const [presentation, setPresentation] = useState([]);
  const [loader, setLoader] = useState(true);

  const modulesQuill = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'header': '1' }, { 'header': '2' }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link'],
    ],
  };
  const { quill, quillRef } = useQuill({ modules: modulesQuill });

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {

      });
    }
  }, [quill]);

  const handleEditSlide = (event, param) => {
    quillRef.current.firstChild.innerHTML = param;
  }

  useEffect(() => {
    if(navigator.onLine) {
      getPresentation();
    } else {
      getRessource(currentPresentationId).then(data => {
        setPresentation(data);
        setLoader(false);
      });
    }
  }, []);

  const getPresentation = async () => {
    const data = await PresentationDataService.getPresentationById(currentPresentationId);
    setPresentation(data.data());
    setLoader(false);
  };

  return (
    <Fragment>
      {loader === false?
        <div>
          <h1 className='text-center text-3xl font-bold py-8'>Edit Presentation</h1>
          <div className="mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Presentation title :
            </label>
            <input type="text" id="title" placeholder='title'
              className="bg-light-50 border border-light-300 text-dark-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={presentation.title}></input>
          </div>
          <div className="overflow-x-auto flex p-4 bg-slate-200 m-4 rounded-md h-48">
            {presentation.slides.map((slide, index) => {
              return (
                <a onClick={event => handleEditSlide(event, slide)} className="cursor-pointer flex-none py-6 px-3 first:pl-6 last:pr-6 ml-4 shadow-md bg-white w-48 hover:bg-gray-100 dark:hover:bg-gray-700" key={index}>
                  <div className="flex items-center justify-center text-xs font-thin">
                    {parse(slide)}
                  </div>
                </a>
              );
            })}
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">
            Ajouter une slide</button>
            <Link to={`/view-presentation/${currentPresentationId}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Voir</Link>
          <div style={{ width: 500, height: 300 }}>
            <div ref={quillRef} />
          </div>
        </div>
        :
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
    </Fragment>
  );
};

export default EditPresentation;



