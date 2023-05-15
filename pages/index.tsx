import { Layout } from "@/components/layouts";
import { EntryList, NewEntry } from "@/components/ui";
import { CardHeader, Grid, Card, CardContent } from '@mui/material';


export default function Home() {

  console.log(process.env.NEXT_PUBLIC_CLIENT_KEY)

  return (
    <Layout title = 'Home - OpenJira'>

      <Grid container spacing={2}>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title= 'Pendientes'/>
               {/* padding: '1px 5px' */}
               <NewEntry/>
              <EntryList status='pending'/>

          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title= 'En progreso'/>
            <EntryList status='in-progress'/>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title= 'Completadas'/>
            <EntryList status='finish'/>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  
  )
}
