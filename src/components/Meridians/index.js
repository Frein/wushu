import React from "react";
import MeridiansEdit from "./MeridiansEdit";
import Meridians from "./Meridians";
import CookieParser from "../../utils/CookieParser";

export default function MeridiansIndex() {
    // let search = window.location.search;
    // let params = new URLSearchParams(search);
    let canEdit = CookieParser.getUser()?.role === 'admin';
    // let canEdit = params.get('user')==='xinxin';
    return canEdit ? <MeridiansEdit/> : <Meridians/>

}
