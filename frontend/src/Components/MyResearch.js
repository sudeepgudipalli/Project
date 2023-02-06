import React from 'react';

export default function MyResearch(){
    return (
    <>
    <div className="display-2 p-4">My Research</div>
    <p className="fs-3 ms-4 ps-4 ">Researches You Follow</p>
    <div className="hold">
        <table className="table table-hover" id="tab">
            <thead className="bg-dark text-white sticky-top">
                <tr>
                <th className="p-3">Research Name</th>
                <th className="p-3">Tags</th>
                <th className="p-3">University</th>
                <th className="p-3">State/Country</th>
                <th className="p-3">Links</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    </>
    );
}