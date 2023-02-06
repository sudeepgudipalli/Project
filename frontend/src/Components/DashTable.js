import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function DashTable(){
    const [table,setData] = useState([]);
    const [search,setFind] = useState({
        name:"",
        tag:"",
        uni_name:"",
        state:"",
        type:"date",
    });
    const LoadTable = async(e)=>{
        e.preventDefault();
        const {data} = await axios.post('http://localhost:3001/getinfo',{...search});
        setData(data);
        console.log(data);
    }
    useEffect(()=>{
        const defaultLoad = async()=>{
            const {data} = await axios.post('http://localhost:3001/getinfo',{...search});
            setData(data);
        }
        defaultLoad();
    },[search]);
    return (
        <>
        <div className="display-2 p-4">Research Activities</div>
        <form className="row ps-4 ms-2 g-2 pe-4 me-2" onSubmit={(e)=>LoadTable(e)}>
            <div className="col-md-4 form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="ResearchName" onChange={e=>setFind({...search,name:e.target.value})}/>
                <label className="ms-2">Research Name</label>
            </div>
            <div className="col-md-1 form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="Tags" onChange={e=>setFind({...search,tag:e.target.value})}/>
                <label className="ms-2">Tags</label>
            </div>
            <div className="col-md-2 form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="UnivName" onChange={e=>setFind({...search,uni_name:e.target.value})}/>
                <label className="ms-2">University Name</label> 
            </div>
            <div className="col-md-2 form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="state" onChange={e=>setFind({...search,state:e.target.value})}/>
                <label className="ms-2">State/Country</label> 
            </div>
            <div className="form-floating col-md-1 me-4" style={{minWidth:"120px"}}>
                <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={(e)=>setFind({...search,type:e.target.value})}>
                  <option value="date">Date</option>
                  <option value="popular">Popular</option>
                </select>
                <label className="ms-2" >Sort By</label>
              </div>
              <button className="col-1 bg-dark text-white p-2" type="submit">Find</button>
        </form>
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
                    {
                        table.map((row)=>
                            <tr key={row._id}>
                                <td>{row.name}</td>
                                <td>{row.tag}</td>
                                <td>{row.uni_name}</td>
                                <td>{row.state}</td>
                                <td style={{textDecoration:"none"}}><Link to={"/researchinfo/"+row._id}>Link</Link></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
        </>
    );
}