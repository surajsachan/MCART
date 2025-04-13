import { useAuth } from "react-oidc-context";
import { Footer, Navbar } from "../components";
import { useEffect, useState } from "react";

const Profile=()=>
{
    const [userData, setUserData]=useState(null);
    
    const auth=useAuth();
    useEffect(()=>{
        const getUser=async()=>
        {
            const response = await fetch(`http://98.80.205.202:30467/api/users/getUser/${auth.user.profile.email}`);
            const data=await response.json();
            setUserData(data);

            localStorage.setItem('userData',JSON.stringify(data))
        }
        getUser();
    },[])
    //console.log(userData.email)

    if (!userData) {
        return (
        <>
            <Navbar/>
            <div>Loading....</div>
            <Footer/>
        </>);
    }

    return (
        <>
            <Navbar/>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-4">
                    <div className="card">
                        <div className="card-body text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                        </svg>
                        <h5 className="card-title mt-2">{userData?.email}</h5>
                        <button className="btn btn-outline-dark">Edit Profile</button>
                        </div>
                    </div>
                    </div>
            
                    <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">Orders</h5>
                        <ul className="list-group">
                            <li className="list-group-item">Order #12345 - $50</li>
                            <li className="list-group-item">Order #67890 - $75</li>
                            <li className="list-group-item">Order #54321 - $30</li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Profile;