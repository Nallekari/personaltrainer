
import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react' ;
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import add from 'date-fns/add'
import { parseISO, formatISO } from 'date-fns';

export default function TrainingCalendar() {


    const [trainingEvents, setTrainingEvents] = useState([]);

    
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainingEvents(data)
        )
        
    }

    function dataTransform(event) 
    {       
            if(event.customer){
                event.title = event.activity + " / " + event.customer.lastname + " " + event.customer.firstname
            }
            if(event.date){
                event.start =  event.date
                event.end = formatISO(add(new Date(parseISO(event.date)), { minutes: event.duration }))
            }
            return event
        }

    return (
        <div>
        <FullCalendar
            plugins={[ dayGridPlugin, timeGridPlugin ]}
            initialView="timeGridWeek"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
            eventTimeFormat= {{ hour: "2-digit", minute: "2-digit", hour12: false }}
            eventDataTransform={dataTransform}
            eventContent={renderEventContent}
            events={trainingEvents}
            />
        </div>
      )

    
    function renderEventContent(eventInfo) {
        return (
          <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
          </>
        )
      }
}
