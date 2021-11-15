import {handleResponse, handleError} from '../../api/apiUtils';
import Config from 'react-native-config';
import axios from 'axios';
const ApiEndPoint: string = Config.API_URI as string;
export function GetWines(lang: string) {
  return axios
    .get(ApiEndPoint + `Vinhos`, {headers: {lang: lang}})
    .then(handleResponse)
    .catch(handleError);
}
export function AddVinho(language:string, vinhosData:FormData)
{
    return axios.post(ApiEndPoint + `Vinhos`, vinhosData, { headers: { lang: language } })
        .then(handleResponse)
        .catch((error) => { return error });
}
export function DeleteVinho(language:string, id:string)
{
    return axios.delete(ApiEndPoint + `Vinhos/${id}`, { headers: { lang: language } })
        .then(handleResponse)
        .catch((error) => { return error });
}