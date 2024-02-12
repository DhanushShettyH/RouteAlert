import logo from './logo.svg';
import './App.css';
import {
	Card,
	Input,
	Checkbox,
	Button,
	Typography,
  } from "@material-tailwind/react";
import { useState } from 'react';

function App() {
	const [vehicle, setvehicle] = useState("")
	const [user, setuser] = useState({
		id:"",
		password:""

	})
	const handleChange=(e)=>{
		// e.preventDefault();
		setuser({
			...user,
			 [e.target.name]:e.target.value,
		})
	}
	const handlesubmit=async()=>{
		const data = await fetch(`http://23.106.122.10:8080/RouteAlertServer4p0/login?source=parent_auth_new&redirectURL=&j_username=${user.id}&j_password=${user.password}&imei=c9fa7ddc763594c7&os=Android%2013&model=LE2121&j_app_id=3&j_app_version=50305&j_id=eABbJxyPR3K_kvad-x8QXT:APA91bHh18y9oZ-a7JdgdRfp1UI2jDbNkulUeu_0E-MrIORAen_ckCM1vgJao2oLlhmFrJs1yyzoYpopaUJ_LYO-zUNrkC-dmwBOpEohVfWfaCKEJBhzHjNWC-qoXU2F0Dl_FZsd7m8s`);
		
		const result = await data.json()
		const split_string = result.usession.S_LIST.split(",");

		const data1 = await fetch(`http://23.106.122.10:8080/RouteAlertServer4p0/login?source=gvl&v_id=${split_string[5]}`);
		const result1 = await data1.text();
		document.body.innerHTML = result1 ;
		console.log(result1)
	}

	return (
		<div className=' h-screen w-full flex justify-center items-center p-6'>
			<Card className=' w-fit mx-auto p-4'>
		 <Typography variant="h4" color="blue">
		   Login
		 </Typography>
		 <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
		   <div className="mb-1 flex flex-col gap-6">
			 
			 <Typography variant="h6" color="blue-gray" className="-mb-3">
			   User id
			 </Typography>
			 <Input
			 name="id" onChange={(e)=>handleChange(e)}
			   size="lg"
			   placeholder="244787......"
			   className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
			   labelProps={{
				 className: "before:content-none after:content-none",
			   }}
			 />
			 <Typography variant="h6" color="blue-gray" className="-mb-3">
			   Password
			 </Typography>
			 <Input
			 name='password' onChange={(e)=>handleChange(e)}
			   type="password"
			   size="lg"
			   placeholder="********"
			   className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
			   labelProps={{
				 className: "before:content-none after:content-none",
			   }}
			 />
		   </div>
		   
		   <Button color='blue' className="mt-6" fullWidth onClick={handlesubmit}>
			 Log in
		   </Button>
		  
		 </form>
	   </Card>
		</div>
	 );
}

export default App;
