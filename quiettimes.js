async function activityTable(day) {
  let logFileList = await textFile("camera_logs.txt"); // Read log file list
  let logFiles = logFileList.split("\n"); // Split filenames

  let hourlyActivity = new Array(24).fill(0); // Initialize an array with 24 zeros

  for (let file of logFiles) {
    let logContent = await textFile(file); // Read individual log file
    let timestamps = logContent.split("\n").map(Number); // Convert timestamps to numbers

    timestamps.forEach(timestamp => {
      let date = new Date(timestamp);
      if (date.getDay() === day) {
        hourlyActivity[date.getHours()]++; // Increment the corresponding hour slot
      }
    });
  }

  return hourlyActivity;
}

activityTable(1).then(table => console.log(activityGraph(table)));