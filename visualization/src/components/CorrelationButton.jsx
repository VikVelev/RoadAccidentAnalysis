import axios from 'axios';
import React, { useState } from 'react';
import CorrelationPlot from './CorrelationPlot';
import { Portal, Segment, Button, Header } from 'semantic-ui-react'

// Props = all features / columns for correlation coefficient
function CorrelationButton(props) {

    const [ state, setState ] = useState({ open: false })

    let handleClose = () => setState({ open: false })
    let handleOpen = () => setState({ open: true })
  
    return <div className='correlation-button-showup'>
        <Button
            content='Open Correlation Plot'
            disabled={state.open}
            positive
            onClick={handleOpen}
          />
        <Portal className='correlation-button' onClose={handleClose} open={state.open} closeOnDocumentClick={false}>
            <Segment
              style={{
                right: 0,
                position: 'fixed',
                bottom: 0,
                margin: '15px',
                zIndex: 1000000,
                borderRadius: '1em',
                padding: '0.5em'
              }}
            >
              <CorrelationPlot style={{ zIndex: '-1' }} corr={props.corr}/>
              <center>
              <p style={{ fontSize: '1em', marginTop: '-3em' }}> <i>Higher means that the combination of selected columns, <br></br> lead to higher probability of casualties.</i></p>
            </center>
            <br></br>
              <Button
                content='Close Correlation Plot'
                negative
                onClick={handleClose}
              />
            </Segment>
          </Portal>
    </div>
}

export default CorrelationButton;
