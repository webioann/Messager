/**
 * @format
 */
import 'react-native-gesture-handler'; // <--- need for work Drawer Navigation
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { USER_CONTEXT_PROVIDER } from './context/UserContext';
import { COLOR_SCHEME_PROVIDER } from './context/ColorSchemeContext';


const RootAPP = () => {
    return (
        <USER_CONTEXT_PROVIDER>
            <COLOR_SCHEME_PROVIDER> 
                <App/>
            </COLOR_SCHEME_PROVIDER> 
        </USER_CONTEXT_PROVIDER>
    
    )
}

AppRegistry.registerComponent(appName, () => RootAPP);
