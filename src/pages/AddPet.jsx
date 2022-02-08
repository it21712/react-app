import React, { useState } from "react";
import axios from "axios";

export default function AddPet(props){

    const URL = "http://localhost:8080/citizen"


    const [pet,setPet] = useState({
        serialNumber:'',
        type:'',
        race:'',
        sex:'',
        birthDate:''
    });
    

    const handleSubmit = (event) => {
        let config = {
            withCredentials: true
        }

        axios
        .post(URL + '/add-pet', pet ,config)
        .then(response => {
            alert("Pet was added succesfully.")
            console.log("RESPONSE WAS :", response);
        })
        .catch(error => {
            alert("Error adding pet to list.")
            console.log("registration error", error);
        });
        event.preventDefault();
    }


    const handleChange = (event) =>{
        setPet(prevPet => ({
            ...prevPet,
            [event.target.name] : event.target.value
            
        }));
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Serial Number:
                    <input //SERIAL NUMBER-----------------------------------------
                    type="number"
                    name="serialNumber"
                    placeholder="Serial Number"
                    value={pet.serialNumber}
                    onChange={handleChange}
                    required
                    />
                </label>
                <label /*TYPE------------------------------------------------*/>
                    Type:
                    <label> Dog
                        <input 
                        type="radio"
                        name="type"
                        value="Dog"
                        checked={pet.type === "Dog"}
                        onChange={handleChange}
                        required
                        />
                    </label>
                    <label> Cat
                        <input 
                        type="radio"
                        name="type"
                        value="Cat"
                        checked={pet.type === "Cat"}
                        onChange={handleChange}
                        required
                        />                    
                    </label>
                </label>
                <label>
                    Race:
                    <input //RACE------------------------------------------------
                    type="text"
                    name="race"
                    placeholder="Race"
                    value={pet.race}
                    onChange={handleChange}
                    required
                    />
                </label>
                <label  /*SEX-----------------------------------------------*/>
                Sex: 
                    <label>
                        Male
                        <input //MALE---------
                            type="radio"
                            name="sex"
                            value="Male"
                            checked={pet.sex === "Male"}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Female
                        <input //FEMALE--------
                            type="radio"
                            name="sex"
                            value="Female"
                            checked={pet.sex === "Female"}
                            onChange={handleChange}
                            required
                        />
                    </label>

                </label>
                <label>
                    Birth Date:
                    <input //DATE------------------------------------------------
                    type="date"
                    name="birthDate"
                    value={pet.birthDate}
                    onChange={handleChange}
                    required
                    />
                </label>
                <button type="Submit">Submit</button>




            </form>
        </div>      
    )

}