import React from 'react';

import '../App.css';
import jsonData from './data/data.json';

export default class Index extends React.Component{

    constructor() {
        super();
        this.state = {
            set:false,
            date:"",
            dateCurrent:"",
            time:"",
            timeCurrent:"",
            slot:"",
            slotCurrent:"",
            error:"",
        }
    }

    componentDidMount() {
        let selectableData = jsonData.available_slots.map((data, i) => {
            data.value = data.date;
            if (data.date_slots.length > 0) {
                data.id = i + "-date";            
                data.childs = data.date_slots.map((data, j) => {
                    data.id = i + "-" + j + "-date-slot";
                    data.value = data.hour;
                    if (data.hour_slots.length > 0) {
                        data.childs = data.hour_slots.map((data, k) => {
                            for ( let prop in data) {
                                data.value = prop;
                            }
                            data.id = i + "-" + j + "-" + k + "-hour-slot";
                            return data
                        })
                    }
                    return data
                })
            } else {
                data.id = "strike_date";
                data.childs = [{
                    value:"No slots are available on this date",
                    id:"no_slots"
                }]
            }
            return data
        });
        
        new window.MobileSelect({
            trigger: '#trigger1',
            title: jsonData.title,
            cascade: true,
            wheels: [{
              data:selectableData}
            ],
            transitionEnd:(indexArr, data) => {
                if (data["2"]) {
                    this.setState({
                        dateCurrent:data["0"].value,
                        timeCurrent:data["1"].value,
                        slotCurrent:data["2"].value
                    });
                } else if(data["1"]) {
                    this.setState({
                        dateCurrent:data["0"].value,
                        timeCurrent:data["1"].value,
                        slotCurrent:""
                    });
                } else if(data["0"]) {
                    this.setState({
                        dateCurrent:data["0"].value,
                        timeCurrent:"",
                        slotCurrent:""
                    });
                }
            },
            callback: (indexArr, data) => {
                if (data["2"] && !this.state.set) {
                    this.setState({
                        error:"",
                        set:true,
                        date:data["0"].value,
                        time:data["1"].value,
                        slot:data["2"].value
                    });
                } else if (this.state.set) {
                    this.setState({error: 'Already Selected'});
                } else {
                    this.setState({error: 'Scroll and Select'});
                }
                
            }
        });
    }

    render() {
        return(
            <div>
                <div id="selectedDate" style={{width:'100%', textAlign:'center', fontWeight:'600', marginTop:'25px'}}>
                    {this.state.set ? (this.state.date +" at "+ this.state.time +" between "+ this.state.slot) : "Date"}
                </div>
                <div id="selectedError" style={{width:'100%', textAlign:'center', color:'red', fontSize:'10px', marginTop:'10px'}}>
                    {this.state.error}
                </div>
                <input type="text" className="hidden" id="trigger1" placeholder="Select Slot" />
            </div>
        )
    }
}