import * as React from "react";
import { useEffect, useState } from "react";
import { MSGraphClientV3 } from "@microsoft/sp-http";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import type { IHolidayCalendarProps } from "./IHolidayCalendarProps";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styles from "./HolidayCalendar.module.scss";

// import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Popover from "react-bootstrap/Popover";

// interface IFormattedEvent {
//   subject: string;
//   startDate: string;
//   endDate: string;
//   startTime: string;
//   endTime: string;
//   eventDate: string;
//   bodyPreview?: string;
//   joinUrl?: string;
// }

const HolidayCalendar = (props: IHolidayCalendarProps) => {
  var customStyles = `
  
     .fc .fc-button-primary {
        background-color: #EA881A;
        border-color: #EA881A;
        width: 45px;
     }

     .fc-toolbar-chunk {
      display: flex;
     }

     :root{
      --fc-button-hover-bg-color: #EA881A;
    --fc-button-hover-border-color: #EA881A;
    --fc-button-active-bg-color: #EA881A;
    --fc-button-active-border-color: #EA881A;
    --fc-today-bg-color: transparent;
     }

     .fc .fc-daygrid-day-top {
        display: flex;
        flex-direction: row; 
      }

      .fc-theme-standard .fc-scrollgrid {
        border: none !important;
    }

    .fc-scrollgrid-section-body td {
      border-bottom: none !important;
      border-right: none !important;
    }

    .fc-theme-standard th {
      border-right: none;
  }

  .fc-header-toolbar .fc-toolbar-chunk:first-child::before {
    content: "Holiday Calendar";
    color: #000;
    font-size: 24px;
    font-weight: 600;
    
  }

  .fc .fc-daygrid-event {
  
    top: 30px;
}

  .fc-event:hover {
    background: none;
   }

  `;

  const [holidays, setHolidays] = useState<MicrosoftGraph.Event[]>([]);

  useEffect(() => {
    props.context.msGraphClientFactory
      .getClient("3")
      .then((client: MSGraphClientV3) => {
        client
          .api(
            "/me/calendars/AAMkADUwMWIzODc2LTcwY2QtNGY1My04YzcxLTFhZTU1YzczNTI5ZQBGAAAAAAByJZ33PWkKQ7eOS-iWPlvhBwCPizQU3LARRo-ydeIgMrs3AAAAAAEGAACPizQU3LARRo-ydeIgMrs3AABCzgaPAAA=/events"
          )
          .version("v1.0")
          .select("*")
          .get((error: any, eventsResponse, rawResponse?: any) => {
            if (error) {
              console.error("Message is: " + error);
              return;
            }

            const holidayEvents: MicrosoftGraph.Event[] = eventsResponse.value;
            setHolidays(holidayEvents);
          });
      });
  }, [props.context.msGraphClientFactory]);

  console.log(holidays);

  const eventContent = (info: any) => {
    const eventSubject = info.event.extendedProps.subject;
    return (
      <>
        <div className={styles.title}>{eventSubject}</div>
      </>
    );
  };

  return (
    <>
      <style>{customStyles}</style>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "",
          right: "title prev,next",
        }}
        dayHeaderFormat={{ weekday: "long" }}
        buttonIcons={{
          prev: "chevron-left",
          next: "chevron-right",
        }}
        events={holidays.map((event: any) => ({
          title: event.subject,
          start: new Date(event.start.dateTime),
          end: new Date(event.end.dateTime),
          extendedProps: { subject: event.subject },
        }))}
        eventContent={eventContent}
      />
    </>
  );
};

export default HolidayCalendar;
