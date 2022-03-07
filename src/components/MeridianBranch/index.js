import MeridianBranch from "./MeridianBranch";
import MeridianBranchEdit from "./MeridianBranchEdit";
import React from "react";
import CookieParser from "../../utils/CookieParser";

export default function MeridianBranchIndex() {
    // let search = window.location.search;
    // let params = new URLSearchParams(search);
    let canEdit = CookieParser.getUser()?.role === 'admin';
    // let canEdit = params.get('user')==='xinxin';
    return canEdit ? <MeridianBranchEdit/> : <MeridianBranch/>

}
