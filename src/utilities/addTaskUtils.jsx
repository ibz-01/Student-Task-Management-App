
export function toMinutes(time) {
  let [hhmm, modifier] = time.split(" ");
  let [hours, minutes] = hhmm.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

export function fromMinutes(mins) {
  let hours = Math.floor(mins / 60);
  let minutes = mins % 60;
  let modifier = hours >= 12 ? "PM" : "AM";
  if (hours === 0) hours = 12;
  else if (hours > 12) hours -= 12;
  return `${hours}:${minutes.toString().padStart(2, "0")} ${modifier}`;
}

export function hasConflict(newStart, newEnd, reserved) {
  return reserved.some(({ start, end }) => newStart < end && newEnd > start);
}

export function parseDay(dateStr) {
  return new Date(dateStr.replace(/(\w+), /, ""));
}

export function resolveConflicts(newTasks, existingTasks) {
  let reserved = [];

  existingTasks.forEach((task) => {
    task.days.forEach((day) => {
      day.subtasks.forEach((sub) => {
        let [start, end] = sub.time.split("-");
        reserved.push({
          day: day.date,
          start: toMinutes(start.trim()),
          end: toMinutes(end.trim()),
        });
      });
    });
  });

  newTasks.days.forEach((day) => {
    day.subtasks.forEach((sub) => {
      let [start, end] = sub.time.split("-");
      let startMin = toMinutes(start.trim());
      let endMin = toMinutes(end.trim());

      while (
        hasConflict(
          startMin,
          endMin,
          reserved.filter((r) => r.day === day.date)
        )
      ) {
        startMin += 15;
        endMin += 15;
      }

      sub._startMin = startMin;
      sub._endMin = endMin;
      sub.time = `${fromMinutes(startMin)}-${fromMinutes(endMin)}`;

      reserved.push({ day: day.date, start: startMin, end: endMin });
    });

    day.subtasks.sort((a, b) => a._startMin - b._startMin);

    for (let i = 1; i < day.subtasks.length; i++) {
      let prev = day.subtasks[i - 1];
      let curr = day.subtasks[i];

      let prevEnd = toMinutes(prev.time.split("-")[1].trim());
      let currStart = toMinutes(curr.time.split("-")[0].trim());

      if (currStart <= prevEnd) {
        continue;
      }

      let gap = currStart - prevEnd;
      if (gap < 45) {
        let shiftBy = 45 - gap;
        let [s, e] = curr.time.split("-");
        let startMin = toMinutes(s.trim()) + shiftBy;
        let endMin = toMinutes(e.trim()) + shiftBy;

        curr._startMin = startMin;
        curr._endMin = endMin;
        curr.time = `${fromMinutes(startMin)}-${fromMinutes(endMin)}`;
      }
    }

    day.subtasks.sort((a, b) => a._startMin - b._startMin);

    day.subtasks.forEach((sub) => {
      delete sub._startMin;
      delete sub._endMin;
    });
  });

  newTasks.days.sort((a, b) => parseDay(a.date) - parseDay(b.date));

  return newTasks;
}
