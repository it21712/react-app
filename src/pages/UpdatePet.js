import React, { useState } from 'react';

const UpdatePet = () => {

    const [petNum, setPetNum] = useState(0)
    const[pet, setPet] = useState()

    const handleInputChange = (event) => {
        setPetNum(event.target.value)
    }

    const onSearchPressed = async (event) => {
        event.preventDefault();
        let petNumObj = {string:petNum}
        getPet(petNumObj)
    }

    const getPet = async (obj) => {

        fetch('http://localhost:8080/vet/get-pet/',
            {
                mode:'cors',
                credentials:'include',
                method:'post',
                body:JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => {
            
            if(response.status !== 200){
                if(response.status === 500)
                    alert("Could not find pet");
                else alert("Something went wrong");
                return;
            }else return response.json()
            
        })
        .then(data => {
            setPet(data)
            console.log(data)
        })
       
    }

  return (
  <>
    <div className='center'>
            <form method="post" onSubmit={onSearchPressed}>
                <div>
                    <label style={{textAlign:'center'}}>Enter Pet's Serial Number</label>
                </div>
                <div>
                <input id="serialNum" type="number" name="petNumber" autoComplete='off'
                                placeholder="Serial Number" onChange={handleInputChange.bind(this)}/>
                </div>
                <div>
                <input type='submit' value='Search'/>
                </div>
            </form>
        </div>

        {pet !== undefined && (<div style={{paddingTop:'40px'}}>
           
            <table>
                <thead>
                <tr>
                    <th>Serial Number</th>
                    <th>Type</th>   
                    <th>Race</th>
                    <th>Sex</th>
                    <th>Birth Date</th>
                    <th>Approved</th>
                    <th>Actions</th>
                    
                </tr>
                </thead>
                <tbody>
                    {
                        
                        Object.entriesmap(([key, p], i) => (
                            <tr key={(p.serialNumber).toString()}>
                                <td>{p.serialNumber}</td>
                                <td>{p.type}</td>
                                <td>{p.race}</td>
                                <td>{p.sex}</td>
                                <td>{p.birthDate}</td>
                                <td>{p.is_approved ? 'YES' : 'NO'}</td>
                                <td>{/* <input className = "table-button" type="submit" value="Update Medical" /> */}
                                    {p.is_approved == 0 && <input id={p.serialNumber} className = "table-button" type="submit" value="Verify" />}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
           
        </div>)}
  </>);
};

export default UpdatePet;
