import {Link} from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import List from "@material-ui/core/List";

export default function Zones() {
    return (<List>
            <ListItem
                button
                component={Link} to='/lesson2/zones'>
                <ListItemText primary='Зоны плечей'/>
            </ListItem>
            <ListItem
                button
                component={Link} to='/lesson5/zones'>
                <ListItemText primary='Зоны локтей'/>
            </ListItem>
        <ListItem
            button
            component={Link} to='/lesson7/zones'>
            <ListItemText primary='Зоны запястий'/>
        </ListItem>
    </List>)
}
