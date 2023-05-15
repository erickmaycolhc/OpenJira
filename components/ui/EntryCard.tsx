import { DragEvent, useContext } from 'react';
import { Entry } from "@/interfaces"
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { UIContext } from '../../context/ui/UIContext';
import { useRouter } from 'next/router';
import { dateFunctions } from '@/utils';

interface Props{
    entry: Entry;
}

export const EntryCard = ({entry}:Props) =>{

    const {startDragging, endDragging} = useContext(UIContext);

    const router = useRouter();

    const onDragStart = (event: DragEvent) =>{
        event.dataTransfer.setData('text', entry._id);
        startDragging();

    }

    const onDragEnd = () =>{
        //todo: cancelar onDrag 
        endDragging();
    }

    const onClick = () =>{

        router.push(`/entries/${entry._id}`)
    }


    return (
        <Card sx={{marginBottom: 1}}
         onClick={onClick}
         //eventos de drag
         draggable
         onDragStart={onDragStart}
         onDragEnd={onDragEnd}
        >
           <CardActionArea>
                <CardContent>
                    <Typography sx={{whiteSpace: 'pre-line'}}>{entry.description}</Typography> 
                </CardContent>
                <CardActions sx={{display: 'flex', justifyContent:'end', paddingRight: 2 }}>
                    <Typography variant='body2'>{dateFunctions.getFormatDistanceToNow(entry.createdAt)}</Typography> 
                </CardActions>
           </CardActionArea>

        </Card>
    )
}