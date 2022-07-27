import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PresentationDataService from '../services/presentation.services';
import parse from 'html-react-parser';
import { getRessource } from '../DBConfig';
import { RevealJS, Slide } from '@gregcello/revealjs-react';

const ViewPresentation = () => {
  const currentPresentationId = window.location.pathname.split('/')[2];
  const [presentation, setPresentation] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (navigator.onLine) {
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
      <div className="m-8 relative">
        <Link to={`/edit-presentation/${currentPresentationId}`} className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Retour</Link>
        {loader === false ?
          <RevealJS fallbackMessage={<p>Sorry, your <b>device or browser</b> couldn't support well.</p>}>
            {presentation.slides.map((slide, index) => {
              return (
                <Slide key={index} id={slide.id} className="box" data-x="0" data-y={slide.id}>
                  {parse(slide)}
                </Slide>
              );
            })}
          </RevealJS>
          :
          <div>
            EMPTY
          </div>
        }
      </div>
    </Fragment>
  )
};

export default ViewPresentation;