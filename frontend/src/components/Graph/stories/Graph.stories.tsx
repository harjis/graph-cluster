import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Background } from '../components/Background/Background';
import { Canvas } from '../components/Canvas/Canvas';
import { DotPattern } from '../components/DotPattern/DotPattern';

export default {
  title: 'Graph/Canvas',
  component: Canvas,
} as Meta;

const size = {
  height: 500,
  width: 500,
};
const EmptyCanvas: Story = () => {
  return (
    <div>
      <Canvas height={size.height} width={size.width}>
        {() => (
          <React.Fragment>
            <text
              transform={`translate(${size.width / 2}, ${size.height / 2})`}
              alignmentBaseline="central"
              dominantBaseline="central"
              textAnchor="middle"
            >
              Just some text
            </text>
          </React.Fragment>
        )}
      </Canvas>
    </div>
  );
};

const CanvasWithDot: Story = () => (
  <div>
    <Canvas height={size.height} width={size.width}>
      {({ canvasId }) => (
        <React.Fragment>
          <defs>
            <DotPattern patternId={canvasId} />
          </defs>
          <Background
            patternId={canvasId}
            height={size.height}
            width={size.width}
          />
          <text
            transform={`translate(${size.width / 2}, ${size.height / 2})`}
            alignmentBaseline="central"
            dominantBaseline="central"
            textAnchor="middle"
          >
            Just some text
          </text>
        </React.Fragment>
      )}
    </Canvas>
  </div>
);

export const Default = EmptyCanvas.bind({});
Default.args = {};

export const WithDotPattern = CanvasWithDot.bind({});
WithDotPattern.args = {};
