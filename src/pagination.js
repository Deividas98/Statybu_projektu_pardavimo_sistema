import React, {useState, useEffect} from 'react';
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import {Modal, Button} from "react-bootstrap";


const Pagination = () => {
    const [players, setPlayers] = useState([]);
    const getPlayerData = async() => {
        try{
            const data = await axios.get(
                "https://kompleksinis1-default-rtdb.europe-west1.firebasedatabase.app"
            );
            setPlayers(data.data)
        } catch(e){
            console.log(e);
        }
    };

    useEffect(() =>{
        getPlayerData();
    }, []);

    const columns = [
        {dataField: "name", text: "Player Name"},
        {dataField: "points_per_game", text: "Points Per"},
        {dataField: "team_name", text: "Player Team"}
    ];

    return(
        <div>
            <h1>Pagination</h1>
                <BootstrapTable
                keyField="name"
                data={players}
                columns={columns}
                Pagination={paginationFactory()}
                />
        </div>
    );
};
