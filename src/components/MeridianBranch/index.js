import MeridianBranch from "./MeridianBranch";
import MeridianBranchEdit from "./MeridianBranchEdit";
import React from "react";

export default function MeridianBranchIndex() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let canEdit = params.get('user')==='xinxin';
    return canEdit ? <MeridianBranchEdit/> : <MeridianBranch/>

}
