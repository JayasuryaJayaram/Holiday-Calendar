import * as React from "react";
// import styles from './HolidayCalendar.module.scss';
import type { IHolidayCalendarProps } from "./IHolidayCalendarProps";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

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

  `;

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
      />
    </>
  );
};

export default HolidayCalendar;
