import React from "react";
import MeridiansEdit from "./MeridiansEdit";
import Meridians from "./Meridians";

export default function MeridiansIndex() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let canEdit = params.get('user')==='xinxin';
    return canEdit ? <MeridiansEdit/> : <Meridians/>

}
