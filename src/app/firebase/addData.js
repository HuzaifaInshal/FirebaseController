import { getDatabase, ref, set } from "firebase/database";
import frebaseAPP from './config'

export default function addDatatoDatabase(data) {
  const db = getDatabase(frebaseAPP);
  set(ref(db, 'projects/'), {
    data
  });
}