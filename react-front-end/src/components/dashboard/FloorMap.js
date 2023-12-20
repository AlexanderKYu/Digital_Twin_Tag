import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function FloorMap(props) {

  const [activeMapCoords, setActiveMapCoords] = useState([]);
  const [inactiveMapCoords, setInactiveMapCoords] = useState([]);

  const image = new Image();
  image.src = '/floorImg.png';

  useEffect(() => {
    let allTags = Object.keys(props.tagData);
    let activeCoords = [];
    let inactiveCoords = [];
    allTags.forEach((tag) => {
      let tempObject = {};
      tempObject.x = props.tagData[tag].x;
      tempObject.y = props.tagData[tag].y;
      tempObject.tag = props.tagData[tag].alias;
      //setMapCoords( arr => [...arr, tempObject]);
      if(props.tagData[tag].inactive){
        inactiveCoords.push(tempObject)
      } else {
        activeCoords.push(tempObject);
      }
      
    });
    setInactiveMapCoords(inactiveCoords);
    setActiveMapCoords(activeCoords);
  }, [props.tagData]);
  

  const data = {
    datasets: [
      {
        label: "Active Tags",
        data: activeMapCoords,
        color: "#000000",
        backgroundColor: 'rgba(50, 180, 100, 1)',
        pointRadius: 6,
        pointHoverRadius: 10,
        pointBorderColor: '#000000',
      },
      {
        label: "Inactive Tags",
        data: inactiveMapCoords,
        color: "white",
        backgroundColor: 'rgba(163,21,47,1)',
        pointRadius: 6,
        pointHoverRadius: 10,
        pointBorderColor: '#000000',
      },
    ],
  };

  const backgroundImage = {
    id: 'customCanvasBackgroundImage',
    beforeDraw: (chart) => {
      if (image.complete) {
        const ctx = chart.ctx;
        const {top, left, width, height} = chart.chartArea;
        //const x = left + width / 2 - image.width / 2;
        const x = left;
        //const y = top + height / 2 - image.height / 2;
        const y = top;
        ctx.drawImage(image, x, y, height, height);
      } else {
        image.onload = () => chart.draw();
      }
    }
  };

  const plugins = [backgroundImage];

  const options= {
    aspectRatio: 1,
    scales: {
      x: {
        ticks: {
          color: 'white'
        },
        min: -10,
        max: 30,
      },
      y: {
        ticks: {
          color: 'white'
        },
        
        min: -10,
        max: 30,
      },
    },
    plugins:
      {
        legend: {
          labels: {
            color: "white",  // not 'fontColor:' anymore
            // fontSize: 18  // not 'fontSize:' anymore
          }
        },
      tooltip: {
        callbacks: {
          label: (context) => {
            let currentTag = context.dataset.data[context.dataIndex];
            let l = currentTag.tag + ": (" + currentTag.x + "," + currentTag.y + ")";
            return l;
          }
        }
      },
      title: {
        display: true,
        text: "Test chart",
        position: "top"
      }
    },
  }
    return(<Scatter
        data={data} options={options} plugins={plugins}
      />);
}