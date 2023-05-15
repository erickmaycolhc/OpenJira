import { formatDistanceToNow  } from "date-fns";
import {es} from 'date-fns/locale' // cambiar de idioma

export const getFormatDistanceToNow = (date : number ) => { //función para poner fecha de registro actual


    const fromNow = formatDistanceToNow(date, {locale: es}); // cambiar de idioma {locale: es}

    return `hace ${fromNow}`;

}