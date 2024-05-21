import React from "react";

import TimelineComponent from "../Components/HomePage/Timeline/TimelineComponent";

const TimelineList = (props) => {
    return(
        <>
            <TimelineComponent newsList={props.newsList}/>
        </>
    )
}

export default TimelineList;