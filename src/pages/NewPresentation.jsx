import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuill } from 'react-quilljs';
import parse from 'html-react-parser';
import PresentationDataService from '../services/presentation.services';
import {setRessource} from '../DBConfig';
import { makeid } from '../services/random';

import 'quill/dist/quill.snow.css';


const NewPresentation = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [slides, setSlides] = useState([]);
  const [presentation, setPresentation] = useState({
  });
  const [slide, setSlide] = useState('');

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

  const handleNewSlide = (e) => {
    setSlides(current => [...current, slide]);
    quillRef.current.firstChild.innerHTML = '';
  };

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setSlide(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill]);

  const savePresentation = (e) => {
    e.preventDefault();

    presentation.title = title;
    presentation.slides = slides;
    setPresentation(presentation);

    if(navigator.onLine){
      PresentationDataService.addPresentations(presentation);
    }else {
      presentation.id = makeid(20);
      setRessource(presentation);
    }
    navigate('/')
  };


  return (
    <Fragment>
      <div>
        <h1 className='text-center text-3xl font-bold py-8'>New Presentation</h1>
        <button onClick={savePresentation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save</button>
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Presentation title :
          </label>
          <input type="text" id="title" placeholder='title' name='title' onChange={(e) => setTitle(e.target.value)}
            className="bg-light-50 border border-light-300 text-dark-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
        </div>
        <div className="overflow-x-auto flex p-4 bg-slate-200 m-4 rounded-md h-48">
          {slides.map((slide, index) => {
            return (
              <a className="cursor-pointer flex-none py-6 px-3 first:pl-6 last:pr-6 ml-4 shadow-md bg-white w-48 hover:bg-gray-100 dark:hover:bg-gray-700" key={index}>
                <div className="flex items-center justify-center text-xs font-thin">
                  {parse(slide)}
                </div>
              </a>
            );
          })}
        </div>
        <button onClick={handleNewSlide} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Ajouter une slide</button>
        <div style={{ width: 500, height: 300 }}>
          <div ref={quillRef} />
        </div>
        <div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewPresentation;



