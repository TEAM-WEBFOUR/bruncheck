import React, {useState, useEffect, useRef} from 'react';
import { Link } from "react-router-dom";
import Navbar from "./navbar.component";
import { SketchPicker } from 'react-color'

export default function Settings() {

    var _id = "6212e4b8669c2894855d121c";

    var [data, setData] = useState(async () => {
        await fetch(`https://www.bruncheck.com/api/setting/${_id}`)
          .then((response) => response.json())
          .then((data) => setData(data));

        console.log(data);
    });

    const fileInput = useRef(null);
    const [image, setImage] = useState({ preview: '', data: '' })
    const [file, setFile] = useState({
        image: null,
    });

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark shadow fixed-top" style={{backgroundColor: `${data.color}`}}>
                <div class="container">
                <a class="navbar-brand" href="/admin">
                    <strong>Bruncheck</strong>
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <Link to="/admin" className="nav-link active">
                        Question List
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/admin/questions/add" className="nav-link active">
                        Add Question
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/admin/settings" className="nav-link active">
                        Settings
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link onClick={()=> {
                        sessionStorage.removeItem("token");
                        window.open("/admin", "_self");
                        }} className="nav-link active">
                        Sign out
                        </Link>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
            {/* END OF NAVBAR */}
            <h1 className='text-center' style={{marginTop: '9%', marginBottom: '1%'}}>Settings</h1>

            
            <form
                    onSubmit={async (e) => {
                        console.log(data);
                        e.preventDefault();
                        await fetch(`https://www.bruncheck.com/api/setting/update/${_id}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                        })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data);
                            // props.history.push("/admin");
                            alert(data);
                        });

                        const formData = new FormData();
                        formData.append('file', image.data)
                        const response = await fetch('https://www.bruncheck.com/api/image', {
                        method: 'POST',
                        body: formData,
                        });
                        if (response) setStatus(response.statusText);
                        // window.open("/admin", "_self");
                    }}
                    >
            <div className="container">
                <div class="input-group mb-3 mx-auto" style={{width:" 35rem"}}>
                    <h6 className='me-3 mb-0 p-0 content'>Finished Text :</h6>
                    <input type="text" class="form-control rounded" placeholder={data.finishedStr} 
                    onChange={(e) => setData({...data, finishedStr: e.target.value})}/>
                    <span class="input-group-text" id="basic-addon2">#bruncheck</span>
                </div> 
            </div>
                      
            <div id="admin" className="container ms-5 me-5 ps-5-pe-5 mb-5 row">
                <div className='col-3 '>
                                <div className="form-group">
                                <h3 className="mb-2" >Primary Color </h3>
                                <SketchPicker className='mt-2 mb-5' color={data.color} onChange={(e)=>{
                                    setData({ ...data, color: e.hex });
                                }}/>

                                <input
                                type="submit"
                                className="btn btn-dark mt-5"
                                value="Save Settings"
                                style={{"backgroundColor": data.color, "borderColor": data.color}}
                                />
                            </div>
                    
                </div>
                <div className='col-3 '>
                    <h3>Select Logo</h3>
                    
                    <input class="form-control" type="file" id="formFile" 
                    onChange={(e) => {
                        const img = {
                            preview: URL.createObjectURL(e.target.files[0]),
                            data: e.target.files[0],
                          };
                        setImage(img);
                    }}/>
                </div>
            </div>
                </form>
        </div>
    );
}