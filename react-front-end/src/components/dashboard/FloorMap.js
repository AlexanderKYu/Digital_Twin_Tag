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

  const [mapCoords, setMapCoords] = useState([]);

  const image = new Image();
  image.src = '/floorImg.png';

  useEffect(() => {
    let allTags = Object.keys(props.tagData);
    let tempCoords = []
    allTags.forEach((tag) => {
      let tempObject = {};
      tempObject.x = props.tagData[tag].x;
      tempObject.y = props.tagData[tag].y;
      tempObject.tag = props.tagData[tag].alias;
      //setMapCoords( arr => [...arr, tempObject]);
      tempCoords.push(tempObject);
      
    });
    setMapCoords(tempCoords);
  }, [props.tagData]);
  

  const data = {
    datasets: [
      {
        label: "Tags",
        data: mapCoords,
        color: "#FFFFFF",
        backgroundColor: 'rgba(50, 180, 100, 1)',
        pointRadius: 10,
        pointHoverRadius: 15,
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
          color: 'black'
        },
        min: -10,
        max: 30,
      },
      y: {
        ticks: {
          color: 'black'
        },
        
        min: -10,
        max: 30,
      },
    },
    plugins:
      {
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