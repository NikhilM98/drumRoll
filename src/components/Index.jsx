import React from 'react';

import '../App.css';
import jsonData from './data/data.json';

console.log(jsonData);

export default class Index extends React.Component{

    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        
        let selectableData = jsonData.available_slots.map((data, i) => {
            data.id = i + "-date";
            data.value = data.date;
            if (data.date_slots.length > 0) {
                data.childs = data.date_slots.map((data, i) => {
                    data.id = i + "-date-slot";
                    data.value = data.hour;
                    if (data.hour_slots.length > 0) {
                        data.childs = data.hour_slots.map((data, i) => {
                            for ( let prop in data) {
                                data.value = prop;
                            }
                            data.id = i + "-hour-slot";
                            return data
                        })
                    }
                    return data
                })
            }
            return data
        });

        var mobileSelect1 = new window.MobileSelect({
            trigger: '#trigger1',
            title: 'Selector',
            cascade: true,
            wheels: [{
              data:selectableData}
          ],
        });
    }

    render() {
        return(
            <div>
                <input type="text" id="trigger1" placeholder="Single Selection" />
            </div>
        )
    }
}