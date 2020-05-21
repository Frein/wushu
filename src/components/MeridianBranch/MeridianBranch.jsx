import React, {useEffect, useState} from 'react';
import '../../App.css';
import ImageMapper from '../ImageMapper';
import {useParams} from "react-router-dom";
import dataService from "../../data/dataService";
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';



function MeridianBranch() {
    let { id } = useParams();

    let [state, setState] = useState({points:[],meridianBranch:{}});
    let [selectedArea, setSelectedArea] =useState({});
    // let [points, setPoints] = useState([]);

   useEffect(()=>{
       Promise.all([
            dataService('/meridianBranch/get', {id: id}),
            dataService('/point/list', {meridianBranch:id})])
           .then(([meridianBranch, points])=>{
           console.log(meridianBranch);
           console.log(points);
           setState({meridianBranch,points:points.filter(p=>!p.hidden)})
       })
    },[id]);

    const enterArea = (area) => {
        setSelectedArea({
            hoveredArea: area,
        });
    };

    const leaveArea = (area) => {
        setSelectedArea({
            hoveredArea: null
        });
    };

    const getTipPosition = (area) => {
        return { top: `${area.center[1]+150}px`, left: `${area.center[0]+125}px` };
    };

    let lines = [];
    if(state.points.length){
        let first=state.points[0];
    let currentLine={
        name: `line0`,
        shape: 'line',
        coords:[first.coords[0], first.coords[1]]
    };

    state.points.forEach((p,i)=>{
        if (i===0) return;
        if(p.system){
            lines.push(JSON.parse(JSON.stringify(currentLine)));
            currentLine.coords=[];
            lines.push({
                name: `line${i}`,
                shape: 'line',
                lineDash: [5,10],
                coords:[state.points[i-1].coords[0], state.points[i-1].coords[1],p.coords[0], p.coords[1],state.points[i+1].coords[0], state.points[i+1].coords[1]]
            })
        }else{
        currentLine.coords.push(p.coords[0]);
        currentLine.coords.push(p.coords[1]);
        }
    });

    lines.push(currentLine)
    }
    let map =   {
        name: "Меридиан желудка",
        areas: [...state.points.filter(p=>!p.system).map(p=>{ return {...p, _id:undefined, meridianBranch:undefined}}), ...lines]
    };
    console.log(map);

    return (
                <Grid container spacing={1} >
                    <Grid item xs={8} style = {{minWidth: "800px"}}>
                        {state.meridianBranch&&<div >
                            <ImageMapper src={`/file/get?id=${state.meridianBranch.file}`} width={800}
                                         onMouseEnter={area => enterArea(area)}
                                         onMouseLeave={area => leaveArea(area)}
                                         map={map}/>
                            {
                                selectedArea.hoveredArea &&selectedArea.hoveredArea.shape!=='line' &&
                                <span className="tooltip"
                                      style={{ ...getTipPosition(selectedArea.hoveredArea)}}>
                                    { selectedArea.hoveredArea &&
                                    <div style={{width:'250px'}}>
                                        <h3>{selectedArea.hoveredArea.name}</h3>
                                        <p>{selectedArea.hoveredArea.find}</p>
                                    </div>
                                    }
                                </span>
                            }
                        </div>}
                    </Grid>
                    <Grid item xs={4} >
                        <List component="div">
                            {
                                state.points.filter(a=> a.shape!=='line' && !a.system).map((p, i)=>
                                    <ListItem button key={i} onClick={()=>{
                                        let ps = state.points.find(point=>p._id===point._id);
                                        ps.open = !ps.open;
                                        setState({
                                            ...state,
                                            points:state.points
                                        })
                                    }}>
                                        <ListItemText primary={p.name}
                                                      secondary={
                                                          <Collapse in={p.open} timeout="auto" unmountOnExit>
                                                              <p><b>Как найти:</b> {p.find}</p>
                                                              <p><b>Используется при:</b> {p.use}</p></Collapse>}/>
                                        {p.open? <ExpandLess /> : <ExpandMore />}

                                    </ListItem>
                                )
                            }
                        </List>
                    </Grid>
                </Grid>
        );
}
 export default MeridianBranch;
