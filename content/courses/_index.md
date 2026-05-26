---
title: Courses
summary: My courses
type: landing

cascade:
  - target:
      path: '{/courses/*/**}'
    type: docs
    params:
      show_breadcrumb: true

sections:
  - block: collection
    id: courses
    content:
      title: Courses
      filters:
        tag: Course
        kinds:
          - section
    design:
      view: article-grid
      show_read_time: false
      show_date: false
      show_read_more: false
      columns: 1

  # 🛠️ NEW SECTION ADDED TO SUPPORT YOUR PLOTLY VISUALIZATION
  - block: markdown
    content:
      title: "College Park Weather Tracker"
      text: |
        Below is the live-updating interactive temperature log for College Park, MD, pulling directly from NOAA's climatology servers:

        <script src="https://cdn.plot.ly/plotly-2.24.1.min.js"></script>
        
        <div id="acis-weather-chart" style="width:100%; max-width:100%; height:500px; margin:20px auto;"></div>
        
        <script>
            const acisUrl = 'https://data.rcc-acis.org/StnData';
            const queryParams = {
                sid: 'USW00093751', 
                sdate: '2026-01-01',
                edate: '2026-12-31',
                elems: [
                    { name: 'maxt', vtype: 'val' }, 
                    { name: 'mint', vtype: 'val' }  
                ]
            };
        
            fetch(acisUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(queryParams)
            })
            .then(response => response.json())
            .then(payload => {
                const rawData = payload.data;
                const dates = [];
                const highTemps = [];
                const lowTemps = [];
        
                rawData.forEach(row => {
                    if (row[1] !== 'M' && row[2] !== 'M') {
                        dates.push(row[0]);
                        highTemps.push(parseFloat(row[1]));
                        lowTemps.push(parseFloat(row[2]));
                    }
                });
        
                const traceMax = {
                    x: dates,
                    y: highTemps,
                    mode: 'lines',
                    name: 'Daily High',
                    line: { color: '#dc2626', width: 2 }
                };
        
                const traceMin = {
                    x: dates,
                    y: lowTemps,
                    mode: 'lines',
                    name: 'Daily Low',
                    line: { color: '#2563eb', width: 2 }
                };
        
                const layout = {
                    title: '2026 Observed High & Low Temperatures — College Park, MD',
                    xaxis: { title: 'Observation Date', type: 'date' },
                    yaxis: { title: 'Temperature (°F)' },
                    hovermode: 'x unified',
                    template: 'plotly_white'
                };
        
                Plotly.newPlot('acis-weather-chart', [traceMax, traceMin], layout, {responsive: true});
            })
            .catch(err => console.error('Error contacting ACIS API:', err));
        </script>
    design:
      columns: '1'
---
