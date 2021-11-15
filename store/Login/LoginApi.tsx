import { handleResponse, handleError } from "../../api/apiUtils";
import Config from "react-native-config";
import axios from "axios";
const ApiEndPoint: string = Config.API_URI as string;

export function LoginUser(LoginBody: FormData)
{
    return axios.post(ApiEndPoint + `Login`, LoginBody)
        .then(handleResponse)
        .catch(handleError);
}