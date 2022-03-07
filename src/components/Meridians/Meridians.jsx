import React, { useState, useEffect } from 'react';
import dataService from "../../data/dataService";
import {Link} from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Meridians() {

    const [meridianList, setMeridianList] = useState([]);
    const [selectedMeridian, setSelectedMeridian] = useState({});
    const [branches, setMeridianBranches] = useState([]);
    const [branchesLoading, setBranchLoading] = useState(false);

    useEffect(() => {
        setSelectedMeridian({});
        dataService('/meridian/list')
          .then((data)=>{
            console.log('meridians', data)
            setMeridianList(data);
            setSelectedMeridian(data[0])
          })
          .catch(console.error)
    },[]);

    useEffect(() => {
        setBranchLoading(true);
        dataService('/meridianBranch/list', {id: selectedMeridian._id}).then((data) => {
            setMeridianBranches(data);
            setBranchLoading(false);
        })
    },[selectedMeridian._id]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={5}>
                <Typography gutterBottom variant="h5" component="h2">Список меридианов</Typography>
                <List component="div">
                    {
                        meridianList.map((m,i)=>
                            <ListItem
                                key={`ListItem${i}`}
                                button
                                selected={selectedMeridian&& m._id === selectedMeridian._id}
                                onClick={(event) => setSelectedMeridian(m)}

                            >{m.name}</ListItem>
                        )
                    }
                </List>
            </Grid>
            <Grid item xs={7}>
                {selectedMeridian._id && <Card >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">{selectedMeridian.name}</Typography>
                        <Typography variant="body1" component="p">{selectedMeridian.description}</Typography>
                        <Typography variant="body1" component="p">Стихия: {selectedMeridian.element}</Typography>
                        <Typography variant="body1" component="p">Сезон: {selectedMeridian.season}</Typography>
                        <Typography variant="body1" component="p">Время максимальной активности: {selectedMeridian.maxActivityTime}</Typography>
                        <List component="div">
                            <Typography variant="h6" component="h3">Ветви</Typography>
                            {branchesLoading?<CircularProgress />:branches.map((b, i)=> {
                                        return <ListItem
                                            key={`AnotherListItem${i}`}
                                            button
                                            component={Link} to={'/MeridianBranch/' + b._id}>
                                            <ListItemText primary={b.name}/>
                                        </ListItem>
                                        }
                                    )}

                            </List>
                    </CardContent>
                </Card>
                }
            </Grid>
        </Grid>
    );
}
