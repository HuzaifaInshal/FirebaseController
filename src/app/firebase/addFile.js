import { getStorage, ref, uploadBytes } from "firebase/storage";
import frebaseAPP from './config'

const storage = getStorage(frebaseAPP);

export default function addFileToStorage(file, subpath) {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, subpath);
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            resolve(snapshot); 
        }).catch(error => {
            console.error('Error uploading file:', error);
            reject(error); 
        });
    });
}