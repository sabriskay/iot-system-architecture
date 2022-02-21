import React from 'react';
import { render } from 'react-dom';

import { AxesChart } from '../charts/axes'

const rootElement = document.getElementById('root');
render(<AxesChart />, rootElement);