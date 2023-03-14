import { Scatter } from 'react-chartjs-2';
import faker from 'faker';

export const data = {
    datasets: [
      {
        label: 'A dataset',
        data: Array.from({ length: 100 }, () => ({
          x: faker.datatype.number({ min: -100, max: 100 }),
          y: faker.datatype.number({ min: -100, max: 100 }),
        })),
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

export default function FloorMap() {
    return(<Scatter
        data={data}
      />);
}