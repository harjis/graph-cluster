import React from 'react';
import { Meta, Story } from '@storybook/react';

import Canvas from '../../Graph/components/Canvas/Canvas';
import Edge from '../../Graph/components/Edge/Edge';

import styles from './CustomStyles.module.css';

export default {
  title: 'Graph/Edge',
  component: Edge,
} as Meta;

const circle = { x: 10, y: 10 };
const circle2 = { x: 100, y: 100 };

const Template: Story<{ customColors?: boolean }> = (args) => (
  <div>
    <Canvas height={500} width={500}>
      {() => (
        <React.Fragment>
          <circle fill="lightblue" r="5" cx={circle.x} cy={circle.y} />
          <circle fill="lightblue" r="5" cx={circle2.x} cy={circle2.y} />
          <Edge
            from={circle}
            to={circle2}
            styles={args.customColors ? styles.customEdge : undefined}
          />
        </React.Fragment>
      )}
    </Canvas>
  </div>
);
export const Default = Template.bind({});
Default.args = {};
export const WithCustomColors = Template.bind({});
WithCustomColors.args = {
  customColors: true,
};
