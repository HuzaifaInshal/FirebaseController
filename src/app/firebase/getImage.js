export default async function getImageURL(filename){
    const data = await fetch(`https://firebasestorage.googleapis.com/v0/b/myportfoliodb-56c35.appspot.com/o/${filename}`);
    const json = await data.json();
    const str = `https://firebasestorage.googleapis.com/v0/b/myportfoliodb-56c35.appspot.com/o/${filename}?alt=media&token=${json.downloadTokens}` 
    return str
}