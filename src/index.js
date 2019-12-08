import 'babel-polyfill';
import React from 'react';
import reactDom from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import ReduxToastr from 'react-redux-toastr';
import { JssProvider } from 'react-jss';
import { history, store } from './configureStore';
import Routes from './routes/Routes';
import CustomDialog from './containers/CustomDialog';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// styling
import './styles/base.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#ff6000'
      }
    }
  },
)

reactDom.render((
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <JssProvider disableStylesGeneration>
          <Routes />
        </JssProvider>
      </ConnectedRouter>
      <ReduxToastr
        timeOut={6000}
        position="top-center"
        transitionIn="bounceIn"
        transitionOut="bounceOut"
        progressBar
      />
      <CustomDialog />
    </MuiThemeProvider>
  </Provider>
), document.getElementById('root'))