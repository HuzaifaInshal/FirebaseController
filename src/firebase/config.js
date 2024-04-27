import { initializeApp } from "firebase/app";
import {firebase} from './cred'

const firebaseConfig = firebase;


const frebaseAPP = initializeApp(firebaseConfig);
export default frebaseAPP;
