import React, {useEffect, useState} from 'react'
import dataService from "../../data/dataService";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import Collapse from "@material-ui/core/Collapse";
// import Chip from "@material-ui/core/Chip";
import {Link, useParams} from "react-router-dom";
// import ExpandLess from "@material-ui/icons/ExpandLess";
// import ExpandMore from "@material-ui/icons/ExpandMore";

export default function () {
    let { id } = useParams();
    const [problems, setProblems] = useState([]);
    const [problem, setProblem] = useState(null);
    const [points, setPoints] = useState([]);

    useEffect(()=>{
            dataService('/illness/list').then(problems=>{
                setProblems(problems.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    // a должно быть равным b
                    return 0;
                }));

                const pr = problems.find(p=>p._id===id);
                if(pr)
                    setProblem(pr);
            });
    },[]);

    useEffect(()=>{
        if(problem){
            dataService('/point/listByProblem', {problem:problem._id}).then(p=>{
                setPoints(p)
            });
        }
    }, [problem]);

return (    <Grid container spacing={1} >
    <Grid item xs={12} >
        <Autocomplete
            options = {problems}
            getOptionLabel = { (option) => option.name}
            id="controlled-demo"
            value={problem}
            onChange={(event, newValue) => {
                setProblem(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Начните вводить проблему" margin="normal" />}
        />
    </Grid>
    {
        problem && <Grid item xs={12} >
            <CardContent>
                <Typography gutterBottom variant="h3" component="h3">{problem.name}</Typography>
                <Typography variant="body1" component="p">Описание: {problem.description}</Typography>
                <Typography variant="h6" component="h6">Точки: </Typography>
                <List component="div">
                    {
                        points.filter(a=> !a.system).map((p, i)=>
                            <ListItem
                        button
                        component={Link} to={`/MeridianBranch/${p.meridianBranch}?point=${p._id}`}>
                                <ListItemText primary={p.name}/>
                        </ListItem>
                        )
                    }
                </List>
            </CardContent>
        </Grid>
    }
    </Grid>
        )
}
