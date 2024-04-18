import { getDatabase, ref, set } from "firebase/database";
import frebaseAPP from './config'

export default function addDatatoDatabase(data,path) {
  const db = getDatabase(frebaseAPP);
  set(ref(db, path), {
    data
  });
}