import React, { Fragment, useState, useEffect } from 'react';
import { Impress, Step } from 'react-impressjs';
import PresentationDataService from '../services/presentation.services';
import parse from 'html-react-parser';
import {getRessource} from '../DBConfig';

import 'react-impressjs/styles/react-impressjs.css';
import './impress.css';

const ViewPresentation = () => {
  const currentPresentationId = window.location.pathname.split('/')[2];
  const [presentation, setPresentation] = useState([]);
  const [loader, setLoader] = useState(true);

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
      {loader == false ?
        <Impress fallbackMessage={<p>Sorry, your <b>device or browser</b> couldn't support well.</p>}>
          {presentation.slides.map((slide, index) => {
            return (
              <Step key={index} id={slide.id} className="box" data-x="0" data-y={slide.id}>
                {parse(slide)}
              </Step>
            );
          })}
        </Impress>
        :
        <div>
          EMPTY
        </div>
      }
    </Fragment>
  )
};

export default ViewPresentation;