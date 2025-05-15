function activityTable(day) {
  return textFile("camera_logs.txt")
    .then(files => {
      return Promise.all(
        files.split("\n").map(file =>
          textFile(file).then(log => {
            let timestamps = log.split("\n").map(Number);
            let hourlyActivity = new Array(24).fill(0);

            timestamps.forEach(timestamp => {
              let date = new Date(timestamp);
              if (date.getDay() === day) {
                hourlyActivity[date.getHours()]++;
              }
            });

            return hourlyActivity; // Returns processed data for each log
          })
        )
      );
    })
    .then(tables => {
      // Aggregate results from all log files
      return tables.reduce((acc, table) => {
        return acc.map((count, index) => count + table[index]);
      }, new Array(24).fill(0));
    });
}

activityTable(6).then(table => console.log(activityGraph(table)));