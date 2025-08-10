import ScheduleTemplate from "../template/scheduleTemplate";

export default function PrintSchedule({ disableScroll = false }) {
  return <ScheduleTemplate disableScroll={disableScroll}/>;
}