import { initializeApp } from "firebase/app";
import config from './cred.json';

const firebaseConfig = config;


const frebaseAPP = initializeApp(firebaseConfig);
export default frebaseAPP;
